const fs = require('fs/promises');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const releaseDir = path.join(projectRoot, 'release');
const packageJson = require(path.join(projectRoot, 'package.json'));

const expectedFiles = [
  `La Voz Salsa Setup ${packageJson.version}.exe`,
  `La Voz Salsa Setup ${packageJson.version}.exe.blockmap`,
  `La Voz Salsa-${packageJson.version}-x64.pkg`,
  `La Voz Salsa-${packageJson.version}-arm64.pkg`,
  `La Voz Salsa-${packageJson.version}-x64.zip`,
  `La Voz Salsa-${packageJson.version}-arm64.zip`,
];

const expectedPaths = [
  path.join(releaseDir, 'win-unpacked', 'La Voz Salsa.exe'),
  path.join(releaseDir, 'mac', 'La Voz Salsa.app', 'Contents', 'Info.plist'),
  path.join(releaseDir, 'mac-arm64', 'La Voz Salsa.app', 'Contents', 'Info.plist'),
];

async function ensureFile(filePath) {
  const stats = await fs.stat(filePath);

  if (!stats.isFile()) {
    throw new Error(`No es un archivo: ${filePath}`);
  }

  if (stats.size <= 0) {
    throw new Error(`Archivo vacio: ${filePath}`);
  }

  return stats.size;
}

async function main() {
  const verified = [];

  for (const fileName of expectedFiles) {
    const fullPath = path.join(releaseDir, fileName);
    const size = await ensureFile(fullPath);
    verified.push({ file: fullPath, size });
  }

  for (const fullPath of expectedPaths) {
    const size = await ensureFile(fullPath);
    verified.push({ file: fullPath, size });
  }

  console.log('Artefactos verificados:');
  for (const item of verified) {
    console.log(`- ${path.relative(projectRoot, item.file)} (${item.size} bytes)`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
