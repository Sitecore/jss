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
const argv: ParsedArgs = parseArgs(process.argv.slice(2), { boolean: ['appPrefix', 'yes'] });

const main = async () => {
  let templates: string[] = [];

  // check if templates were provided
  if (argv._.length > 0 && argv._[0] !== undefined) {
    // use positional parameter
    templates = [argv._[0]];
  } else {
    // use --templates arg
    templates = argv.templates?.trim().split(',') || [];
  }
  const baseTemplates = await getBaseTemplates(path.resolve(__dirname, 'templates'));
  // validate/gather templates
  if (!templates.length) {
    const answer = await prompt({
      type: 'list',
      name: 'template',
      message: 'Which templates would you like to create?',
      choices: baseTemplates,
      default: 'nextjs',
    });
    templates.push(answer.template);
  }

  // validate/gather destination
  const defaultDestination = `${process.cwd()}${
    argv.appName ? '\\' + argv.appName : '\\sitecore-jss-app'
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
    initRunner(templates, { ...argv, destination, templates });
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
    process.exit(1);
  }
};

main();
