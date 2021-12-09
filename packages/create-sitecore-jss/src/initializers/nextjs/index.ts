import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { prompt } from 'inquirer';
import { prompts, NextjsAnswer, Prerender } from './prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { isDevEnvironment } from '../../common/utils/helpers';
import { removeDevDependencies } from './remove-dev-dependencies';
import { NextjsArgs } from './args';
import { FetchWith } from '../../common/prompts/base';

export class NextjsInitializer implements Initializer {
  async init(args: NextjsArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-nextjs',
          fetchWith: FetchWith.GraphQL,
          prerender: Prerender.SSG,
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
        }
      : {};

    const answers = await prompt<NextjsAnswer>(prompts, { ...defaults, ...args });

    const destination = path.resolve(args.destination);
    if (fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
      if (!args.yes) {
        const answer = await prompt({
          type: 'confirm',
          name: 'continue',
          message: `Directory '${args.destination}' not empty. Are you sure you want to continue?`,
        });
        if (!answer.continue) {
          process.exit();
        }
      }
    } else {
      args.yes = true; // ensure we don't diff prompt for subsequent initializers
    }

    const templatePath = path.resolve(__dirname, '../../templates/nextjs');
    await transform(templatePath, { ...args, ...answers });

    if (!isDevEnvironment(destination)) {
      removeDevDependencies(destination);
    }

    let postInitializers: string[] = [];

    // don't prompt for post-initializers if they've already specified
    // multiple via --templates (assume they know what they're doing)
    if (args.templates.length === 1) {
      const postInitAnswer = await prompt({
        type: 'checkbox',
        name: 'postInitializers',
        message: 'Would you like to add any post-initializers?',
        choices: ['nextjs-styleguide'],
      });
      postInitializers = postInitAnswer.postInitializers;
    }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
      initializers: postInitializers,
      yes: args.yes,
    };

    return response;
  }
}
