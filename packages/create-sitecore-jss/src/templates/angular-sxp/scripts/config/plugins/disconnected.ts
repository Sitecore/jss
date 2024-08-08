import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import { constants } from '@sitecore-jss/sitecore-jss-angular/cjs';
const chalk = require('chalk');

/**
 * This plugin will check if fetchwith graphgl is beeing used in disconnected mode and throw error if so
 */
class DisconnectedPlugin implements ConfigPlugin {
  // should come before other plugins
  order = 2;

  async exec(config: JssConfig) {
    const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;
    if (disconnected && process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
      throw new Error(
        chalk.red(
          'GraphQL requests to Dictionary and Layout services are not supported in disconnected mode.'
        )
      );
    }

    return Object.assign({}, config, {
      sitecoreApiKey: config.sitecoreApiKey || 'no-api-key-set',
    });
  }
}

export const disconnectedPlugin = new DisconnectedPlugin();
