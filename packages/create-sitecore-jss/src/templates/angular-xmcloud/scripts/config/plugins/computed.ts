import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
import path from 'path';
import { constantCase } from 'constant-case';
import { constants } from '@sitecore-jss/sitecore-jss-angular/cjs';

/**
 * This plugin will set computed config props.
 * The "graphQLEndpoint" is an example of making a _computed_ config setting
 * based on other config settings.
 */
class ComputedPlugin implements ConfigPlugin {
  // should come after other plugins (but before fallback)
  order = 10;

  async exec(config: JssConfig) {
    const proxyBuildPath =
      process.env[`${constantCase('proxyBuildPath')}`]?.replace(/\/$/, '') ||
      path.join(__dirname, '..', 'C:/Work/jss/samples/node-xmc-proxy/dist');

    const proxyHost = process.env[`${constantCase('proxyHost')}`];

    const production = process.env.JSS_MODE === constants.JSS_MODE.PRODUCTION;

    let graphQLEndpoint;
    let computed = `${config.graphQLEndpoint || config.sitecoreApiHost}${
      config.graphQLEndpointPath
    }`;

    if (production) {
      graphQLEndpoint = `\${typeof window === 'undefined' ? '${computed}' : '${proxyHost}${config.graphQLEndpointPath}'}`;
    } else {
      graphQLEndpoint = computed;
    }

    return Object.assign({}, config, {
      proxyBuildPath,
      graphQLEndpoint,
    });
  }
}

export const computedPlugin = new ComputedPlugin();
