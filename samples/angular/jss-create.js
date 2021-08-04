const fs = require('fs');
const path = require('path');
const { applyNameToProject } = require('@sitecore-jss/sitecore-jss-cli/dist/cjs/create');

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

  applyNameToProject(__dirname, argv.name, argv.hostName);

  // Replace app name in Angular-specific locations
  function replaceAngularAppNameInFile(filePath) {
    const fullFilePath = path.join(__dirname, filePath);
    if (fs.existsSync(fullFilePath)) {
      let cliConfig = fs.readFileSync(fullFilePath, 'utf8');

      cliConfig = cliConfig.replace(/JssAngularWeb/g, argv.name);

      fs.writeFileSync(fullFilePath, cliConfig);
    }
  }

  replaceAngularAppNameInFile('angular.json');
  replaceAngularAppNameInFile('scripts/bootstrap.ts');
  replaceAngularAppNameInFile('package.json');

  return nextSteps;
};
