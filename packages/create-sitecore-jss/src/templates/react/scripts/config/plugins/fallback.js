/**
 * This config will set fallback values for properties that were left empty
 * If neither env, nor other places had a proper value, this will ensure a fallback is set
 */
class FallbackPlugin {
  // should always come last
  order = 100;

  exec(config) {
    return Object.assign({}, config, {
      defaultLanguage: config.defaultLanguage || 'en',
      sitecoreApiKey: config.sitecoreApiKey || 'no-api-key-set',
      sitecoreSiteName: config.sitecoreSiteName || 'Unknown',
      layoutServiceConfigurationName: config.layoutServiceConfigurationName || 'default',
    });
  }
}

module.exports = new FallbackPlugin();
