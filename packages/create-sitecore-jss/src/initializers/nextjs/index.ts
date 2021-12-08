import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { NextjsAnswer } from './NextjsAnswer';
import { userPrompts } from './user-prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { isDevEnvironment } from '../../common/utils/helpers';
import { removeDevDependencies } from './remove-dev-dependencies';

export class NextjsInitializer implements Initializer {
  async init(args: ParsedArgs) {
    // identify defaults
    let defaults = args.yes
      ? {
          appName: 'sitecore-jss-nextjs',
          destination: `${process.cwd()}\\sitecore-jss-nextjs`,
          fetchWith: 'GraphQL',
          prerender: 'SSG',
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
        }
      : {};

    // override defaults with passed in args (if any)
    defaults = Object.assign(defaults, args);

    // run args through prompt to provide answers
    const answers = await prompt<NextjsAnswer>(userPrompts, defaults);

    const destination = path.resolve(answers.destination);
    if (fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
      if (!answers.yes) {
        const answer = await prompt({
          type: 'confirm',
          name: 'continue',
          message: `Directory '${answers.destination}' not empty. Are you sure you want to continue?`,
        });
        if (!answer.continue) {
          process.exit();
        }
      }
    } else {
      answers.yes = true; // ensure we don't diff prompt for subsequent initializers
    }

    const templatePath = path.resolve(__dirname, '../../templates/nextjs');
    await transform(templatePath, answers);

    if (!isDevEnvironment(destination)) {
      removeDevDependencies(destination);
    }

    let postInitializers: string[] = [];
    // don't prompt for post-initializers if they've already specified multiple (assume they know what they're doing)
    if (!args.templates || args.templates.indexOf(',') === -1) {
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
      yes: answers.yes,
    };

    return response;
  }
}
