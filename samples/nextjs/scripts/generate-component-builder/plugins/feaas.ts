import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';

/**
 * Provides Sitecore Components (FEaaS) packages configuration
 */
class FEaaSPlugin implements ComponentBuilderPlugin {
  order = 1;

  exec(config: ComponentBuilderPluginConfig) {
    config.packages.push({
      name: '@sitecore-jss/sitecore-jss-nextjs',
      components: [
        {
          componentName: 'BYOCWrapper',
          moduleName: 'BYOCWrapper',
        },
        {
          componentName: 'FEaaSWrapper',
          moduleName: 'FEaaSWrapper',
        },
      ],
    });

    return config;
  }
}

export const feaasPlugin = new FEaaSPlugin();
