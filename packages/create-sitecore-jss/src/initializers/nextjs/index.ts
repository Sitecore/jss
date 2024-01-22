import chalk from 'chalk';
import path, { sep } from 'path';
import inquirer from 'inquirer';
import { prompts, NextjsAnswer, NextjsCheckbox } from './prompts';
import {
  Initializer,
  transform,
  isDevEnvironment,
  openPackageJson,
  writePackageJson,
} from '../../common';
import { removeDevDependencies } from './remove-dev-dependencies';
import { NextjsArgs } from './args';

inquirer.registerPrompt('nextjs-checkbox', NextjsCheckbox);

enum PlatformCompatibility {
  SXP,
  XMC,
  Both,
}

const addOnChoices = [
  {
    name: 'nextjs-styleguide - Includes example components and setup for working disconnected',
    value: 'nextjs-styleguide',
    platform: PlatformCompatibility.Both,
  },
  {
    name: 'nextjs-styleguide-tracking - Includes example (Sitecore XP) tracking component',
    value: 'nextjs-styleguide-tracking',
    platform: PlatformCompatibility.SXP,
  },
  {
    name: 'nextjs-sxa - Includes example components and setup for Headless SXA projects',
    value: 'nextjs-sxa',
    platform: PlatformCompatibility.Both,
  },
  {
    name:
      'nextjs-multisite - Includes example setup for hosting multiple sites in a single NextJS application',
    value: 'nextjs-multisite',
    platform: PlatformCompatibility.Both,
  },
];

export default class NextjsInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: NextjsArgs) {
    const answers = await inquirer.prompt<NextjsAnswer>(prompts, args);

    const pkgPath = path.resolve(`${answers.destination}${sep}package.json`);
    const templatePath = path.resolve(__dirname, '../../templates/nextjs');

    await transform(templatePath, { ...args, ...answers });

    if (!isDevEnvironment(args.destination)) {
      removeDevDependencies(args.destination);
    }

    const addInitializers: string[] = [];

    if (answers.xmcloud && !args.templates.includes('nextjs-xmcloud')) {
      // add the "system" nextjs-xmcloud template if needed
      addInitializers.push('nextjs-xmcloud');
    }

    // don't prompt for add-on initializers if --yes or they've already specified
    // multiple via --templates (assume they know what they're doing)
    if (!args.yes && args.templates.length === 1) {
      const addInitAnswer = await inquirer.prompt({
        type: 'nextjs-checkbox' as 'checkbox',
        name: 'addInitializers',
        message: 'Would you like to include any add-on initializers?',
        choices: addOnChoices.filter((choice) => {
          return (
            choice.platform === PlatformCompatibility.Both ||
            (answers.xmcloud && choice.platform === PlatformCompatibility.XMC) ||
            (!answers.xmcloud && choice.platform === PlatformCompatibility.SXP)
          );
        }),
      });
      addInitializers.push(...addInitAnswer.addInitializers);
    }

    if (
      !addInitializers.includes('nextjs-styleguide') &&
      !args.templates.includes('nextjs-styleguide')
    ) {
      const pkg = openPackageJson(pkgPath);

      pkg.scripts.bootstrap = pkg.scripts.bootstrap.replace(' && graphql-let', '');

      writePackageJson(pkg, pkgPath);
    }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
      initializers: addInitializers,
    };

    return response;
  }
}
