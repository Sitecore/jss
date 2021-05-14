import { LayoutService, RestLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(tracking: boolean): LayoutService {
    return new RestLayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      tracking: tracking,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
