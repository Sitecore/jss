import path from 'path';
import { prompt } from 'inquirer';
import { prompts, VueAnswer } from './prompts';
import { Initializer, transform } from '../../common';
import { VueArgs } from './args';
import chalk from 'chalk';

export default class VueInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: VueArgs) {
    const answers = await prompt<VueAnswer>(prompts, args);

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/vue');
    await transform(templatePath, mergedArgs);

    const response = {
      appName: answers.appName,
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
    };

    return response;
  }
}
