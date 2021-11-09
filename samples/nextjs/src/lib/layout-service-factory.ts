import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

interface LayoutServiceFactory {
  create(): LayoutService;
}
let layoutServiceFactory: LayoutServiceFactory;

if (process.env.FETCH_WITH === 'rest') {
  class RestLayoutServiceFactory {
    create(): LayoutService {
      return new RestLayoutService({
        apiHost: config.sitecoreApiHost,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    }
  }

  layoutServiceFactory = new RestLayoutServiceFactory();
} else if (process.env.FETCH_WITH === 'graphql') {
  class GraphQLLayoutServiceFactory {
    create(): LayoutService {
      return new GraphQLLayoutService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        /*
        The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
        app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
        otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
        rootItemId: '{GUID}'
        */
      });
    }
  }
  layoutServiceFactory = new GraphQLLayoutServiceFactory();
}

export { layoutServiceFactory };
