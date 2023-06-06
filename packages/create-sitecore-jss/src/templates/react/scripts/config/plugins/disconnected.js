const chalk = require('chalk');
const { constants } = require('@sitecore-jss/sitecore-jss-react');

/**
 * This plugin will override the "sitecoreApiHost" config prop for disconnected mode
 */
class DisconnectedPlugin {
  order = 2;

  exec(config) {
    const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

    if (!disconnected) return config;

    if (process.env.REACT_APP_FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
      throw new Error(
        chalk.red(
          'GraphQL requests to Dictionary and Layout services are not supported in disconnected mode.'
        )
      );
    }

    const port = process.env.PORT || 3000;

    return Object.assign({}, config, {
      sitecoreApiHost: `http://localhost:${port}`,
    });
  }
}

module.exports = new DisconnectedPlugin();
