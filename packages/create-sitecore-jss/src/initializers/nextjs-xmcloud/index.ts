import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  isDevEnvironment,
  DEFAULT_APPNAME,
  ClientAppArgs,
  incompatibleAddonsMsg,
} from '../../common';
import { removeDevDependencies } from './remove-dev-dependencies';

export default class NextjsXMCloudInitializer implements Initializer {
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

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-xmcloud');

    await transform(templatePath, mergedArgs);

    if (!isDevEnvironment(args.destination)) {
      removeDevDependencies(args.destination);
    }

    if (
      args.templates.includes('nextjs-styleguide-tracking') ||
      pkg.config?.templates?.includes('nextjs-styleguide-tracking')
    ) {
      console.log(incompatibleAddonsMsg('nextjs-xmcloud', 'nextjs-styleguide-tracking'));
    }

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
