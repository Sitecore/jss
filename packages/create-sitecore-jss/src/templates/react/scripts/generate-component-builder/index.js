const plugins = require('../temp/component-builder-plugins');

const isWatch = process.argv.some((arg) => arg === '--watch');

Object.values(plugins)
  .sort((p1, p2) => p1.order - p2.order)
  .reduce((config, plugin) => plugin.exec(config), {
    watch: isWatch,
  });
