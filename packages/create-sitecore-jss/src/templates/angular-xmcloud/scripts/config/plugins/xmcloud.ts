import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import { constantCase } from 'constant-case';
import chalk from 'chalk';

/**
 * This plugin will set XM Cloud related config props.
 */
class XMCloudPlugin implements ConfigPlugin {
  // should come after other plugins (but before fallback)
  order = 10;

  async exec(config: JssConfig) {
    const proxyBuildPath = process.env[`${constantCase('proxyBuildPath')}`]?.replace(/\/$/, '');

    const sitecoreEdgeUrl =
      process.env[`${constantCase('sitecoreEdgeUrl')}`]?.replace(/\/$/, '') ||
      'https://edge-platform.sitecorecloud.io';
    const sitecoreEdgeContextId = process.env[`${constantCase('sitecoreEdgeContextId')}`];
    const personalizeScope = process.env[`${constantCase('personalizeScope')}`]

    if (config.sitecoreApiKey && sitecoreEdgeContextId) {
      console.log(
        chalk.yellow(
          "You have configured both 'sitecoreApiKey' and 'sitecoreEdgeContextId' values. The 'sitecoreEdgeContextId' is used instead."
        )
      );
    }

    return Object.assign({}, config, {
      proxyBuildPath,
      sitecoreEdgeUrl,
      sitecoreEdgeContextId,
      personalizeScope,
    });
  }
}

export const xmcloudPlugin = new XMCloudPlugin();
