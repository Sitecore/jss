import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  missingAddonMsg,
  incompatibleAddonsMsg,
} from '../../common';

export default class NextjsStyleguideInitializer implements Initializer {
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

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-styleguide-tracking');

    await transform(templatePath, mergedArgs);

    if (
      !args.templates.includes('nextjs-styleguide') &&
      !pkg.config?.templates?.includes('nextjs-styleguide')
    ) {
      console.log(missingAddonMsg('nextjs-styleguide-tracking', 'nextjs-styleguide'));
    }

    if (
      args.templates.includes('nextjs-personalize') ||
      pkg.config?.templates?.includes('nextjs-personalize')
    ) {
      console.log(incompatibleAddonsMsg('nextjs-styleguide-tracking', 'nextjs-personalize'));
    }

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
