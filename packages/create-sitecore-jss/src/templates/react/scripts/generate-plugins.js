const { generatePlugins, ModuleType } = require('@sitecore-jss/sitecore-jss-dev-tools');

/*
  PLUGINS GENERATION
  Generating the plugins is optional, and it can be maintained manually if preferred.
  The default convention uses the plugin's filename (without the extension) as the first part of the plugin
  name. For example, the file `/src/foo/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
*/

const pluginDefinitions = [
  {
    distPath: 'scripts/temp/generate-component-builder-plugins.js',
    rootPath: 'scripts/generate-component-builder/plugins',
    moduleType: ModuleType.CJS,
  },
  {
    distPath: 'scripts/temp/config-plugins.js',
    rootPath: 'scripts/config/plugins',
    moduleType: ModuleType.CJS,
  },
];

run(pluginDefinitions);

function run(definitions) {
  definitions.forEach(definition => {
    generatePlugins(definition);
  });
}
