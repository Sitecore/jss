#!/usr/bin/env node
import { prompt } from 'inquirer';
import parseArgs, { ParsedArgs } from 'minimist';
import { initRunner } from './init-runner';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2), { boolean: ['appPrefix', 'yes'] });

const main = async () => {
  const templates = argv.templates?.trim().split(',') || [];
  // ------------------------------
  // the below has moved into InitializerFactory
  // TODOS: Figure out how post-initializers will be... initialized.
  // how will the CLI flow?
  // -------------------------------

  if (!templates.length) {
    const answer = await prompt({
      // enable selecting post initializers
      type: 'list',
      name: 'templates',
      // eslint-disable-next-line quotes
      message: "Select the template(s) you'd like to create?",
      choices: ['nextjs'],
      default: 'nextjs',
    });
    templates.push(answer.templates);

    const postInitAnswer = await prompt({
      type: 'checkbox',
      name: 'postInitializers',
      message: 'Would you like to add any post-initializers?',
      choices: ['nextjs-styleguide', 'none'],
      default: 'none',
    });
    postInitAnswer.postInitializers.forEach(
      (init: string) => init !== 'none' && templates.push(init)
    );
  }

  let destination = argv.destination;

  if (!destination) {
    const answer = await prompt(
      // wouldn't ask this for post-init if it's being run alone,
      {
        type: 'input',
        name: 'destination',
        message: () =>
          !templates.includes('styleguide')
            ? 'Where would you like your new app created?'
            : 'Destination for the post initializer?',
        default: () =>
          `${process.cwd()}${argv.appName ? '\\' + argv.appName : '\\sitecore-jss-app'}`,
      }
    );
    destination = answer.destination;
  }

  initRunner(templates, { ...argv, destination });
};

main();
