import { GraphQLLayoutService, RestLayoutService, constants } from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

export class LayoutServiceFactory {
  create() {
    return process.env.VUE_APP_FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          configurationName: 'default',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
