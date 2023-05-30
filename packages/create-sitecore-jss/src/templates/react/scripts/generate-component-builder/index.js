const plugins = require('../temp/component-builder-plugins');

/*
  COMPONENT BUILDER GENERATION
  Generates the /src/temp/componentBuilder.js file.
  
  componentBuilder file includes and exports componentFactory which maps React components to JSS components.

  The component factory is a mapping between a string name and a React component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  The default convention uses the parent folder name as the component name

  NOTE: this script can run in two modes. The default mode, the component builder file is written once.
  But if `--watch` is a process argument, the component builder source folder will be watched,
  and the componentBuilder.js rewritten on added or deleted files.
  This is used during `jss start` to pick up new or removed components at runtime.
*/

const defaultConfig = {
  watch: process.argv.some((arg) => arg === '--watch')
}

Object.values(plugins)
  .sort((p1, p2) => p1.order - p2.order)
  .reduce((config, plugin) => plugin.exec(config), defaultConfig);
