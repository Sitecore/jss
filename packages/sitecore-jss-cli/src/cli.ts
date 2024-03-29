import { CommandModule, Arguments } from 'yargs';
import cli from './cli-shared';
import resolvePackage from './resolve-package';
import runPackageScript from './run-package-script';
import * as commands from './scripts';

/**
 * Get package script commands
 */
export async function getPackageScriptCommands() {
  const packageJson = await resolvePackage();
  const result: { [key: string]: CommandModule } = {};

  if (!packageJson || !packageJson.scripts) {
    return result;
  }

  Object.keys(packageJson.scripts).forEach((script) => {
    if (script === 'jss') {
      return;
    }

    const command = makeCommand(script);

    result[script] = command;
  });

  return result;
}

/**
 * @param {string} script script name
 */
export function makeCommand(script: string) {
  return {
    command: script,
    describe: 'package.json script',
    builder: {},
    disableStrictArgs: true,
    handler: (argv: Arguments) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((argv as any)._[0]) {
        runPackageScript(process.argv.slice(2));
      }
    },
  };
}

/**
 * implements CLI commands when executed from a local node_modules folder
 */
export default async function() {
  const packageScripts = await getPackageScriptCommands();

  cli(Object.assign({}, commands, packageScripts));
}
