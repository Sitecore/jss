#!/usr/bin/env node
import { prompt } from 'inquirer';
import parseArgs, { ParsedArgs } from 'minimist';
import fs from 'fs';
import { initRunner } from './init-runner';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2), { boolean: ['appPrefix', 'yes'] });

// set of base templates (any post-initializers should be prompted in respective base template)
const BASE_TEMPLATES = ['nextjs'];

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

  // validate/gather templates
  if (!templates.length) {
    const answer = await prompt({
      type: 'list',
      name: 'template',
      // eslint-disable-next-line quotes
      message: "Select the template you'd like to create?",
      choices: BASE_TEMPLATES,
      default: 'nextjs',
    });
    templates.push(answer.template);
  }

  // validate/gather destination
  const defaultDestination = `${process.cwd()}${
    argv.appName ? '\\' + argv.appName : '\\sitecore-jss-app'
  }`;

  let destination = argv.yes ? defaultDestination : argv.destination;

  if (!destination) {
    const answer = await prompt({
      type: 'input',
      name: 'destination',
      message: 'Where would you like your new app created?',
      default: () => defaultDestination,
    });

    destination = answer.destination;
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

  initRunner(templates, { ...argv, destination, templates });
};

main();
