import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

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
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      scJssConfig = require('scjssconfig.json');
    } catch (e) {
      return config;
    }

    if (!scJssConfig) return config;

    return Object.assign({}, config, {
      sitecoreApiKey: config.sitecoreApiKey || scJssConfig.sitecore?.apiKey,
      sitecoreApiHost: config.sitecoreApiHost || scJssConfig.sitecore?.layoutServiceHost,
    });
  }
}

export const scjssconfigPlugin = new ScJssConfigPlugin();
