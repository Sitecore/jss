import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { AngularAnswer } from './AngularAnswer';
import { userPrompts } from './user-prompts'
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps/transform';
// import { isDevEnvironment } from '../../common/utils/helpers';

export class AngularInitializer implements Initializer {
  async init(args: ParsedArgs) {
    // identify defaults
    let defaults = args.yes
      ? {
          appName: 'sitecore-jss-angular',
          destination: `${process.cwd()}\\sitecore-jss-angular`,
          fetchWith: 'GraphQL',
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
        }
      : {};

    // override defaults with passed in args (if any)
    defaults = Object.assign(defaults, args);

    const answers = await prompt<AngularAnswer>(userPrompts, defaults);
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

    const templatePath = path.resolve(__dirname, '../../templates/angular');
    await transform(templatePath, answers);

    // if (isDevEnvironment(destination)) {
    //   // TODO: write this for angular if needed
    //   // removeDevDependencies(destination);
    // }

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
  }
}
