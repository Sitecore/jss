import chalk from 'chalk';
import { installPackages, lintFix, nextSteps } from './common/steps';
import { BaseArgs } from './common/args/base';
import { InitializerFactory } from './InitializerFactory';

export const initRunner = async (initializers: string[], args: BaseArgs) => {
  const nextStepsArr: string[] = [];
  let response;
  for (const initializer of initializers) {
    const init = new InitializerFactory().create(initializer);
    if (!init) {
      console.error(chalk.red(`Unsupported template '${initializer}'`));
      process.exit(1);
    }
    try {
      response = await init.init(args);
      if (response.nextSteps) {
        response.nextSteps.forEach((step) => nextStepsArr.push(step));
      }
      // pass a "yes" answer to subsequent initializers
      args.yes = response.yes || args.yes;
    } catch (error) {
      console.log(chalk.red('An error occurred: ', error));
    }
  }

  if (!args.initialized) {
    installPackages(args.destination);
    lintFix(args.destination);
    !args.silent && nextSteps(response?.appName || '', nextStepsArr);
  }
};
