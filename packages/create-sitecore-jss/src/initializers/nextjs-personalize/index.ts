import chalk from 'chalk';
import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  incompatibleAddonsMsg,
} from '../../common';

export default class NextjsPersonalizeInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openPackageJson(`${args.destination}${sep}package.json`);

    // TODO: prompts for Personalize and argument types
    // const answers = await prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-personalize');

    await transform(templatePath, mergedArgs);

    if (
      args.templates.includes('nextjs-styleguide-tracking') ||
      pkg.config?.templates?.includes('nextjs-styleguide-tracking')
    ) {
      console.log(incompatibleAddonsMsg('nextjs-personalize', 'nextjs-styleguide-tracking'));
    }

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
