import { ComponentFactoryPlugin, ComponentFactoryPluginConfig } from '..';

/**
 * Provides custom components configuration
 */
class ComponentsPlugin implements ComponentFactoryPlugin {
  order = 0;

  exec(config: ComponentFactoryPluginConfig) {
    /**
     * You can specify components which you want to import using custom path
    */
    config.components = [];

    return config;
  }
}

export const componentsPlugin = new ComponentsPlugin();
