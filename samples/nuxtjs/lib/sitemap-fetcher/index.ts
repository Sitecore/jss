import { GraphQLSitemapService } from './graphql-sitemap-service';
import config from 'temp/config';

export const sitemapFetcher = async (siteName?: string) => {
  const graphqlSitemapService: GraphQLSitemapService = new GraphQLSitemapService({
    endpoint: config.sitecoreApiHost,
    apiKey: config.sitecoreApiKey,
    siteName: siteName || config.sitecoreSiteName,
  });
  
  return graphqlSitemapService.fetchSSGSitemap(['en'] || []); // TODO: grab locales from i18n.config
}
