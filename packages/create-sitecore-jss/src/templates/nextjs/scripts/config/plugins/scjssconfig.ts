import { ConfigPlugin, JssConfig } from '..';

class ScJssConfigPlugin implements ConfigPlugin {
  order = 1;

  async exec(config: JssConfig) {
    // scjssconfig.json may not exist if you've never run `jss setup` (development)
    // or are depending on environment variables instead (production).
    let scJssConfig;
    try {
      scJssConfig = require('scjssconfig.json');
    } catch (e) {
      return config;
    }

    if (!scJssConfig) return config;

    return Object.assign({}, config, {
      sitecoreApiKey: scJssConfig.sitecore?.apiKey,
      sitecoreApiHost: scJssConfig.sitecore?.layoutServiceHost,
    });
  }
}

export const scjssconfigPlugin = new ScJssConfigPlugin();
