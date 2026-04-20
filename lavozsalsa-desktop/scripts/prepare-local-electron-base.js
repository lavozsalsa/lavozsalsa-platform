const fs = require('fs/promises');
const path = require('path');
const { existsSync } = require('fs');
const { execFileSync } = require('child_process');

const sourceApp = '/Applications/Visual Studio Code.app';
const projectRoot = path.resolve(__dirname, '..');
const targetRoot = path.join(projectRoot, 'electron-dist');
const targetApp = path.join(targetRoot, 'Code.app');

async function removeIfExists(targetPath) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

async function main() {
  if (!existsSync(sourceApp)) {
    throw new Error(`No se encontro la app base de Visual Studio Code en ${sourceApp}`);
  }

  await fs.mkdir(targetRoot, { recursive: true });
  await removeIfExists(targetApp);

  execFileSync('ditto', [sourceApp, targetApp], { stdio: 'inherit' });

  await Promise.all([
    removeIfExists(path.join(targetApp, 'Contents', 'Resources', 'app')),
    removeIfExists(path.join(targetApp, 'Contents', 'Resources', 'app.asar')),
    removeIfExists(path.join(targetApp, 'Contents', 'Resources', 'product.json')),
  ]);

  process.stdout.write(`Base local de Electron preparada en ${targetApp}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
