import { LayoutService, GraphQLLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(isSsr: boolean | undefined): LayoutService {
    // This paremeter is used for REST service. We have to keep signatures the same.
    // Dummy call to avoid build and lint errors/warnings for unused parameter
    if (isSsr) {
    }

    return new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
