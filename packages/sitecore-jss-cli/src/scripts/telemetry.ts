import fs from 'fs';
import path from 'path';

export const command = 'telemetry <configure>';

export const describe = 'Configures telemetry for the app, use `jss telemetry <enable/disable>`';

export const builder = {};

export function handler(argv: { [key: string]: unknown; configure: string }) {
  if (!['enable', 'disable'].includes(argv.configure)) return;

  const envFilePath = path.resolve(process.cwd(), './.env');

  const value = argv.configure === 'enable' ? 'true' : 'false';

  const envFile = fs
    .readFileSync(envFilePath, { encoding: 'utf-8' })
    .replace(/^JSS_TELEMETRY=.*/gm, `JSS_TELEMETRY=${value}`);

  fs.writeFileSync(envFilePath, envFile);
}
