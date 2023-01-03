import { ConfigPlugin, JssConfig } from '..';
import packageConfig from 'package.json';

/**
 * This plugin will set config props based on package.json.
 */
class PackageJsonPlugin implements ConfigPlugin {
  order = 2;

  async exec(config: JssConfig) {
    if (!packageConfig.config) return config;

    return Object.assign({}, config, {
      jssAppName: packageConfig.config.appName,
      graphQLEndpointPath: packageConfig.config.graphQLEndpointPath,
      defaultLanguage: packageConfig.config.language || 'en',
    });
  }
}

export const packageJsonPlugin = new PackageJsonPlugin();
