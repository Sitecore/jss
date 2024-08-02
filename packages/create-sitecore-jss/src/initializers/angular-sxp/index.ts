import path, { sep } from 'path';
import {
  Initializer,
  openJsonFile,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
} from '../../common';
import { InitializerResults } from '../../common/Initializer';

export default class AngularSxpInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openJsonFile(`${args.destination}${sep}package.json`);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/angular-sxp');

    await transform(templatePath, mergedArgs);

    const response: InitializerResults = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
