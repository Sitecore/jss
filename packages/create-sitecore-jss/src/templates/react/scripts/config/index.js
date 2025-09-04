const plugins = require('../temp/config-plugins');

class JssConfigFactory {
  create(defaultConfig = {}) {
    return Object.values(plugins)
      .sort((p1, p2) => p1.order - p2.order)
      .reduce((config, plugin) => plugin.exec(config), defaultConfig);
  }
}

module.exports.jssConfigFactory = new JssConfigFactory();
