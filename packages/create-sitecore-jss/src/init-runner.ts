import chalk from 'chalk';
import { installPackages, lintFix, nextSteps } from './common/steps';
import { BaseArgs } from './common/args/base';
import { InitializerFactory } from './InitializerFactory';

export const initRunner = async (initializers: string[], args: BaseArgs) => {
  let nextStepsArr: string[] = [];
  let appName;

  const runner = async (inits: string[]) => {
    for (const init of inits) {
      const initializer = new InitializerFactory().create(init);
      if (!initializer) {
        console.error(chalk.red(`Unsupported template '${init}'`));
        process.exit(1);
      }
      try {
        const response = await initializer.init(args);

        appName = response.appName;
        nextStepsArr = [...nextStepsArr, ...(response.nextSteps ?? [])];
        // pass a "yes" answer to subsequent initializers
        args.yes = response.yes || args.yes;

        // process any (post) initializers
        if (response.initializers && response.initializers.length > 0) {
          await runner(response.initializers);
        }
      } catch (error) {
        console.log(chalk.red('An error occurred: ', error));
        process.exit(1);
      }
    }
  };

  await runner(initializers);

  // final steps (install, lint, etc)
  if (!args.noInstall) {
    installPackages(args.destination);
    lintFix(args.destination);
  }
  if (!args.silent) {
    nextSteps(appName || '', nextStepsArr);
  }
};
