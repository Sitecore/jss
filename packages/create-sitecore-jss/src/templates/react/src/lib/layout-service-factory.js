import {
  GraphQLLayoutService,
  RestLayoutService,
  constants,
} from '@sitecore-jss/sitecore-jss-react';
import config from '../temp/config';
import { clientFactory } from './client-factory';

export class LayoutServiceFactory {
  create() {
    return process.env.REACT_APP_FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          clientFactory,
          siteName: config.sitecoreSiteName,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName: config.sitecoreSiteName,
          configurationName: config.layoutServiceConfigurationName,
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
