/* eslint-disable @typescript-eslint/no-var-requires */
import { GraphQLSitemapService, StaticPath } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import { config as packageConfig } from '../../package.json';

type SitemapFetchFunction = (
  context?: GetStaticPathsContext
) => Promise<StaticPath[]> | StaticPath[];

export class SitemapFactory {
  create(): SitemapFetchFunction {
    const graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      /*
      The Sitemap Service needs a root item ID in order to fetch the list of pages for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
    });

    /**
     * Generates SitecoreSitemap for given mode (Export / SSG)
     * @param {GetStaticPathsContext} context
     */
    const fetch: SitemapFetchFunction = (context) => {
      // If we are in Export xport mode
      if (process.env.EXPORT_MODE) {
        return graphqlSitemapService.fetchExportSitemap(packageConfig.language);
      }

      return graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
    };

    return fetch;
  }
}

export const sitemapFactory = new SitemapFactory();
