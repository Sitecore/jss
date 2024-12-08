﻿import path, { sep } from 'path';
import {
  Initializer,
  openJsonFile,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  incompatibleAddonsMsg,
} from '../../common';

export default class NextjsSxaInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openJsonFile(`${args.destination}${sep}package.json`);

    // TODO: prompts for SXA
    // const answers = await prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-sxa');

    await transform(templatePath, mergedArgs);

    if (
      args.templates.includes('nextjs-styleguide') ||
      pkg.config?.templates?.includes('nextjs-styleguide')
    ) {
      console.log(incompatibleAddonsMsg('nextjs-sxa', 'nextjs-styleguide'));
    }

    const response = {
      // TODO: next steps
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
