import chalk from 'chalk';
import path, { sep } from 'path';
import {
  Initializer,
  openPackageJson,
  transform,
  DEFAULT_APPNAME,
  ClientAppArgs,
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
      console.log(
        chalk.yellow(
          'nextjs-styleguide-tracking addon can not be used without the nextjs-styleguide addon!'
        )
      );
    }

    if (
      args.templates.includes('nextjs-personalize') ||
      pkg.config?.templates?.includes('nextjs-personalize')
    ) {
      console.log(
        chalk.yellow(
          'nextjs-styleguide-tracking addon is not compatible with nextjs-personalize addon!'
        )
      );
    }

    const response = {
      nextSteps: [`* Try out your application with ${chalk.green('jss start')}`],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
