import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import chalk from 'chalk';

export type DisconnectedSitemapServiceConfig = {
  /**
   * Your disconnected server endpoint
   */
  endpoint: string;
  /**
   * The `AxiosDataFetcher` instance to use for API requests.
   * @default new AxiosDataFetcher()
   * @see AxiosDataFetcher
   */
  dataFetcher?: AxiosDataFetcher;
};

type StaticPath = {
  params: {
    path: string[];
  };
};

export class DisconnectedSitemapService {
  private dataFetcher: AxiosDataFetcher;

  /**
   * Provides ability to fetch sitemap from disconnected sitemap service endpoint.
   * Sitemap can be used for `next export`
   * @param {DisconnectedSitemapServiceConfig} config disconnected sitemap service config
   */
  constructor(private config: DisconnectedSitemapServiceConfig) {
    this.dataFetcher = config.dataFetcher || new AxiosDataFetcher();
  }

  /**
   * Fetch sitemap which could be used for generation of static pages during `next export` in disconnected mode.
   * Since i18n is not supported, the output paths will not include a `locale` property.
   * @param {string} language locale which application supports
   */
  async fetchExportSitemap(language: string): Promise<StaticPath[]> {
    const res = await this.dataFetcher
      .get<StaticPath[]>(this.config.endpoint, {
        params: { sc_lang: language },
      })
      .catch((error) => {
        console.error(
          chalk.red('[Disconnected] Error occurred while fetching sitemap:'),
          error.response || error
        );

        return null;
      });

    return res?.data || [];
  }
}
