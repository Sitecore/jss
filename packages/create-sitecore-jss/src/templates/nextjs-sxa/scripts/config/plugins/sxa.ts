import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

/**
 * This plugin will set configuration specific for SXA.
 */
class SXAPlugin implements ConfigPlugin {
  // should come before fallback
  order = 1;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      layoutServiceConfigurationName: 'sxa-jss',
    });
  }
}

export const sxaPlugin = new SXAPlugin();
