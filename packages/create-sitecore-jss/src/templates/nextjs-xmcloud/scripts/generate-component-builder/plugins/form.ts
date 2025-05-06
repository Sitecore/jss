import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';

/**
 * Provides Form component configuration
 */
class FormPlugin implements ComponentBuilderPlugin {
  order = 1;

  exec(config: ComponentBuilderPluginConfig) {
    config.packages.push({
      name: '@sitecore-jss/sitecore-jss-nextjs',
      components: [
        {
          componentName: 'Form',
          moduleName: 'Form',
        },
      ],
    });

    return config;
  }
}

export const formPlugin = new FormPlugin();
