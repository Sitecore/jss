import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import { constantCase } from 'constant-case';

/**
 * This plugin will set XM Cloud related config props.
 */
class XMCloudPlugin implements ConfigPlugin {
  // should come after other plugins (but before fallback)
  order = 10;

  async exec(config: JssConfig) {
    const proxyBuildPath = process.env[`${constantCase('proxyBuildPath')}`]?.replace(/\/$/, '');
    const proxyHost = process.env[`${constantCase('proxyHost')}`];

    return Object.assign({}, config, {
      proxyBuildPath,
      proxyHost,
    });
  }
}

export const xmcloudPlugin = new XMCloudPlugin();
