import { ConfigPlugin, JssConfig } from '..';

class ComputedPlugin implements ConfigPlugin {
  order = 3;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      // The GraphQL endpoint is an example of making a _computed_ config setting
      // based on other config settings.
      graphQLEndpoint: `${config.sitecoreApiHost}${config.graphQLEndpointPath}`,
    });
  }
}

export const computedPlugin = new ComputedPlugin();
