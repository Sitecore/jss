import { getLocales } from "@lib/i18n/utils";
import * as plugins from "@temp/sitemap-fetcher-plugins";

export type StaticPath = {
  params: {
    path?: string;
  };
};

export interface SitemapFetcherPlugin {
  /**
   * A function which will be called during page props generation
   */
  exec(locales: string[]): Promise<StaticPath[]>;
}

export class SitecoreSitemapFetcher {
  async fetch(): Promise<StaticPath[]> {
    const pluginsList = Object.values(plugins) as SitemapFetcherPlugin[];
    const pluginsResults = await Promise.all(
      pluginsList.map((plugin) => plugin.exec(getLocales()))
    );
    const results = pluginsResults.reduce((acc, cur) => [...acc, ...cur], []);
    return results;
  }
}

export const sitemapFetcher = new SitecoreSitemapFetcher();
