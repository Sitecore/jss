import { JssConfig } from 'lib/config';
import { ConfigPlugin } from '..';
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
    const proxyBuildPath = process.env[`${constantCase('proxyBuildPath')}`]?.replace(/\/$/, '');
    const proxyHost = process.env[`${constantCase('proxyHost')}`];

    const production = process.env.JSS_MODE === constants.JSS_MODE.PRODUCTION;

    let graphQLEndpoint;
    let computed = `${config.graphQLEndpoint || config.sitecoreApiHost}${
      config.graphQLEndpointPath
    }`;

    if (production) {
      // When build for production (using `jss build`)
      // The client side requests will be proxied through the node-xmcloud-proxy and passed to the Sitecore instance
      // The server side requests will be executed against the Sitecore instance directly
      graphQLEndpoint = `\${typeof window === 'undefined' ? '${computed}' : '${proxyHost}${config.graphQLEndpointPath}'}`;
    } else {
      // When working in development mode (`jss start:connected`)
      graphQLEndpoint = computed;
    }

    return Object.assign({}, config, {
      proxyBuildPath,
      graphQLEndpoint,
    });
  }
}

export const computedPlugin = new ComputedPlugin();
