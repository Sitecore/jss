import { writePlugins, ModuleType, PluginDefinition } from '@sitecore-jss/sitecore-jss-dev-tools';

/*
  PLUGINS GENERATION
  NOTE: pluginName: the name of the plugin in the src/lib folder
  Generates the `/src/temp/{pluginName}-plugins.ts` file, which exports list of plugins

  Generating the plugins is optional, and it can be maintained manually if preferred.

  The default convention uses the plugin's filename (without the extension) as the first part of the component
  name. For example, the file `/lib/page-props-factory/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
  This can be customized in writePlugins().
*/

const pluginDefinitions = [
  {
    listPath: 'scripts/temp/bootstrap-plugins.ts',
    rootPath: 'scripts/bootstrap/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'scripts/temp/config-plugins.ts',
    rootPath: 'scripts/config/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'src/temp/sitemap-fetcher-plugins.ts',
    rootPath: 'src/lib/sitemap-fetcher/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'src/temp/middleware-plugins.ts',
    rootPath: 'src/lib/middleware/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'src/temp/page-props-factory-plugins.ts',
    rootPath: 'src/lib/page-props-factory/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'src/temp/next-config-plugins.js',
    rootPath: 'src/lib/next-config/plugins',
    moduleType: ModuleType.CJS,
  },
  {
    listPath: 'src/temp/extract-path-plugins.ts',
    rootPath: 'src/lib/extract-path/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    listPath: 'src/temp/site-resolver-plugins.ts',
    rootPath: 'src/lib/site-resolver/plugins',
    moduleType: ModuleType.ESM,
  },
];

run(pluginDefinitions);

function run(definitions: PluginDefinition[]) {
  definitions.forEach(definition => {
    writePlugins(definition.listPath, definition.rootPath, definition.moduleType);
  });
}