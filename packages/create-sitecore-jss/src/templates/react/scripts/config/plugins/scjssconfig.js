/**
 * This plugin will set config props based on scjssconfig.json.
 * scjssconfig.json may not exist if you've never run `jss setup` (development)
 * or are depending on environment variables instead (production).
 */
class ScJssConfigPlugin {
  order = 1;

  exec(config) {
    let scJssConfig;
    try {
      scJssConfig = require('../../../scjssconfig.json');
    } catch (e) {
      return config;
    }

    if (!scJssConfig) return config;

    return Object.assign({}, config, {
      sitecoreApiKey: config.sitecoreApiKey || scJssConfig.sitecore.apiKey,
      sitecoreApiHost: config.sitecoreApiHost || scJssConfig.sitecore.layoutServiceHost,
    });
  }
}

module.exports = new ScJssConfigPlugin();
