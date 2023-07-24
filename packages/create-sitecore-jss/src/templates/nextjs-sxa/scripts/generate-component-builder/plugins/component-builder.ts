import { generateComponentBuilder } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import {
  ComponentBuilderPluginConfig,
  ComponentBuilderPlugin as ComponentBuilderPluginType,
} from '..';

/**
 * Generates the component builder file.
 */
class ComponentBuilderPlugin implements ComponentBuilderPluginType {
  order = 9999;

  exec(config: ComponentBuilderPluginConfig) {
    generateComponentBuilder({ packages: config.packages, watch: config.watch });

    return config;
  }
}

export const componentBuilderPlugin = new ComponentBuilderPlugin();
