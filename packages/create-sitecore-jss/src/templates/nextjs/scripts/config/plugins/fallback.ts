import { ConfigPlugin, JssConfig } from '..';

/**
 * This config will set fallback values for properties that were left empty
 * If neither env, nor other places had a proper value, this will ensure a fallback is set
 */
class ComputedPlugin implements ConfigPlugin {
  // should always comes last
  order = 99;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      defaultLanguage: config.defaultLanguage || 'en',
      sitecoreApiKey: config.sitecoreApiKey || 'no-api-key-set'
    });
  }
}

export const computedPlugin = new ComputedPlugin();
