import path, { sep } from 'path';
import {
  ClientAppArgs,
  DEFAULT_APPNAME,
  Initializer,
  transform,
  openPackageJson,
} from '../../common';
import { InitializerResults } from '../../common/Initializer';

export default class AngularXmCloudInitializer implements Initializer {
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

    const templatePath = path.resolve(__dirname, '../../templates/angular-xmcloud');

    await transform(templatePath, mergedArgs);

    const response: InitializerResults = {
      nextSteps: [],
      appName: args.appName || DEFAULT_APPNAME,
    };

    return response;
  }
}
