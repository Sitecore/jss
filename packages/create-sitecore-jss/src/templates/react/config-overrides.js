const path = require('path');

module.exports = function override(config) {
  // Provide alias to don't have duplicates of `react`
  config.resolve.alias.react = path.resolve(process.cwd(), '.', 'node_modules', 'react');

  // This will remove the CRA plugin that prevents to import modules from
  // outside the `src` directory, useful for symlinks
  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => p.constructor.name !== 'ModuleScopePlugin'
  );

  return config;
};
