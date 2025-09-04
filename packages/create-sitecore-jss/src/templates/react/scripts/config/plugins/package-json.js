const packageConfig = require('../../../package.json');

/**
 * This plugin will set config props based on package.json.
 */
class PackageJsonPlugin {
  order = 1;

  exec(config) {
    if (!packageConfig.config) return config;

    return Object.assign({}, config, {
      sitecoreSiteName: config.sitecoreSiteName || packageConfig.config.appName,
      defaultLanguage: config.defaultLanguage || packageConfig.config.language,
      graphQLEndpointPath: config.graphQLEndpointPath || packageConfig.config.graphQLEndpointPath,
    });
  }
}

module.exports = new PackageJsonPlugin();
