import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { prompts, NextjsAnswer } from './prompts';
import { Initializer, transform, isDevEnvironment } from '../../common';
import { removeDevDependencies } from './remove-dev-dependencies';
import { NextjsArgs } from './args';

export default class NextjsInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: NextjsArgs) {
    const answers = await prompt<NextjsAnswer>(prompts, args);

    const templatePath = path.resolve(__dirname, '../../templates/nextjs');
    await transform(templatePath, { ...args, ...answers });

    if (!isDevEnvironment(args.destination)) {
      removeDevDependencies(args.destination);
    }

    let addInitializers: string[] = [];

    // don't prompt for add-on initializers if --yes or they've already specified
    // multiple via --templates (assume they know what they're doing)
    if (!args.yes && args.templates.length === 1) {
      const addInitAnswer = await prompt({
        type: 'checkbox',
        name: 'addInitializers',
        message: 'Would you like to include any add-on initializers?',
        choices: ['nextjs-styleguide', 'nextjs-sxa'],
      });
      addInitializers = addInitAnswer.addInitializers;
    }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
      initializers: addInitializers,
    };

    return response;
  }
}
