import path from 'path';
import { prompt } from 'inquirer';
import { prompts, ReactNativeAnswer } from './prompts';
import { Initializer, transform } from '../../common';
import { ReactNativeArgs } from './args';

export default class ReactNativeInitializer implements Initializer {
  get isBase() {
    return true;
  }

  async init(args: ReactNativeArgs) {
    const answers = await prompt<ReactNativeAnswer>(prompts, args);

    const mergedArgs = {
      ...args,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/react-native');
    await transform(templatePath, mergedArgs);

    const response = {
      appName: answers.appName,
    };

    return response;
  }
}
