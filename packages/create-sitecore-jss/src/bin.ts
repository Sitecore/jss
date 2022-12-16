import fs from 'fs';
import path, { sep } from 'path';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import { initRunner } from './init-runner';
import minimist, { ParsedArgs } from 'minimist';
import { getAllTemplates, getBaseTemplates } from './common';

export const parseArgs = (): ParsedArgs => {
  // parse any command line arguments passed into `init sitecore-jss`
  // to pass to the generator prompts and skip them.
  // useful for CI and testing purposes
  const options = {
    boolean: ['appPrefix', 'force', 'noInstall', 'yes', 'silent'],
    string: ['appName', 'destination', 'templates', 'hostName', 'fetchWith', 'language'],
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
    const answer = await prompt({
      type: 'list',
      name: 'template',
      message: 'Which template would you like to create?',
      choices: baseTemplates,
      default: 'nextjs',
    });
    templates.push(answer.template);
  }

  // validate/gather destination
  const defaultDestination = `${process.cwd()}${
    args.appName ? sep + args.appName : `${sep}${templates[0]}`
  }`;

  let destination = args.destination;

  if (!destination) {
    if (args.yes) {
      destination = defaultDestination;
    } else {
      const answer = await prompt({
        type: 'input',
        name: 'destination',
        message: 'Where would you like your new app created?',
        default: () => defaultDestination,
      });

      destination = answer.destination;
    }
  }

  if (!args.force && fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
    const answer = await prompt({
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

  try {
    await initRunner(templates.slice(), { ...args, destination, templates });
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
    process.exit(1);
  }
};
