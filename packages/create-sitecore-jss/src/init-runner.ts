import chalk from 'chalk';
import path, { sep } from 'path';
import { installPackages, lintFix, nextSteps, BaseArgs, saveConfiguration } from './common';
import { InitializerFactory } from './InitializerFactory';

export const initRunner = async (initializers: string[], args: BaseArgs) => {
  let nextStepsArr: string[] = [];
  let appName;

  const initFactory = new InitializerFactory();
  const runner = async (inits: string[]) => {
    for (const init of inits) {
      const initializer = await initFactory.create(init);
      if (!initializer) {
        throw new RangeError(`Unknown template '${init}'`);
      }

      args.silent || console.log(chalk.cyan(`Initializing '${init}'...`));
      const response = await initializer.init(args);

      appName = response.appName;
      nextStepsArr = [...nextStepsArr, ...(response.nextSteps ?? [])];

      // process any returned initializers
      if (response.initializers && response.initializers.length > 0) {
        // provide info for addons to see other addons used.
        // add-ons will not have information about the initial
        // list of templates, as it has `nextjs` initializer for example
        args.templates.push(...response.initializers);

        await runner(response.initializers);
      }
    }
  };

  await runner(initializers);

  saveConfiguration(args.templates, path.resolve(`${args.destination}${sep}package.json`));

  // final steps (install, lint, etc)
  if (!args.noInstall) {
    installPackages(args.destination, args.silent);
    lintFix(args.destination, args.silent);
  }
  if (!args.silent) {
    nextSteps(appName || '', nextStepsArr);
  }
};
