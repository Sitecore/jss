/* eslint-disable prettier/prettier */
import { setup } from '@sitecore-jss/sitecore-jss-dev-tools';

export const command = 'setup';

export const describe =
  'Sets up the scjssconfig.json config file, which defines how this application connects to a Sitecore instance for content or deployment.';

export const builder = {
  instancePath: {
    requiresArg: false,
    type: 'string',
    describe: 'Path to the Sitecore "Website" folder (e.g. c:\\dev\\sitecore\\Website)',
  },
  deployUrl: {
    requiresArg: false,
    type: 'string',
    describe:
      'Sitecore host used to deploy the app (e.g. http://sitecore9/sitecore/api/jss/import)',
  },
  layoutServiceHost: {
    requiresArg: false,
    type: 'string',
    describe: 'Sitecore host used to download Layout Service data (e.g. http://sitecore9)',
  },
  apiKey: {
    requiresArg: false,
    type: 'string',
    describe:
      'Sitecore API Key (GUID of item under /sitecore/system/Settings/Services/API Keys/ in master db, or core db for Sitecore 9.0)',
  },
  deploySecret: {
    requiresArg: false,
    type: 'string',
    describe: 'Deployment secret (32+ random chars)',
  },
  nonInteractive: {
    requiresArg: false,
    type: 'boolean',
    describe: 'Disallows interactive prompts (all other arguments must be passed in this mode)',
  },
  outputFile: {
    requiresArg: false,
    type: 'string',
    describe: 'The file path to output the config to. Defaults to the app\'s scjssconfig.json',
  },
  skipValidation: {
    requiresArg: false,
    type: 'boolean',
    describe: 'Skip validation of command arguments (e.g. for CI)',
  },
};

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(argv: any) {
  setup(!argv.nonInteractive, argv.outputFile, argv);
}
