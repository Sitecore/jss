#!/usr/bin/env node
import chalk from 'chalk';
import { prompt } from 'inquirer';
import parseArgs, { ParsedArgs } from 'minimist';
import { InitializerFactory } from './InitializerFactory';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2), { boolean: ['appPrefix', 'yes'] });

const main = async () => {
  let template = '';

  // ------------------------------
  // the below has moved into InitializerFactory
  // TODOS: Figure out how post-initalizers will be... initalized.
  // how will the CLI flow?
  // -------------------------------

  if (!argv.template) {
    const answer = await prompt({
      type: 'list',
      name: 'template',
      // eslint-disable-next-line quotes
      message: "Select the template you'd like to create?",
      choices: ['nextjs'],
      default: 'nextjs',
    });
    template = answer.template;
  } else {
    template = argv.template;
  }

  const initializer = new InitializerFactory().create(template);
  if (!initializer) {
    console.error(chalk.red(`Unsupported template '${template}'`));
    process.exit(1);
  }
  try {
    initializer?.init(argv);
  } catch (error) {
    console.log(chalk.red('An error occurred: ', error));
  }
};

main();
