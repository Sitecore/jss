import 'dotenv/config';
import chalk from 'chalk';
import { ConfigPlugin, JssConfig } from '..';
import { GraphQLSiteInfoService, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * This plugin will set the "sites" config prop.
 * By default this will attempt to fetch site information directly from Sitecore (using the GraphQLSiteInfoService).
 * You could easily modify this to fetch from another source such as a static JSON file instead.
 */
class MultisitePlugin implements ConfigPlugin {
  order = 3;

  async exec(config: JssConfig) {
    let sites: SiteInfo[] = [];

    const computeConfigValue = (val: string) => {
      if(val.startsWith('`') && val.endsWith('`')) {
        return new Function('return ' + val.replaceAll('config', 'this')).call(config);
      }
      else {
        return val;
      }
    };

    // graphQL endpoint can have a dynamic value in the config - so we resolve it in a special way at build time
    const buildTimeGraphQlEndpoint = process.env.GRAPH_QL_ENDPOINT || computeConfigValue(config.computed?.graphQLEndpoint || '');
    const apiKey = process.env.SITECORE_API_KEY || config.sitecoreApiKey;

    if (!endpoint || !apiKey) {
      console.warn(
        chalk.yellow('Skipping site information fetch (missing GraphQL connection details)')
      );
    } else {
      console.log(`Fetching site information from ${endpoint}`);
      try {
        const siteInfoService = new GraphQLSiteInfoService({
          endpoint,
          apiKey,
        });
        sites = await siteInfoService.fetchSiteInfo();
      } catch (error) {
        console.error(chalk.red('Error fetching site information'));
        console.error(error);
      }
    }

    return Object.assign({}, config, {
      sites: JSON.stringify(sites),
    });
  }
}

export const multisitePlugin = new MultisitePlugin();
