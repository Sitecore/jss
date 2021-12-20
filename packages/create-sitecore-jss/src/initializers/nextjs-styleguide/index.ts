import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { Initializer } from '../../common/Initializer';
import { isJssApp, openPackageJson } from '../../common/utils/helpers';
import { transform } from '../../common/steps/index';
import { styleguidePrompts, StyleguideAnswer } from '../../common/prompts/styleguide';
import { StyleguideArgs } from '../../common/args/styleguide';
import { ClientAppArgs } from '../../common/args/base';

interface NextjsStyleguideArgs extends ClientAppArgs, StyleguideArgs {}

export default class NextjsStyleguideInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: NextjsStyleguideArgs) {
    const pkg = openPackageJson(`${args.destination}\\package.json`);

    if (!args.force && !isJssApp('nextjs-styleguide', pkg)) {
      process.exit(1);
    }

    const answers = await prompt<StyleguideAnswer>(styleguidePrompts, {
      ...args,
    });

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || 'default',
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
      ...answers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-styleguide');

    await transform(templatePath, mergedArgs);

    const response = {
      nextSteps: [`* Try out your application with ${chalk.green('jss start')}`],
      appName: mergedArgs.appName,
    };

    return response;
  }
}
