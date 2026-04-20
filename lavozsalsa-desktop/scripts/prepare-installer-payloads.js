const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const payloadRoot = path.join(projectRoot, 'installer-app', 'payloads');
const packageJson = require(path.join(projectRoot, 'package.json'));
const desktopOutputDirectory =
  process.env.LVS_DESKTOP_OUTPUT_DIR || `release-${packageJson.version}`;
const desktopReleaseDir = path.join(projectRoot, desktopOutputDirectory);

const sourceArtifacts = [
  {
    arch: 'arm64',
    sourceFile: `La Voz Salsa-${packageJson.version}-arm64.zip`,
    bundledFileName: `La Voz Salsa-${packageJson.version}-arm64.zip`,
  },
  {
    arch: 'x64',
    sourceFile: `La Voz Salsa-${packageJson.version}-x64.zip`,
    bundledFileName: `La Voz Salsa-${packageJson.version}-x64.zip`,
  },
];

async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function sha256(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function main() {
  const macPayloadRoot = path.join(payloadRoot, 'macos');

  await fs.rm(payloadRoot, { recursive: true, force: true });
  await ensureDirectory(macPayloadRoot);

  const artifacts = [];

  for (const artifact of sourceArtifacts) {
    const sourcePath = path.join(desktopReleaseDir, artifact.sourceFile);
    const targetPath = path.join(macPayloadRoot, artifact.bundledFileName);

    await fs.copyFile(sourcePath, targetPath);

    const stats = await fs.stat(targetPath);
    artifacts.push({
      arch: artifact.arch,
      fileName: artifact.bundledFileName,
      relativePath: path.join('macos', artifact.bundledFileName),
      size: stats.size,
      sha256: await sha256(targetPath),
    });
  }

  const manifest = {
    productName: 'La Voz Salsa',
    appVersion: packageJson.version,
    appBundleName: 'La Voz Salsa.app',
    generatedAt: new Date().toISOString(),
    artifacts,
  };

  await fs.writeFile(path.join(payloadRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('Payloads del instalador preparados en:');
  console.log(`- ${payloadRoot}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
