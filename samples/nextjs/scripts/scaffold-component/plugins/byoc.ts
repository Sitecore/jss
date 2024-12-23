import { ScaffoldComponentPlugin, ScaffoldComponentPluginConfig } from '..';
import generateByocComponentSrc from 'scripts/templates/byoc-component-src';

/**
 * Sets up generation for BYOC components
 */
class ByocPlugin implements ScaffoldComponentPlugin {
  order = 0;

  exec(config: ScaffoldComponentPluginConfig) {
    if (config.args.includes('--byoc')) {
      config.componentTemplateGenerator = generateByocComponentSrc;
    }

    return config;
  }
}

export const byocPlugin = new ByocPlugin();
