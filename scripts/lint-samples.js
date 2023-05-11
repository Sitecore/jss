const { execSync } = require('child_process');
const samples = require('./samples.json');
const { getAppName } = require('./utils');

const cliArgs = process.argv.slice(2);
const lernaSinceFlag = cliArgs.length ? cliArgs[0].replace('--since=', '') : undefined;

const runLintCommand = (scope) =>
  execSync(`lerna run lint --scope ${scope} -- --fix`, {
    stdio: 'inherit',
  });

if (!lernaSinceFlag) {
  runLintCommand('sample-*');

  return;
}

/**
 * Start linting process only for the samples that were affected by the new changes in:
 * - create-sitecore-jss/src/templates/**
 * - create-sitecore-jss/src/initializers/**
 */

const affectedTemplates = execSync(
  `git diff --name-only ${lernaSinceFlag}... -- packages/create-sitecore-jss`,
  {
    encoding: 'utf-8',
  }
)
  .split('\n')
  .map((filepath) => {
    // Extracting template names from the filepath
    const template = filepath.match(/(templates|initializers)\/([^\/]*)/);

    return template && template[2];
  })
  // Removing null values and leaving unique template names
  .filter((template, index, list) => template && list.indexOf(template) === index);

if (!affectedTemplates.length) {
  console.log('No modified templates to lint');

  return;
}

const affectedSamples = samples
  .filter((sample) => sample.initializers.some((template) => affectedTemplates.includes(template)))
  .map((sample) => getAppName(sample.args));

if (!affectedSamples.length) {
  console.log('No modified samples to lint');

  return;
}

runLintCommand(`{${affectedSamples.join(',')}}`);
