import { CommandModule, Arguments } from '../node_modules/@types/yargs';
import cli from './cli-shared';
import resolvePackage from './resolve-package';
import runPackageScript from './run-package-script';
import * as commands from './scripts';

async function getPackageScriptCommands() {
  const packageJson = await resolvePackage();
  const result: { [key: string]: CommandModule } = {};

  if (!packageJson || !packageJson.scripts) {
    return result;
  }

  Object.keys(packageJson.scripts).forEach((script) => {
    if (script === 'jss') {
      return;
    }

    const command = {
      command: script,
      describe: 'package.json script',
      builder: {},
      disableStrictArgs: true,
      handler: (argv: Arguments) => {
        if ((argv as any)._[0]) {
          runPackageScript(process.argv.slice(2));
        }
      },
    };

    result[script] = command;
  });

  return result;
}

// implements CLI commands when executed from a local node_modules folder
export default async function() {
  const packageScripts = await getPackageScriptCommands();

  cli(Object.assign({}, commands, packageScripts));
}
