import { PosResolver } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { siteResolver } from './site-resolver';

/*
  The pos resolver stores sites point of sales
*/

/** PosResolver singleton */
export const posResolver = new PosResolver({ getSite: siteResolver.getByName });
