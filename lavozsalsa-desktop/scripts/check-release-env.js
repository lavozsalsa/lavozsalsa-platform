const checks = [
  {
    name: 'Firma macOS',
    vars: ['CSC_LINK', 'CSC_KEY_PASSWORD'],
  },
  {
    name: 'Instalador macOS firmado',
    vars: ['MAC_INSTALLER_IDENTITY'],
  },
  {
    name: 'Notarizacion macOS',
    vars: ['APPLE_ID', 'APPLE_APP_SPECIFIC_PASSWORD', 'APPLE_TEAM_ID'],
  },
  {
    name: 'Firma Windows',
    vars: ['WIN_CSC_LINK', 'WIN_CSC_KEY_PASSWORD'],
  },
];

for (const check of checks) {
  const missing = check.vars.filter((key) => !process.env[key]);
  if (missing.length === 0) {
    console.log(`${check.name}: listo`);
  } else {
    console.log(`${check.name}: faltan ${missing.join(', ')}`);
  }
}
