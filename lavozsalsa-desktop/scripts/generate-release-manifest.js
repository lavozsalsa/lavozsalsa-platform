const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const releaseDir = path.join(projectRoot, 'release');
const packageJson = require(path.join(projectRoot, 'package.json'));

const artifacts = [
  {
    file: `La Voz Salsa Setup ${packageJson.version}.exe`,
    platform: 'windows',
    arch: 'x64',
    kind: 'installer',
  },
  {
    file: `La Voz Salsa Setup ${packageJson.version}.exe.blockmap`,
    platform: 'windows',
    arch: 'x64',
    kind: 'blockmap',
  },
  {
    file: `La Voz Salsa-${packageJson.version}-x64.pkg`,
    platform: 'macos',
    arch: 'x64',
    kind: 'installer',
  },
  {
    file: `La Voz Salsa-${packageJson.version}-arm64.pkg`,
    platform: 'macos',
    arch: 'arm64',
    kind: 'installer',
  },
  {
    file: `La Voz Salsa-${packageJson.version}-x64.zip`,
    platform: 'macos',
    arch: 'x64',
    kind: 'archive',
  },
  {
    file: `La Voz Salsa-${packageJson.version}-arm64.zip`,
    platform: 'macos',
    arch: 'arm64',
    kind: 'archive',
  },
];

async function sha256(filePath) {
  const contents = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(contents).digest('hex');
}

async function main() {
  const manifestArtifacts = [];

  for (const artifact of artifacts) {
    const fullPath = path.join(releaseDir, artifact.file);
    const stats = await fs.stat(fullPath);
    const checksum = await sha256(fullPath);

    manifestArtifacts.push({
      ...artifact,
      path: `release/${artifact.file}`,
      size: stats.size,
      sha256: checksum,
    });
  }

  const manifest = {
    name: packageJson.name,
    version: packageJson.version,
    productName: 'La Voz Salsa',
    generatedAt: new Date().toISOString(),
    artifacts: manifestArtifacts,
  };

  const shaLines = manifestArtifacts.map((artifact) => `${artifact.sha256}  ${artifact.file}`);

  await fs.writeFile(
    path.join(releaseDir, 'release-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  await fs.writeFile(path.join(releaseDir, 'SHA256SUMS.txt'), `${shaLines.join('\n')}\n`);

  console.log('Manifest y checksums generados:');
  console.log(`- ${path.join(releaseDir, 'release-manifest.json')}`);
  console.log(`- ${path.join(releaseDir, 'SHA256SUMS.txt')}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
