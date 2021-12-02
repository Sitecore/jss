import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { NextjsAnswer } from '../models';
import { userPrompts } from './user-prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';

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

    const answers = await prompt<NextjsAnswer>(userPrompts, defaults);

    const destination = path.resolve(answers.destination);
    if (!args.yes && fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
      const answer = await prompt({
        type: 'confirm',
        name: 'continue',
        message: `Directory '${answers.destination}' not empty. Are you sure you want to continue?`,
      });
      if (!answer.continue) {
        process.exit();
      }
    }

    const templatePath = path.resolve(__dirname, '../../templates/nextjs');
    await transform(templatePath, answers);

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
    // if (!answers.initialized || !answers.more) {
    //   console.log('nextjs install', answers.initialized, answers.more);

    //   installPackages(answers.destination);
    //   lintFix(answers.destination);
    // }

    // if (!answers.silent) {
    //   nextSteps(answers.appName);
    // }
  }
}
