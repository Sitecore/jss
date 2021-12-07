import chalk from 'chalk';
import path from 'path';
import { prompt } from 'inquirer';
import { ParsedArgs } from 'minimist';
import { Initializer } from '../../common/Initializer';
import { userPrompts } from './user-prompts';
import { isJssApp, openPackageJson } from '../../common/utils/helpers';
import { transform } from '../../common/steps/index';
import { NextjsStyleguideAnswer } from './NextjsStyleguideAnswer';

export class NextjsStyleguideInitializer implements Initializer {
  async init(args: ParsedArgs) {
    let pkg;

    if (!args.yes) {
      pkg = openPackageJson(`${args.destination}\\package.json`);
      isJssApp('nextjs-styleguide', pkg);
    }

    const answers: NextjsStyleguideAnswer = {
      destination: args.destination || path.resolve(process.cwd()),
      appName: args.appName || pkg?.config.appName || 'default',
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const styleguideAnswers = await prompt<NextjsStyleguideAnswer>(userPrompts);

    answers.language = styleguideAnswers.language;

    const templatePath = path.resolve(__dirname, '../../templates/nextjs-styleguide');
    await transform(templatePath, answers);

    const response = {
      nextSteps: [`* Try out your application with ${chalk.green('jss start')}`],
      appName: args.appName,
      yes: args.yes,
    };

    return response;
  }
}
