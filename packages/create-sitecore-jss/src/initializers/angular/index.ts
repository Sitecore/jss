import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { AngularArgs } from './args';
import { AngularAnswer, prompts } from './prompts';
import { Initializer, transform } from '../../common';

export default class AngularInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: AngularArgs) {
    const answers = await inquirer.prompt<AngularAnswer>(prompts, args);

    const mergedArgs = {
      ...args,
      ...answers,
    };
    const templatePath = path.resolve(__dirname, '../../templates/angular');
    await transform(templatePath, mergedArgs);

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
  }
}
