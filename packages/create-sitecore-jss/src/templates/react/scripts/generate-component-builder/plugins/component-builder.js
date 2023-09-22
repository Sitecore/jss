const { generateComponentBuilder } = require('@sitecore-jss/sitecore-jss-dev-tools/react');

/**
 * Generates the component builder file.
 */
class ComponentBuilderPlugin {
  order = 9999;

  exec(config) {
    generateComponentBuilder(config);
  }
}

module.exports = new ComponentBuilderPlugin();
