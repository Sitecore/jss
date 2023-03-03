const path = require('path');

module.exports = function override(config) {
  // Provide alias to don't have duplicates of `react`
  config.resolve.alias.react = path.resolve(process.cwd(), '.', 'node_modules', 'react');

  // This will remove the CRA plugin that prevents to import modules from
  // outside the `src` directory, useful for symlinks
  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => p.constructor.name !== 'ModuleScopePlugin'
  );

  const fileLoaderRule = getFileLoaderRule(config.module.rules);
  if(!fileLoaderRule) {
    throw new Error("File loader not found");
  }
  fileLoaderRule.exclude.push(/\.cjs$/);

  return config;
};

function getFileLoaderRule(rules) {
  for(const rule of rules) {
      if("oneOf" in rule) {
          const found = getFileLoaderRule(rule.oneOf);
          if(found) {
              return found;
          }
      } else if(rule.test === undefined && rule.type === 'asset/resource') {
          return rule;
      }
  }
}
