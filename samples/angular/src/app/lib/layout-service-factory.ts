import { LayoutService, RestLayoutService } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';

export class LayoutServiceFactory {
  create(): LayoutService {
    return new RestLayoutService({
      apiHost: environment.sitecoreApiHost,
      apiKey: environment.sitecoreApiKey,
      siteName: environment.jssAppName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
