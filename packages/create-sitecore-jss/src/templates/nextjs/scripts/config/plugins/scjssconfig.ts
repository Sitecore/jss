import { ConfigPlugin, JssConfig } from '..';

/**
 * This plugin will set config props based on scjssconfig.json.
 * scjssconfig.json may not exist if you've never run `jss setup` (development)
 * or are depending on environment variables instead (production).
 */
class ScJssConfigPlugin implements ConfigPlugin {
  order = 1;

  async exec(config: JssConfig) {
    let scJssConfig;
    try {
      scJssConfig = require('scjssconfig.json');
    } catch (e) {
      // fall back on env values
      return Object.assign({}, config, {
        sitecoreApiKey: process.env.SITECORE_API_KEY,
        sitecoreApiHost: process.env.SITECORE_API_HOST,
      });
    }

    if (!scJssConfig) return config;

    return Object.assign({}, config, {
      sitecoreApiKey: scJssConfig.sitecore?.apiKey,
      sitecoreApiHost: scJssConfig.sitecore?.layoutServiceHost,
    });
  }
}

export const scjssconfigPlugin = new ScJssConfigPlugin();
