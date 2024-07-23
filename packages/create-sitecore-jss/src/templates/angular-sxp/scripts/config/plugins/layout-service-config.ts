import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import { constantCase } from 'constant-case';

/**
 * This plugin assigns the layoutServiceConfigurationName config property
 */
class LayoutServiceConfigPlugin implements ConfigPlugin {
  order = 5;

  async exec(config: JssConfig) {
    return Object.assign({}, config, {
      layoutServiceConfigurationName:
        process.env[`${constantCase('layoutServiceConfigurationName')}`] || 'default',
    });
  }
}

export const layoutServiceConfigPlugin = new LayoutServiceConfigPlugin();
