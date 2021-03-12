import { LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';

export class LayoutServiceFactory {
  create(): LayoutService {
    throw new Error('GraphQLLayoutService not implemented!');
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
