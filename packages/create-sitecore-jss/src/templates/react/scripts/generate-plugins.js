const { writePlugins, ModuleType } = require('@sitecore-jss/sitecore-jss-dev-tools');

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
