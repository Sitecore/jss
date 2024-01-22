import 'dotenv/config';
import chalk from 'chalk';
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';

/**
 * This plugin will override the "sitecoreApiHost" config prop
 * for disconnected mode, ensuring all Sitecore requests are run
 * through proxy rewrites (see \src\lib\next-config\plugins\disconnected.js).
 */
class DisconnectedPlugin implements ConfigPlugin {
  order = 2;

  async exec(config: JssConfig) {
    const disconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

    if (!disconnected) return config;

    if (process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL) {
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

export const disconnectedPlugin = new DisconnectedPlugin();
