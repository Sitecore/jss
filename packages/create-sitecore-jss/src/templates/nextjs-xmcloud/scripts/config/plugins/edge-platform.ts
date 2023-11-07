import 'dotenv/config';
import chalk from 'chalk';
import { constantCase } from 'constant-case';
import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

/**
 * This plugin will set config props used by the Sitecore Edge Platform.
 */
class EdgePlatformPlugin implements ConfigPlugin {
  order = 2;

  async exec(config: JssConfig) {
    if (config.sitecoreApiKey && config.sitecoreEdgeContextId) {
      console.log(
        chalk.yellow(
          "You have configured both 'sitecoreApiKey' and 'sitecoreEdgeContextId' values. The 'sitecoreEdgeContextId' is used instead."
        )
      );
    }

    return Object.assign({}, config, {
      sitecoreEdgeUrl: process.env[`${constantCase('sitecoreEdgeUrl')}`] || 'https://edge-platform.sitecorecloud.io',
      sitecoreEdgeContextId: process.env[`${constantCase('sitecoreEdgeContextId')}`],
    });
  }
}

export const edgePlatformPlugin = new EdgePlatformPlugin();
