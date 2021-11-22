#!/usr/bin/env node
import chalk from 'chalk';
import { prompt } from 'inquirer';
import parseArgs, { ParsedArgs } from 'minimist';
import { NextjsInitializer, StyleguideInitializer } from './initializers/nextjs/index';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2), { boolean: ['appPrefix', 'yes'] });

const main = async () => {
  let template = '';
  // argv._ stores positional parameters
  // if the user wants to run a post-init,
  // we expect the following positionals:
  const [add, framework, postTemplate] = argv._;

  // TODO: add --yes flag that sets all defaults


  if (argv._.length > 0 && add === 'add') {
    // fire off add initializer here
    switch (`${framework} add ${postTemplate}`) {
      case 'nextjs add styleguide':
         await new StyleguideInitializer().init(argv);
         return;
      default:
        console.log(
          chalk.red(
            `Unsupported addon '${chalk.yellow(postTemplate)}' to '${chalk.yellow(framework)}.'`
          )
        );
        process.exit(1);
    }
  }

  if (!argv.template) {
    const answer = await prompt({
      type: 'list',
      name: 'template',
      message: "Select the template you'd like to create?",
      choices: ['nextjs'],
      default: 'nextjs',
    });
    template = answer.template;
  } else {
    template = argv.template;
  }

  switch (template) {
    case 'nextjs':
      await new NextjsInitializer().init(argv);
      return;
    default:
      console.error(chalk.red(`Unsupported template '${template}'`));
      process.exit(1);
  }
};

main();
