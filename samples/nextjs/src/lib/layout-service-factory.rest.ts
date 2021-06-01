import { LayoutService, RestLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(isSsr: boolean | undefined): LayoutService {
    return new RestLayoutService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      configurationName: 'default',
      // Layout service should track requests only in SSR mode as SSG requests happen at build time
      tracking: isSsr,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
