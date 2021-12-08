import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { Initializer } from '../../common/Initializer';
import { isJssApp, openPackageJson } from '../../common/utils/helpers';
import { transform } from '../../common/steps/index';
import { styleguidePrompts, StyleguideAnswer } from '../../common/prompts/styleguide';
import { StyleguideArgs } from '../../common/args/styleguide';

export class NextjsStyleguideInitializer implements Initializer {
  async init(args: StyleguideArgs) {
    let pkg;

    if (!args.yes) {
      pkg = openPackageJson(`${args.destination}\\package.json`);
      isJssApp('nextjs-styleguide', pkg);
    }

    const defaults = args.yes ? { language: '' } : {};

    const styleguideAnswers = await prompt<StyleguideAnswer>(styleguidePrompts, defaults);

    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || 'default',
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
      ...styleguideAnswers,
    };

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-styleguide');

    await transform(templatePath, mergedArgs, {
      filter: (filePath) => {
        return !!mergedArgs.language || !filePath.endsWith('{{language}}.yml');
      },
    });

    const response = {
      nextSteps: [`* Try out your application with ${chalk.green('jss start')}`],
      appName: mergedArgs.appName,
      yes: mergedArgs.yes,
    };

    return response;
  }
}
