#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { prompt } from 'inquirer';
import { initRunner } from './init-runner';
import parseArgs, { ParsedArgs } from 'minimist';
import { getBaseTemplates } from './common/utils/helpers';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const options = {
  boolean: ['appPrefix', 'force', 'noInstall', 'yes', 'silent'],
  string: ['appName', 'destination', 'templates', 'hostName', 'fetchWith', 'language'],
};
const argv: ParsedArgs = parseArgs(process.argv.slice(2), options);

// we need to coerce string parameters in minimist above (to prevent string options without a value e.g. `--appName` from coming in as a boolean `true`).
// however, coersion will result in an empty string and inquirer will treat this as a valid answer value (and not prompt!).
// we need to go back through and remove these to prevent this.
options.string.forEach((key) => {
  argv[key] === '' && delete argv[key];
});

const main = async () => {
  let templates: string[] = [];

  // check if templates were provided
  if (argv._.length > 0 && argv._[0] !== undefined) {
    // use positional parameter
    templates = (argv._[0] && argv._[0].split(/[\s,]+/)) || [];
  } else {
    // use --templates arg
    templates = (argv.templates && argv.templates.split(/[\s,]+/)) || [];
  }

  // validate/gather templates
  const templatePath = path.resolve(__dirname, 'templates');
  if (templates.length > 0) {
    const allTemplates = fs.readdirSync(templatePath, 'utf8');
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
    argv.appName ? '\\' + argv.appName : `\\${templates[0]}`
  }`;

  let destination = argv.destination;

  if (!destination) {
    if (argv.yes) {
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

  if (!argv.force && fs.existsSync(destination) && fs.readdirSync(destination).length > 0) {
    const answer = await prompt({
      type: 'confirm',
      name: 'continue',
      message: `Directory '${destination}' not empty. Are you sure you want to continue?`,
    });
    if (!answer.continue) {
      process.exit();
    }
  } else {
    argv.force = true;
  }

  try {
    await initRunner(templates, { ...argv, destination, templates });
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
    process.exit(1);
  }
};

main();
