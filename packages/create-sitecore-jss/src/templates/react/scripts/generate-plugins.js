const { writePlugins, ModuleType } = require('@sitecore-jss/sitecore-jss-dev-tools');

/*
  PLUGINS GENERATION

  Generating the plugins is optional, and it can be maintained manually if preferred.

  The default convention uses the plugin's filename (without the extension) as the first part of the component
  name. For example, the file `/lib/page-props-factory/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
*/

const pluginDefinitions = [
  {
    listPath: 'scripts/temp/component-builder-plugins.js',
    rootPath: 'scripts/component-builder/plugins',
    moduleType: ModuleType.CJS,
  },
];

run(pluginDefinitions);

function run(definitions) {
  definitions.forEach((definition) => {
    writePlugins({ ...definition, relative: true });
  });
}
