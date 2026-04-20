const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const envFile = path.join(projectRoot, '.env.release.local');

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function loadLocalEnv() {
  if (!fs.existsSync(envFile)) {
    return;
  }

  const lines = fs.readFileSync(envFile, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) {
      continue;
    }

    process.env[key] = stripQuotes(rawValue);
  }
}

function main() {
  loadLocalEnv();

  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    console.error('Falta el comando a ejecutar.');
    process.exit(1);
  }

  const child = spawn(command, args, {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 1);
  });
}

main();
