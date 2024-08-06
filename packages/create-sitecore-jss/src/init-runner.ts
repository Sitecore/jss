import chalk from 'chalk';
import path, { sep } from 'path';
import {
  installPackages,
  lintFix,
  nextSteps,
  BaseArgs,
  saveConfiguration,
  installPrePushHook,
} from './common';
import { InitializerFactory } from './InitializerFactory';

export const initRunner = async (initializers: string[], args: BaseArgs) => {
  let nextStepsArr: string[] = [];
  const appNames = new Set<string>([]);

  const initFactory = new InitializerFactory();

  const runner = async (inits: string[]): Promise<void> => {
    for (const init of [...inits]) {
      const initializer = await initFactory.create(init);
      if (!initializer) {
        throw new RangeError(`Unknown template '${init}'`);
      }

      args.silent || console.log(chalk.cyan(`Initializing '${init}'...`));
      const response = await initializer.init(args);

      // App names can be multiple if the base template requires to setup additional standalone app (e.g. XM Cloud proxy)
      appNames.add(response.appName);
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

  for (const destination of [args.destination, args.proxyAppDestination]) {
    if (!destination) continue;
    // final steps (install, lint, etc)
    if (!args.noInstall) {
      installPackages(destination, args.silent);
      lintFix(destination, args.silent);
    }

    // install pre-push hook if user opts-in
    if (args.prePushHook) {
      await installPrePushHook(destination, args.silent);
    }
  }

  if (!args.silent) {
    nextSteps([...appNames], nextStepsArr);
  }
};
