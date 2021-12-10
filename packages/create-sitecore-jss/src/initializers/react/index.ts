import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { FetchWith } from '../../common/prompts/base';
import { prompts, ReactAnswer } from './prompts';
import { ReactArgs } from './args';

export default class ReactInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: ReactArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-react',
          fetchWith: FetchWith.GraphQL,
          hostName: 'https://cm.jss.localhost',
          appPrefix: true,
          language: '',
        }
      : {};

    const answers = await prompt<ReactAnswer>(prompts, { ...defaults, ...args });

    const templatePath = path.resolve(__dirname, '../../templates/react');
    await transform(templatePath, { ...args, ...answers });

    const response = {
      nextSteps: [`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`],
      appName: answers.appName,
    };

    return response;
  }
}
