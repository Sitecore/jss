import chalk from 'chalk';
import { GraphQLSiteInfoService, type SiteInfo } from '../../../lib/graphql-siteinfo-service';
import { type ConfigPlugin, type JssConfig } from '..';

/**
 * This plugin will set the "sites" config prop.
 * By default this will attempt to fetch site information directly from Sitecore (using the GraphQLSiteInfoService).
 * You could easily modify this to fetch from another source such as a static JSON file instead.
 */
class MultisitePlugin implements ConfigPlugin {
  order = 11;

  async exec(config: JssConfig) {
    let sites: SiteInfo[] = [];
    console.log('Fetching site information');
    console.log(config);
    try {
      const siteInfoService = new GraphQLSiteInfoService({
        endpoint: config.graphQLEndpoint,
        apiKey: config.sitecoreApiKey,
      });
      sites = await siteInfoService.fetchSiteInfo();
    } catch (error) {
      console.error(chalk.red('Error fetching site information'));
      console.error(error);
    }

    return Object.assign({}, config, {
      sites: JSON.stringify(sites),
    });
  }
}

export const multisitePlugin = new MultisitePlugin();
