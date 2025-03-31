import { constantCase } from 'constant-case';
import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

/**
 * This plugin will setthe design library url config prop.
 */
class DesignLibraryPlugin implements ConfigPlugin {
  order = 3;

  async exec(config: JssConfig) {
    const designLibraryUrl =
      process.env[`${constantCase('designLibraryUrl')}`]?.replace(/\/$/, '') ||
      'https://designlibrary.sitecore.cloud';

    return Object.assign({}, config, {
      designLibraryUrl,
    });
  }
}

export const designLibraryPlugin = new DesignLibraryPlugin();
