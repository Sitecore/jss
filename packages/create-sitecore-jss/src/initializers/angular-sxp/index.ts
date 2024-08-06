import path, { sep } from 'path';
import {
  Initializer,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
  SxpAnswer,
  sxpPrompts,
  StyleguideAnswer,
  styleguidePrompts,
  openJsonFile,
} from '../../common';
import { InitializerResults } from '../../common/Initializer';
import inquirer from 'inquirer';

export default class AngularSxpInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openJsonFile(`${args.destination}${sep}package.json`);
    const answers = await inquirer.prompt<SxpAnswer>(sxpPrompts, args);
    const styleguideAnswers = await inquirer.prompt<StyleguideAnswer>(styleguidePrompts, args);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
      ...answers,
      ...styleguideAnswers,
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
