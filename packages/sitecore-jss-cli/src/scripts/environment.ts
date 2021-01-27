/* eslint-disable prettier/prettier */
/*
 * Hidden testing/debugging command to print environment variable values.
 */

export const command = 'environment';

export const describe = false;

export const builder = {
  name: {
    requiresArg: true,
    type: 'string',
    describe: 'The name of the environment variable to print.',
  },
};

/**
 * Environment variable handler
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handler(argv: any) {
  if (argv && argv.name) {
    console.log(`process.env.${argv.name} = ${process.env[argv.name]}`);
  }
}
