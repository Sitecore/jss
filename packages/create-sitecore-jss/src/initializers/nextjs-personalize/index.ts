import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  // styleguidePrompts,
  // StyleguideAnswer,
  // StyleguideArgs,
  ClientAppArgs,
} from '../../common';

// type NextjsStyleguideArgs = ClientAppArgs & StyleguideArgs;

export default class NextjsPersonalizeInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openPackageJson(`${args.destination}${sep}package.json`);

    // TODO: prompts for Personalize
    // const answers = await prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
      // ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-personalize');

    await transform(templatePath, mergedArgs);

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
