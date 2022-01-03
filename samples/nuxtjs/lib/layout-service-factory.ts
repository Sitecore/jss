import { RestLayoutService } from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

export class LayoutServiceFactory {
  create() {
    return new RestLayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      configurationName: 'default',
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
