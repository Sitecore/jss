import path from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
} from '../../common';

export default class NextjsSxaInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openPackageJson(`${args.destination}\\package.json`);

    // TODO: prompts for SXA
    // const answers = await prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-sxa');

    await transform(templatePath, mergedArgs);

    const response = {
      // TODO: next steps
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
