import config from 'temp/config';
import { LayoutPersonalizationService, RestPersonalizationDecisionsService, GraphQLLayoutFragmentService } from '@sitecore-jss/sitecore-jss';

export class LayoutPersonalizationServiceFactory {
  create(): LayoutPersonalizationService {
    return new LayoutPersonalizationService(
      new RestPersonalizationDecisionsService({
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
        tracking: true,
      }),
      new GraphQLLayoutFragmentService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      })
    );
  }
}

export const layoutPersonalizationServiceFactory = new LayoutPersonalizationServiceFactory();

export const layoutPersonalizationService = layoutPersonalizationServiceFactory.create();
