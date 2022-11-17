import chalk from 'chalk';
import path, { sep } from 'path';
import {
  TelemetryService,
  CreateTemplateTelemetryEvent,
  SystemInformationTelemetryEvent,
} from '@sitecore-jss/sitecore-jss/telemetry';
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

      if (response.fetchWith) {
        args.fetchWith = response.fetchWith;
      }
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

  if (args.telemetry !== 'false') {
    console.log(`JSS collects completely anonymous telemetry data about general usage.
Participation in this anonymous program is optional, and you may opt-out if you'd not like to share any information.
Use 'jss telemetry <disable/enable>'
    `);
  }

  TelemetryService.send([
    CreateTemplateTelemetryEvent({
      fetchWith: String(args.fetchWith || ''),
      templates: args.templates,
    }),
    SystemInformationTelemetryEvent(),
  ]);
};
