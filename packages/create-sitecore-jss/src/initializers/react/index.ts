import chalk from 'chalk';
import path, { sep } from 'path';
import { prompt } from 'inquirer';
import {
  Initializer,
  isDevEnvironment,
  openPackageJson,
  transform,
  writePackageJson,
  removeFile,
} from '../../common';
import { prompts, ReactAnswer } from './prompts';
import { ReactArgs } from './args';

export default class ReactInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: ReactArgs) {
    const answers = await prompt<ReactAnswer>(prompts, args);

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/react');
    await transform(templatePath, mergedArgs);

    const isDev = isDevEnvironment(args.destination);
    const pkgPath = path.resolve(`${args.destination}${sep}package.json`);
    const pkg = openPackageJson(pkgPath);

    if (isDev) {
      Object.entries<string>(pkg.scripts).forEach(([key, value]) => {
        // Can't rewire `eject` script
        if (key === 'eject') return;

        // It's required to start each command using `react-app-rewired`, to solve duplicate `react` issue
        pkg.scripts[key] = value.replace('react-scripts', 'react-app-rewired');
      });

      writePackageJson(pkg, pkgPath);
    } else {
      // Don't need to rewire anything if we are not in the dev env
      delete pkg.devDependencies['react-app-rewired'];

      // remove webpack overrides
      removeFile(path.resolve(`${args.destination}${sep}config-overrides.js`));

      writePackageJson(pkg, pkgPath);
    }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
  }
}
