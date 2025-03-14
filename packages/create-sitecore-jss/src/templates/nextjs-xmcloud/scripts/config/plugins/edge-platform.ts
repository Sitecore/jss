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
    const sitecoreEdgeUrl =
      process.env[`${constantCase('sitecoreEdgeUrl')}`]?.replace(/\/$/, '') ||
      'https://edge-platform.sitecorecloud.io';
    const sitecoreEdgeContextId = process.env[`${constantCase('sitecoreEdgeContextId')}`];

    if (config.sitecoreApiKey && sitecoreEdgeContextId) {
      console.log(
        chalk.yellow(
          "You have configured both 'sitecoreApiKey' and 'sitecoreEdgeContextId' values. The 'sitecoreEdgeContextId' is used instead."
        )
      );
    }

    return Object.assign({}, config, {
      sitecoreEdgeUrl,
      sitecoreEdgeContextId,
    });
  }
}

export const edgePlatformPlugin = new EdgePlatformPlugin();
