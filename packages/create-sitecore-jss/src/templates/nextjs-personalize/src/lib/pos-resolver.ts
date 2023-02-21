import { PosResolver } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { siteResolver } from './site-resolver';

export const posResolver = new PosResolver({ getSite: siteResolver.getByName });
