import path from 'path';
import { prompt } from 'inquirer';
import { prompts, ReactNativeAnswer } from './prompts';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps';
import { ReactNativeArgs } from './args';

export default class ReactNativeInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: ReactNativeArgs) {
    const defaults = args.yes
      ? {
          appName: 'sitecore-jss-react-native',
          hostName: 'sitecore-jss-react-native.dev.local',
          language: '',
        }
      : {};

    const answers = await prompt<ReactNativeAnswer>(prompts, { ...defaults, ...args });

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/react-native');
    await transform(templatePath, mergedArgs, {
      filter: (filePath: string) =>
        !!mergedArgs.language || !filePath.endsWith('{{language}}.json'),
    });

    const response = {
      appName: answers.appName,
    };

    return response;
  }
}
