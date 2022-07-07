const path = require('path');

module.exports = function override(config) {
  // Provide alias to don't have duplicates of `react`
  config.resolve.alias.react = path.resolve(process.cwd(), '.', 'node_modules', 'react');

  return config;
};
