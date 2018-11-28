import { builder as packageBuilder } from './package';

export const command = 'package';

export const describe = null;

export const builder = {
  deployUrl: {
    requiresArg: false,
    type: 'string',
  },
  skipPackage: {
    requiresArgs: false,
    type: 'boolean',
    default: false,
  },
  ...packageBuilder,
};

export async function handler() {
  console.error('jss deploy package is no longer used. Use jss deploy app instead.');
  process.exit(1);
}
