﻿﻿import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  missingAddonMsg,
} from '../../common';

export default class NextjsSxaProjectBasic implements Initializer {
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

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-sxa-project-basic');

    await transform(templatePath, mergedArgs);

    if (!args.templates.includes('nextjs-sxa') && !pkg.config?.templates?.includes('nextjs-sxa')) {
      console.log(missingAddonMsg('nextjs-sxa-project-basic', 'nextjs-sxa'));
    }

    const response = {
      nextSteps: [],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
