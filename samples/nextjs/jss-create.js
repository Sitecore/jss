const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { applyNameToProject } = require('@sitecore-jss/sitecore-jss-cli/dist/create');
const { execSync } = require('child_process');
const strip = require('./scripts/strip');

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

  if (!argv.fetchWith || !argv.prerender) {
    nextSteps.push(
      `* Did you know you can customize the Next.js sample app using ${chalk.green(
        'jss create'
      )} parameters?`,
      `*  ${chalk.green(
        '--fetchWith {REST|GraphQL}'
      )} : Specifies how Sitecore data (layout, dictionary) is fetched. Default is REST.`,
      `*  ${chalk.green(
        '--prerender {SSG|SSR}'
      )} : Specifies the Next.js pre-rendering form for the optional catch-all route. Default is SSG.`,
      `*  ${chalk.green(
        '--empty {true|false}'
      )} : Specifies whether the sample should be empty. Disconnected mode and styleguide components will be removed. Default is false.`,
    );
  }

  if (argv.empty) {
    createEmptyStarter();
  }

  setFetchWith(argv.fetchWith);
  setPrerender(argv.prerender);
  setNextConfig();
  removeDependencies();

  return nextSteps;
};

function getPath(filepath) {
  return path.join(__dirname, filepath);
}

function createEmptyStarter() {
  const dataDir = getPath('data');
  const disconnectedProxyScript = getPath('scripts/disconnected-mode-proxy.ts');
  const manifestTemplate = getPath('scripts/templates/component-manifest.ts');
  const stripScript = getPath('scripts/strip.js');
  const definitionsDir = getPath('sitecore/definitions');
  const componentsDir = getPath('src/components');

  console.log(chalk.cyan('Cleaning up the sample...'));

  fs.rmdirSync(dataDir, { recursive: true });
  fs.unlinkSync(disconnectedProxyScript);
  fs.unlinkSync(manifestTemplate);
  fs.rmdirSync(definitionsDir, { recursive: true });
  fs.rmdirSync(componentsDir, { recursive: true });

  strip();

  fs.mkdirSync(componentsDir);
  fs.unlinkSync(stripScript);

  const packageJson = require('./package.json');

  delete packageJson.scripts.start;
  delete packageJson.scripts['start:disconnected-proxy'];
  // Temporary solution until we remove graphql-let, graphql-let can't be used if there are no .graphql files
  packageJson.scripts.bootstrap = packageJson.scripts.bootstrap.replace(' && graphql-let', '');
  packageJson.scripts.lint = packageJson.scripts.lint
    .replace('./sitecore/definitions/**/*.ts ', '')
    .replace(' ./data/**/*.yml', '');

  fs.writeFileSync(getPath('package.json'), JSON.stringify(packageJson), 'utf8');
}

/**
 * Sets how Sitecore data (layout, dictionary) is fetched.
 * @param {string} [fetchWith] {REST|GraphQL} Default is REST.
 */
function setFetchWith(fetchWith) {
  const defaultDsfFile = getPath('src/lib/dictionary-service-factory.ts');
  const restDsfFile = getPath('src/lib/dictionary-service-factory.rest.ts');
  const defaultLsfFile = getPath('src/lib/layout-service-factory.ts');
  const restLsfFile = getPath('src/lib/layout-service-factory.rest.ts');
  const FetchWith = {
    GRAPHQL: 'graphql',
    REST: 'rest',
  };
  let value = fetchWith ? fetchWith.toLowerCase() : FetchWith.REST;

  if (value !== FetchWith.REST && value !== FetchWith.GRAPHQL) {
    console.warn(chalk.yellow(`Unsupported fetchWith value '${fetchWith}'. Using default 'REST'.`));
    value = FetchWith.REST;
  }

  console.log(chalk.cyan(`Applying ${value === FetchWith.REST ? 'REST' : 'GraphQL'} fetch...`));

  switch (value) {
    case FetchWith.REST:
      fs.unlinkSync(defaultDsfFile);
      fs.renameSync(restDsfFile, defaultDsfFile);
      fs.unlinkSync(defaultLsfFile);
      fs.renameSync(restLsfFile, defaultLsfFile);
      break;

    case FetchWith.GRAPHQL:
      fs.unlinkSync(restDsfFile);
      fs.unlinkSync(restLsfFile);
      break;
  }
}

/**
 * Sets the Next.js pre-rendering form for the optional catch-all route.
 * @param {string} [prerender] {SSG|SSR} Default is SSG.
 */
function setPrerender(prerender) {
  const defaultRouteFile = getPath('src/pages/[[...path]].tsx');
  const ssrRouteFile = getPath('src/pages/[[...path]].SSR.tsx');
  const sitemapFile = getPath('src/lib/sitemap-fetcher.ts');
  const Prerender = {
    SSG: 'ssg',
    SSR: 'ssr',
  };
  let value = prerender ? prerender.toLowerCase() : Prerender.SSG;

  if (value !== Prerender.SSG && value !== Prerender.SSR) {
    console.warn(chalk.yellow(`Unsupported prerender value '${prerender}'. Using default 'SSG'.`));
    value = Prerender.SSG;
  }

  console.log(chalk.cyan(`Applying ${value.toUpperCase()} prerender...`));

  switch (value) {
    case Prerender.SSG:
      fs.unlinkSync(ssrRouteFile);
      break;

    case Prerender.SSR:
      fs.unlinkSync(defaultRouteFile);
      fs.renameSync(ssrRouteFile, defaultRouteFile);
      fs.unlinkSync(sitemapFile);
      break;
  }
}

/**
 * Switch development next.config.js to production config
 */
function setNextConfig() {
  const nextConfig = getPath('next.config.js');
  const baseConfig = getPath('next.config.base.js');

  console.log(chalk.cyan('Replacing next.config...'));

  fs.unlinkSync(nextConfig);
  fs.renameSync(baseConfig, nextConfig);
}

/**
 * Remove dependencies which are not used in production environment
 */
function removeDependencies() {
  console.log(chalk.cyan('Removing unused dependencies...'));

  execSync(`cd ${__dirname} && npm un --save-dev next-transpile-modules`);
}
