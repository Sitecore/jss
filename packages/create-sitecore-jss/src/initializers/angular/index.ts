import path from 'path';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import { AngularArgs } from './args';
import { AngularAnswer, prompts } from './prompts';
import { FetchWith } from '../../common/prompts/base';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps/transform';

export class AngularInitializer implements Initializer {
  async init(args: AngularArgs) {
    // identify defaults
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-angular',
          fetchWith: FetchWith.GraphQL,
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
          language: '',
        }
      : {};

    const answers = await prompt<AngularAnswer>(prompts, { ...args, ...defaults });

    const mergedArgs = {
      ...args,
      ...answers,
    };
    const templatePath = path.resolve(__dirname, '../../templates/angular');
    await transform(templatePath, mergedArgs, {
      filter: (filePath) => {
        return !!mergedArgs.language || !filePath.endsWith('{{language}}.yml');
      },
    });

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
  }
}
