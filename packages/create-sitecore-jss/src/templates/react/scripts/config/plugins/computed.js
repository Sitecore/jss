/**
 * This plugin will set computed config props.
 * The "graphQLEndpoint" is an example of making a _computed_ config setting
 * based on other config settings.
 */
class ComputedPlugin {
  // should come after other plugins (but before fallback)
  order = 10;

  exec(config) {
    return Object.assign({}, config, {
      graphQLEndpoint: config.graphQLEndpoint || `${config.sitecoreApiHost}${config.graphQLEndpointPath}`,
    });
  }
}

module.exports = new ComputedPlugin();
