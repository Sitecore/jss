import { LayoutService, GraphQLLayoutService } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';
import { clientFactory } from './client-factory';

export class LayoutServiceFactory {
  create(): LayoutService {
    new GraphQLLayoutService({
      clientFactory,
      siteName: environment.sitecoreSiteName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
