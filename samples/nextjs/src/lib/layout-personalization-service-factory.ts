import config from 'temp/config';
import {
  LayoutPersonalizationService,
  RestPersonalizationDecisionsService,
  GraphQLLayoutFragmentService,
} from '@sitecore-jss/sitecore-jss-nextjs';

export const layoutPersonalizationService = new LayoutPersonalizationService(
  new RestPersonalizationDecisionsService({
    serviceUrl: config.personalizationDecisionsEndpoint,
    apiKey: config.sitecoreServicesApiKey,
    siteName: config.jssAppName,
    tracking: true,
  }),
  new GraphQLLayoutFragmentService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  })
);
