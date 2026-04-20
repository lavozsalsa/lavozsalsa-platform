const fs = require('fs/promises');
const path = require('path');
const { existsSync } = require('fs');
const { execFileSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = process.env.LVS_INSTALLER_OUTPUT_DIR || 'installer-release';
const releaseDir = path.join(projectRoot, outputDirectory);
const packageJson = require(path.join(projectRoot, 'package.json'));
const productName = 'Instala La Voz Salsa';

const candidateAppDirs = [
  path.join(releaseDir, 'mac-universal', `${productName}.app`),
  path.join(releaseDir, 'mac', `${productName}.app`),
];

async function removeIfExists(filePath) {
  await fs.rm(filePath, { recursive: true, force: true });
}

function findAppDir() {
  return candidateAppDirs.find((candidate) => existsSync(candidate)) || null;
}

function buildZip(appDir, zipPath) {
  execFileSync('ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', appDir, zipPath], {
    stdio: 'inherit',
  });
}

async function main() {
  const appDir = findAppDir();

  if (!appDir) {
    throw new Error('No se encontro la app universal del instalador en mac-universal o mac.');
  }

  const zipPath = path.join(releaseDir, `${productName}-${packageJson.version}.zip`);
  await removeIfExists(zipPath);
  buildZip(appDir, zipPath);

  console.log(`Installer ZIP generado: ${zipPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
