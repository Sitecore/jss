import chalk from 'chalk';
import { installPackages, lintFix, nextSteps } from './common/steps';
import { BaseArgs } from './common/args/base';
import { InitializerFactory } from './InitializerFactory';

export const initRunner = async (initializers: string[], args: BaseArgs) => {
  let nextStepsArr: string[] = [];
  let appName;

  const initFactory = await new InitializerFactory();
  const runner = async (inits: string[]) => {
    for (const init of inits) {
      const initializer = await initFactory.create(init);

      args.silent || console.log(chalk.cyan(`Initializing '${init}'...`));
      const response = await initializer.init(args);

      appName = response.appName;
      nextStepsArr = [...nextStepsArr, ...(response.nextSteps ?? [])];

      // process any (post) initializers
      if (response.initializers && response.initializers.length > 0) {
        await runner(response.initializers);
      }
    }
  };

  await runner(initializers);

  // final steps (install, lint, etc)
  if (!args.noInstall) {
    installPackages(args.destination, args.silent);
    lintFix(args.destination, args.silent);
  }
  if (!args.silent) {
    nextSteps(appName || '', nextStepsArr);
  }
};
