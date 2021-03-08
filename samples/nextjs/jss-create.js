const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { applyNameToProject } = require('@sitecore-jss/sitecore-jss-cli/dist/create');

/**
 * This function is invoked by `jss create` when an app based on this template is created.
 * It should perform tasks necessary to instantiate the app according to the argv, which
 * correspond to the allowed arguments of `jss create`.
 *
 * Note: npm packages for the new app are already installed before this script is run.
 * Note: this file is deleted in the new app after it has been run.
 *
 * @param {object} argv Arguments passed to `jss create` script
 * @param {string[]} nextSteps Array of default 'next steps' to show at the console
 * @returns {string[]} The next steps to display to the console user (enables customization from this script)
 */
module.exports = function createJssProject(argv, nextSteps) {
  console.log(`Executing create script: ${__filename}...`);

  applyNameToProject(__dirname, argv.name, argv.hostName, 'JssNextWeb');

  if (!argv.fetchMode || !argv.renderMode) {
    nextSteps.push([
      `* Did you know you can customize the Next.js sample app using ${chalk.green('jss create')} parameters?`,
      `*  ${chalk.green('--fetchMode {REST|GraphQL}')} : Specifies how Sitecore data (layout, dictionary) is fetched. Default is REST.`,
      `*  ${chalk.green('--renderMode {SSG|SSR}')} : Specifies the Next.js pre-rendering mode of the optional catch-all route. Default is SSG.`,
    ]);
  }

  setFetchMode(argv.fetchMode);
  setRenderMode(argv.renderMode);

  return nextSteps;
};

/**
 * Sets how Sitecore data (layout, dictionary) is fetched.
 * @param {string} [fetchMode] {REST|GraphQL} Default is REST. 
 */
function setFetchMode(fetchMode) {
  const defaultDsfFile = path.join(__dirname, 'src/lib/dictionary-service-factory.ts');
  const graphqlDsfFile = path.join(__dirname, 'src/lib/dictionary-service-factory.graphql.ts');
  const defaultLsfFile = path.join(__dirname, 'src/lib/layout-service-factory.ts');
  const graphqlLsfFile = path.join(__dirname, 'src/lib/layout-service-factory.graphql.ts');
  let mode = fetchMode ? fetchMode.toLowerCase() : 'rest';

  if (mode !== 'rest' && mode !== 'graphql') {
    console.warn(chalk.yellow(`Unsupported fetchMode '${fetchMode}'. Using default 'REST'.`));
    mode = 'rest';
  }

  console.log(
    chalk.cyan(`Applying ${mode === 'rest' ? 'REST' : 'GraphQL'} fetch mode...`)
  );

  switch (mode) {
    case 'rest':
      fs.unlinkSync(graphqlDsfFile);
      fs.unlinkSync(graphqlLsfFile);
      break;

    case 'graphql':
      fs.unlinkSync(defaultDsfFile);
      fs.renameSync(graphqlDsfFile, defaultDsfFile);
      fs.unlinkSync(defaultLsfFile);
      fs.renameSync(graphqlLsfFile, defaultLsfFile);
      break;
  }
}

/**
 * Sets the Next.js pre-rendering mode of the optional catch-all route.
 * @param {string} [renderMode] {SSG|SSR} Default is SSG.
 */
function setRenderMode(renderMode) {
  const defaultRouteFile = path.join(__dirname, 'src/pages/[[...path]].tsx');
  const ssrRouteFile = path.join(__dirname, 'src/pages/[[...path]].SSR.tsx');
  const sitemapFile = path.join(__dirname, 'src/lib/sitemap-fetcher.ts');
  let mode = renderMode ? renderMode.toLowerCase() : 'ssg';

  if (mode !== 'ssg' && mode !== 'ssr') {
    console.warn(chalk.yellow(`Unsupported renderMode '${renderMode}'. Using default 'SSG'.`));
    mode = 'ssg';
  }

  console.log(
    chalk.cyan(`Applying ${mode.toUpperCase()} render mode...`)
  );

  switch (mode) {
    case 'ssg':
      fs.unlinkSync(ssrRouteFile);
      break;

    case 'ssr':
      fs.unlinkSync(defaultRouteFile);
      fs.renameSync(ssrRouteFile, defaultRouteFile);
      fs.unlinkSync(sitemapFile);
      break;
  }
}
