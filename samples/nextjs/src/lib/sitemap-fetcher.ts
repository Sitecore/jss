/* eslint-disable @typescript-eslint/no-var-requires */
import {
  GraphQLSitemapService,
  StaticPath,
  DisconnectedSitemapService,
} from '@sitecore-jss/sitecore-jss-nextjs';
// #START_EMPTY
import { ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
// #END_EMPTY
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import pkg from '../../package.json';

export class SitecoreSitemapFetcher {
  private _graphqlSitemapService: GraphQLSitemapService;
  // #START_EMPTY
  private _disconnectedSitemapService: DisconnectedSitemapService;
  // #END_EMPTY

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
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
    // #START_EMPTY
    this._disconnectedSitemapService = new DisconnectedSitemapService(
      this.getManifest() as unknown as ManifestInstance
    );
    // #END_EMPTY
  }

  // #START_EMPTY
  /**
   * Get sitecore-import.json manifest
   */
  private getManifest() {
    if (process.env.JSS_MODE !== 'disconnected') return null;

    try {
      const manifest = require('sitecore/manifest/sitecore-import.json');

      return manifest;
    } catch (error) {
      throw Error(
        "[Disconnected Export] Please make sure you've started the disconnected proxy `npm run start:disconnected-proxy`"
      );
    }
  }
  // #END_EMPTY
  /**
   * Generates SitecoreSitemap for given mode (Export / Disconnected Export / SSG)
   * @param {GetStaticPathsContext} context
   */
  async fetch(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    // If we are in Export mode
    if (process.env.EXPORT_MODE) {
      // #START_EMPTY
      // Disconnected Export mode
      if (process.env.JSS_MODE === 'disconnected') {
        return this._disconnectedSitemapService.fetchExportSitemap();
      }
      // #END_EMPTY
      return this._graphqlSitemapService.fetchExportSitemap(pkg.config.language);
    }

    return this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const sitemapFetcher = new SitecoreSitemapFetcher();
