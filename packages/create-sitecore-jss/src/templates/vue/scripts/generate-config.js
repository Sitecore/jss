const fs = require('fs');
const path = require('path');
const { constantCase } = require('constant-case');
const packageConfig = require('../package.json');

/* eslint-disable no-console */

/**
 * Generate config
 * The object returned from this function will be made available by importing src/temp/generated-config.js.
 * This is executed prior to the build running, so it's a way to inject environment or build config-specific
 * settings as variables into the JSS app.
 * NOTE! Any configs returned here will be written into the client-side JS bundle. DO NOT PUT SECRETS HERE.
 * @param {object} configOverrides Keys in this object will override any equivalent global config keys.
 */
module.exports = function generateConfig(configOverrides) {
  const defaultConfig = {
    sitecoreApiKey: 'no-api-key-set',
    sitecoreApiHost: '',
    sitecoreSiteName: process.env.VUE_APP_SITECORE_SITE_NAME,
    layoutServiceConfigurationName: 'default',
  };

  // require + combine config sources
  const scjssConfig = transformScJssConfig();
  const packageJson = transformPackageConfig();

  // optional:
  // do any other dynamic config source (e.g. environment-specific config files)
  // Object.assign merges the objects in order, so the
  // package.json config can override the calculated config,
  // scjssconfig.json overrides it,
  // and finally config passed in the configOverrides param wins.
  const config = Object.assign(defaultConfig, scjssConfig, packageJson, configOverrides);

  // Handle undefined values
  Object.keys(config).forEach((value, key) => {
    if (config[key] === undefined) {
      config[key] = '';
    }
  });

  // The GraphQL endpoint is an example of making a _computed_ config setting
  // based on other config settings.
  const computedConfig = {};
  computedConfig.graphQLEndpoint = '`${config.sitecoreApiHost}${config.graphQLEndpointPath}`';

  let configText = `/* eslint-disable */
// Do not edit this file, it is auto-generated at build time!
// See scripts/bootstrap.ts to modify the generation of this file.
const config = {};\n`;

  // Set base configuration values, allowing override with environment variables
  Object.keys(config).forEach((prop) => {
    configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || "${
      config[prop]?.trim()
    }";\n`;
  });
  // Set computed values, allowing override with environment variables
  Object.keys(computedConfig).forEach((prop) => {
    configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || ${
      computedConfig[prop]?.trim()
    };\n`;
  });
  configText += 'module.exports = config;';

  const configPath = path.resolve('src/temp/config.js');
  console.log(`Writing runtime config to ${configPath}`);
  fs.writeFileSync(configPath, configText, { encoding: 'utf8' });
};

function transformScJssConfig() {
  // scjssconfig.json may not exist if you've never run setup
  // so if it doesn't we substitute a fake object
  let config;
  try {
    // eslint-disable-next-line global-require
    config = require('../scjssconfig.json');
  } catch (e) {
    return {};
  }

  if (!config) return {};

  return {
    sitecoreApiKey: config.sitecore.apiKey,
    sitecoreApiHost: config.sitecore.layoutServiceHost,
  };
}

function transformPackageConfig() {
  if (!packageConfig.config) return {};

  return {
    sitecoreSiteName: packageConfig.config.appName,
    defaultLanguage: packageConfig.config.language || 'en',
    graphQLEndpointPath: packageConfig.config.graphQLEndpointPath || null,
  };
}
