import fs from 'fs';
import path, { sep } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { initRunner } from './init-runner';
import minimist, { ParsedArgs } from 'minimist';
import { getAllTemplates, getBaseTemplates } from './common';
import { proxyAppMatcher, getDefaultProxyDestination } from './common/utils/helpers';

export const parseArgs = (): ParsedArgs => {
  // parse any command line arguments passed into `init sitecore-jss`
  // to pass to the generator prompts and skip them.
  // useful for CI and testing purposes
  const options = {
    boolean: ['appPrefix', 'force', 'noInstall', 'yes', 'silent', 'prePushHook'],
    string: [
      'appName',
      'destination',
      'proxyAppDestination',
      'templates',
      'hostName',
      'fetchWith',
      'language',
    ],
    default: { prePushHook: null },
  };
  const args: ParsedArgs = minimist(process.argv.slice(2), options);

  // we need to coerce string parameters in minimist above (to prevent string options without a value e.g. `--appName` from coming in as a boolean `true`).
  // however, coersion will result in an empty string and inquirer will treat this as a valid answer value (and not prompt!).
  // we need to go back through and remove these to prevent this.
  options.string.forEach((key) => {
    args[key] === '' && delete args[key];
  });
  return args;
};

export const getDestinations = async (args: ParsedArgs, templates: string[]) => {
  if (templates.length === 0) {
    throw new Error('Unable to get destinations, provided templates are empty');
  }
  // validate/gather destinations
  const defaultBaseDestination = `${process.cwd()}${
    args.appName ? sep + args.appName : `${sep}${templates[0]}`
  }`;
  let destination = args.destination;
  if (!destination) {
    destination = args.yes
      ? defaultBaseDestination
      : await promptDestination(
          'Where would you like your new app created?',
          defaultBaseDestination
        );
  }

  // work with node-proxy destination if needed
  const proxyApp = templates.find((template) => template.match(proxyAppMatcher));
  if (proxyApp) {
    // put the proxy alongside main app by default
    const defaultProxyDestination = getDefaultProxyDestination(destination, proxyApp);
    let proxyAppDestination = args.proxyAppDestination;
    if (!proxyAppDestination) {
      proxyAppDestination = args.yes
        ? defaultProxyDestination
        : await promptDestination(
            'Where would you like your proxy app created?',
            defaultProxyDestination
          );
    }
    while (path.resolve(proxyAppDestination) === path.resolve(destination)) {
      proxyAppDestination = await promptDestination(
        'Proxy app and base app cannot be located in the same folder. Please input another path for proxy',
        defaultProxyDestination
      );
    }
    return {
      destination,
      proxyAppDestination,
    };
  }

  return {
    destination,
  };
};

export const promptDestination = async (prompt: string, defaultDestination: string) => {
  return (
    await inquirer.prompt({
      type: 'input',
      name: 'destination',
      message: prompt,
      default: () => defaultDestination,
    })
  ).destination;
};

export const main = async (args: ParsedArgs) => {
  let templates: string[] = [];

  // check if templates were provided
  if (args._.length > 0 && args._[0] !== undefined) {
    // use positional parameter
    templates = (args._[0] && args._[0].split(/[\s,]+/)) || [];
  } else {
    // use --templates arg
    templates = (args.templates && args.templates.split(/[\s,]+/)) || [];
  }

  // validate/gather templates
  const templatePath = path.resolve(__dirname, 'templates');
  if (templates.length > 0) {
    const allTemplates = getAllTemplates(templatePath);
    const validTemplates: string[] = [];
    templates.forEach((template) => {
      if (allTemplates.includes(template)) {
        validTemplates.push(template);
      } else {
        console.log(chalk.yellow(`Ignoring unknown template '${template}'...`));
      }
    });
    templates = validTemplates;
  }
  if (!templates.length) {
    const baseTemplates = await getBaseTemplates(templatePath);
    const answer = await inquirer.prompt({
      type: 'list',
      name: 'template',
      message: 'Which template would you like to create?',
      choices: baseTemplates,
      default: 'nextjs',
    });
    templates.push(answer.template);
  }

  const destinations = await getDestinations(args, templates);

  for (const destination of [destinations.destination, destinations.proxyAppDestination]) {
    if (!destination) continue;
    if (!args.force && fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: `Directory '${destination}' not empty. Are you sure you want to continue?`,
      });
      if (!answer.continue) {
        process.exit();
      }
    } else {
      args.force = true;
    }
  }

  if (!args.yes) {
    if (args.prePushHook === null) {
      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'prePushHook',
        message: 'Would you like to use the pre-push hook for linting check?',
        default: false,
      });

      args.prePushHook = answer.prePushHook;
    }
  } else {
    if (args.prePushHook === null) {
      args.prePushHook = false;
    }
  }

  try {
    await initRunner(templates.slice(), { ...args, ...destinations, templates });
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
    process.exit(1);
  }
};
