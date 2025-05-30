import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';
import { extractFiles } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * If consented to, sends components code for code generation learning to XMC
 */
class CodeExtractionPlugin implements ComponentBuilderPlugin {
  order = 100;

  exec(config: ComponentBuilderPluginConfig) {
    extractFiles({});
    return config;
  }
}

export const codeExtractionPlugin = new CodeExtractionPlugin();
