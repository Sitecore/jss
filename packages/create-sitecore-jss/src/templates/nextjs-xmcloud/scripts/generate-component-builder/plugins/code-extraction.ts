import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';
import { extractComponents } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * If consented to, sends components code for code generation learning to XMC
 */
class CodeExtractionPlugin implements ComponentBuilderPlugin {
  order = 9999;

  exec(config: ComponentBuilderPluginConfig) {
    extractComponents({});
    return config;
  }
}

export const codeExtractionPlugin = new CodeExtractionPlugin();
