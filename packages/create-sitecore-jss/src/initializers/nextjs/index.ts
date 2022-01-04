import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { prompts, NextjsAnswer, Prerender } from './prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { isDevEnvironment } from '../../common/utils/helpers';
import { removeDevDependencies } from './remove-dev-dependencies';
import { NextjsArgs } from './args';
import { FetchWith } from '../../common/prompts/base';

export default class NextjsInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: NextjsArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-nextjs',
          fetchWith: FetchWith.REST,
          prerender: Prerender.SSG,
          hostName: 'sitecore-jss-nextjs.dev.local',
          appPrefix: false,
        }
      : {};

    const answers = await prompt<NextjsAnswer>(prompts, { ...defaults, ...args });

    const templatePath = path.resolve(__dirname, '../../templates/nextjs');
    await transform(templatePath, { ...args, ...answers });

    if (!isDevEnvironment(args.destination)) {
      removeDevDependencies(args.destination);
    }

    let featureInitializers: string[] = [];

    // don't prompt for feature initializers if they've already specified
    // multiple via --templates (assume they know what they're doing)
    if (args.templates.length === 1) {
      const featureInitAnswer = await prompt({
        type: 'checkbox',
        name: 'featureInitializers',
        message: 'Would you like to add any feature initializers?',
        choices: ['nextjs-styleguide'],
      });
      featureInitializers = featureInitAnswer.featureInitializers;
    }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
      initializers: featureInitializers,
    };

    return response;
  }
}
