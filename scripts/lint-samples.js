const { execSync } = require('child_process');
const samples = require('./samples.json');

/**
 * Start linting process only for the samples that were affected by the new changes in:
 * - create-sitecore-jss/src/templates/**
 * - create-sitecore-jss/src/initializers/**
 */

const affectedTemplates = execSync('git diff --name-only ../packages/create-sitecore-jss', {
  encoding: 'utf-8',
})
  .split('\n')
  .map((filepath) => {
    // Extracting template names from the filepath
    const template = filepath.match(/(templates|initializers)\/([^\/]*)/);

    return template && template[2];
  })
  // Removing null values and leaving unique template names
  .filter((template, index, list) => template && list.indexOf(template) === index);

const affectedSamples = samples
  .filter((sample) => sample.initializers.some((template) => affectedTemplates.includes(template)))
  .map(
    (sample) =>
      `sample-${sample.args.appName}-${sample.args.fetchWith || ''}-${sample.args.prerender || ''}`
  );

execSync(`npx lerna run lint --scope={${affectedSamples.join(',')}} -- --fix`, {
  stdio: 'inherit',
});
