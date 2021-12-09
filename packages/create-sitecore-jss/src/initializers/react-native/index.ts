import path from 'path';
import { prompt } from 'inquirer';
import { prompts, ReactNativeAnswer } from './prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { ReactNativeArgs } from './args';

export class ReactNativeInitializer implements Initializer {
  async init(args: ReactNativeArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-react-native',
          hostName: 'https://cm.jss.localhost',
          language: '',
        }
      : {};

    const answers = await prompt<ReactNativeAnswer>(prompts, { ...defaults, ...args });

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const FILTER_REGEXP = /.(jar)$/;
    const templatePath = path.resolve(__dirname, '../../templates/react-native');
    await transform(templatePath, mergedArgs, {
      filter: (filePath: string) =>
        !FILTER_REGEXP.test(filePath) &&
        (!!mergedArgs.language || !filePath.endsWith('{{language}}.json')),
    });

    const response = {
      appName: answers.appName,
      yes: args.yes,
    };

    return response;
  }
}
