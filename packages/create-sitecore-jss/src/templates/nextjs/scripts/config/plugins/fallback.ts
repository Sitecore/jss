import chalk from 'chalk';
import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';

/**
 * This config will set fallback values for properties that were left empty
 * If neither env, nor other places had a proper value, this will ensure a fallback is set
 */
class FallbackPlugin implements ConfigPlugin {
  // should always come last
  order = 100;

  async exec(config: JssConfig) {
    if (config.sitecoreApiKey && config.sitecoreEdgeContextId) {
      console.log(
        chalk.yellow(
          "You have configured both 'sitecoreApiKey' and 'sitecoreEdgeContextId' values. The 'sitecoreEdgeContextId' is used instead."
        )
      );
    }

    return Object.assign({}, config, {
      defaultLanguage: config.defaultLanguage || 'en',
      sitecoreApiKey: config.sitecoreApiKey || 'no-api-key-set',
      layoutServiceConfigurationName: config.layoutServiceConfigurationName || 'default',
      sitecoreEdgeUrl: config.sitecoreEdgeUrl || 'https://edge-platform.sitecorecloud.io',
      publicUrl: config.publicUrl || getPublicUrl(),
    });
  }
}

export const fallbackPlugin = new FallbackPlugin();
