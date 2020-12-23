/* eslint-disable prettier/prettier */
import { deploy, verifySetup, resolveScJssConfig } from '@sitecore-jss/sitecore-jss-dev-tools';
import path from 'path';
import resolvePackage from '../resolve-package';

export const command = 'config';

export const describe =
  'Deploys the app\'s Sitecore configuration file(s) to the Sitecore server. `jss deploy config --help` for options.';

export const builder = {
  source: {
    requiresArg: false,
    type: 'string',
    describe: 'The source path of the config patches to deploy.',
    default: './sitecore/config',
  },
  destination: {
    requiresArg: false,
    type: 'string',
    describe:
      'Destination path to deploy to. Defaults to the \'instancePath\' set in scjssconfig.json, combined with the \'sitecoreConfigPath\' setting from package.json.',
  },
  config: {
    requiresArg: false,
    type: 'string',
    describe: 'Path to scjssconfig file.',
    default: './scjssconfig.json',
  },
};

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(argv: any) {
  verifySetup();

  const options = {
    destinationPath: argv.destination,
    sourcePath: argv.source,
    clean: false,
  };

  if (!options.destinationPath) {
    const packageJson = await resolvePackage();
    const scJssConfig = await resolveScJssConfig({ configPath: argv.config });

    options.destinationPath = path.join(
      scJssConfig.sitecore.instancePath as string,
      packageJson.config.sitecoreConfigPath
    );
  }

  deploy(options);
}
