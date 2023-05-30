/**
 * Provides custom packages configuration
 */
class PackagesPlugin {
  order = 0;

  exec(config) {
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
    config.packages = [];

    return config;
  }
}

module.exports = new PackagesPlugin();
