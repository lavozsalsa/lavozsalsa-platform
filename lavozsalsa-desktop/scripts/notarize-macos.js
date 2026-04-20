const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} termino con codigo ${code}`));
    });
  });
}

exports.default = async function notarize(context) {
  const { electronPlatformName, appOutDir, packager } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (process.env.LVS_DESKTOP_LOCAL_ELECTRON === '1') {
    console.log('Saltando notarizacion: build local de Electron.');
    return;
  }

  const appleId = process.env.APPLE_ID;
  const applePassword = process.env.APPLE_APP_SPECIFIC_PASSWORD;
  const appleTeamId = process.env.APPLE_TEAM_ID;

  if (!appleId || !applePassword || !appleTeamId) {
    console.log('Saltando notarizacion: faltan APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD o APPLE_TEAM_ID.');
    return;
  }

  const appName = packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);
  const zipPath = path.join(os.tmpdir(), `${appName}-${Date.now()}.zip`);

  await run('ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', appPath, zipPath]);

  await run('xcrun', [
    'notarytool',
    'submit',
    zipPath,
    '--apple-id',
    appleId,
    '--password',
    applePassword,
    '--team-id',
    appleTeamId,
    '--wait',
  ]);

  await run('xcrun', ['stapler', 'staple', appPath]);
};
