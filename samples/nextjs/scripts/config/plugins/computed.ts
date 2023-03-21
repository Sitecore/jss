import { ConfigPlugin, JssConfig } from '..';

/**
 * This plugin will set computed config props.
 * The "graphQLEndpoint" is an example of making a _computed_ config setting
 * based on other config settings.
 */
class ComputedPlugin implements ConfigPlugin {
  order = 2;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      graphQLEndpoint:
        config.graphQLEndpoint || `${config.sitecoreApiHost}${config.graphQLEndpointPath}`,
    });
  }
}

export const computedPlugin = new ComputedPlugin();
