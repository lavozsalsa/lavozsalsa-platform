const fs = require('fs/promises');
const path = require('path');
const { existsSync } = require('fs');
const { execFileSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = process.env.LVS_DESKTOP_OUTPUT_DIR || 'release';
const releaseDir = path.join(projectRoot, outputDirectory);
const packageJson = require(path.join(projectRoot, 'package.json'));

const targets = [
  { arch: 'x64', appDir: path.join(releaseDir, 'mac', 'La Voz Salsa.app') },
  { arch: 'arm64', appDir: path.join(releaseDir, 'mac-arm64', 'La Voz Salsa.app') },
];

async function removeIfExists(filePath) {
  await fs.rm(filePath, { recursive: true, force: true });
}

function buildPkg(appDir, pkgPath) {
  const args = ['--component', appDir, '--install-location', '/Applications'];
  const installerIdentity = process.env.MAC_INSTALLER_IDENTITY;

  if (installerIdentity) {
    args.push('--sign', installerIdentity);
  }

  args.push(pkgPath);

  execFileSync('pkgbuild', args, {
    stdio: 'inherit',
  });
}

function buildZip(appDir, zipPath) {
  execFileSync('ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', appDir, zipPath], {
    stdio: 'inherit',
  });
}

function notarizePkg(pkgPath) {
  const appleId = process.env.APPLE_ID;
  const applePassword = process.env.APPLE_APP_SPECIFIC_PASSWORD;
  const appleTeamId = process.env.APPLE_TEAM_ID;

  if (!appleId || !applePassword || !appleTeamId) {
    return;
  }

  execFileSync(
    'xcrun',
    [
      'notarytool',
      'submit',
      pkgPath,
      '--apple-id',
      appleId,
      '--password',
      applePassword,
      '--team-id',
      appleTeamId,
      '--wait',
    ],
    {
      stdio: 'inherit',
    },
  );

  execFileSync('xcrun', ['stapler', 'staple', pkgPath], {
    stdio: 'inherit',
  });
}

async function main() {
  let builtAny = false;

  for (const target of targets) {
    if (!existsSync(target.appDir)) {
      continue;
    }

    builtAny = true;

    const pkgPath = path.join(releaseDir, `La Voz Salsa-${packageJson.version}-${target.arch}.pkg`);
    const zipPath = path.join(releaseDir, `La Voz Salsa-${packageJson.version}-${target.arch}.zip`);

    await removeIfExists(pkgPath);
    await removeIfExists(zipPath);

    buildPkg(target.appDir, pkgPath);
    notarizePkg(pkgPath);
    buildZip(target.appDir, zipPath);
  }

  if (!builtAny) {
    throw new Error('No se encontro ninguna app de macOS en release/mac o release/mac-arm64.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
