#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { prompt } from 'inquirer';
import { openPackageJson } from './shared';
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

  if (argv._.length > 0 && add === 'add') {
    // check if current project is a JSS project
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = fs.existsSync(pkgPath) && openPackageJson(pkgPath);
    if (pkg?.config?.sitecoreConfigPath === undefined) {
      console.log(
        chalk.red(
          `Could not add ${chalk.yellow(postTemplate)} to ${chalk.yellow(
            framework
          )} because it is not a JSS app.`
        )
      );
      console.log(
        chalk.yellow(
          `Make sure the cwd is the root of your JSS application and the ${chalk.cyan(
            'sitecoreConfigPath'
          )} property exists in the ${chalk.cyan('package.json')}`
        )
      );
      process.exit(1);
    }
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
      // eslint-disable-next-line quotes
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
