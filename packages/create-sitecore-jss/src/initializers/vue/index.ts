import path from 'path';
import { prompt } from 'inquirer';
import { prompts, VueAnswer } from './prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { VueArgs } from './args';
import { FetchWith } from '../../common/prompts/base';
import chalk from 'chalk';

export default class VueInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: VueArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-vue',
          hostName: 'sitecore-jss-vue.dev.local',
          fetchWith: FetchWith.GraphQL,
          appPrefix: true,
          language: '',
        }
      : {};

    const answers = await prompt<VueAnswer>(prompts, { ...defaults, ...args });

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/vue');
    await transform(templatePath, mergedArgs, {
      filter: (filePath) => {
        return (
          !filePath.endsWith('index.html') &&
          (!!mergedArgs.language || !filePath.endsWith('{{language}}.yml'))
        );
      },
    });

    const response = {
      appName: answers.appName,
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
    };

    return response;
  }
}
