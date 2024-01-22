import { Context } from '@sitecore-jss/sitecore-jss-nextjs/context';
import config from 'temp/config';

import Events from './sdk/events';

/**
 * List of SDKs to be initialized.
 * Each SDK is defined as a module with the @type {SDK} type.
 */
const sdks = {
  Events,
};

/**
 * Context instance that is used to initialize the application Context and associated Software Development Kits (SDKs).
 */
export const context = new Context<typeof sdks>({
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  siteName: config.sitecoreSiteName,
  sdks,
});
