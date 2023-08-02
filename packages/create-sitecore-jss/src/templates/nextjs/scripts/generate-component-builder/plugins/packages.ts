import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';

/**
 * Provides custom packages configuration
 */
class PackagesPlugin implements ComponentBuilderPlugin {
  order = 0;

  exec(config: ComponentBuilderPluginConfig) {
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

    /**
     * Or you can register all components from a path using the below approach:
     * import { PackageDefinition, getComponentList } from '@sitecore-jss/sitecore-jss-dev-tools';
     * ...
     * const componentsPath = 'src/extra';
     * config.packages = getComponentList(componentsPath) as PackageDefinition[];
     */
    config.packages = [];

    return config;
  }
}

export const packagesPlugin = new PackagesPlugin();
