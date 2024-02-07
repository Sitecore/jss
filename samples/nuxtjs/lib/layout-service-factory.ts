import { GraphQLLayoutService } from './services/graphql-layout-service';
import config from '../temp/config';

export class LayoutServiceFactory {
  create(siteName?: string) {
    return new GraphQLLayoutService({
      endpoint: 'https://xmcloudcm.localhost/sitecore/api/graph/edge',
      apiKey: '{ADCF0159-031F-4093-9DDA-45FF14C81989}',
      siteName: siteName || 'vue-app',
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
