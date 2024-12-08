import { ComponentFactoryPlugin, ComponentFactoryPluginConfig } from '..';

/**
 * Provides custom packages configuration
 */
class PackagesPlugin implements ComponentFactoryPlugin {
  order = 0;

  exec(config: ComponentFactoryPluginConfig) {
    /**
     * You can specify components which you want to import from external/internal packages
     * in format:
     *  {
     *    name: 'package name',
     *    components: [
     *      {
     *        componentName: 'component name', // component rendering name,
     *        moduleName: 'module name' // component name to import from the package
     *      }
     *    ]
     *  }
     */
    config.packages = [
      {
        name: '@sitecore-jss/sitecore-jss-angular',
        components: [{ componentName: 'Form', moduleName: 'FormComponent' }],
      },
    ];

    return config;
  }
}

export const packagesPlugin = new PackagesPlugin();
