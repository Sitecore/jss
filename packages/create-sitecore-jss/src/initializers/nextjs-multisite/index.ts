import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
} from '../../common';

export default class NextjsMultisiteInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openPackageJson(`${args.destination}${sep}package.json`);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-multisite');

    await transform(templatePath, mergedArgs);

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
