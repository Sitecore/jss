#!/usr/bin/env node
import parseArgs, { ParsedArgs } from 'minimist';
import { prompt } from 'inquirer';
import chalk from 'chalk';
import { NextjsInitializer } from './initializers/nextjs/index';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2));

const main = async () => {
  let template = '';
  // argv._ stores positional parameters
  // if the user wants to run a post-init,
  // we expect the following positionals:
  const [add, framework, postTemplate] = argv._;

  if (argv._.length > 0 && add === 'add') {
    // fire off add initializer here
    switch (`${framework} add ${postTemplate}`) {
      case 'nextjs add styleguide':
        return console.log(`adding ${postTemplate} to ${framework}`);
      // return new StyleguideInitializer().init();
      default:
        console.log(
          chalk.red(
            `Unsupported addon ${chalk.yellow('postTemplate')} to '${chalk.yellow(framework)}'`
          )
        );
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
      return new NextjsInitializer().init(argv);

    default:
      console.error(chalk.red(`Unsupported template '${template}'`));
      Promise.resolve();
  }
};

main();
