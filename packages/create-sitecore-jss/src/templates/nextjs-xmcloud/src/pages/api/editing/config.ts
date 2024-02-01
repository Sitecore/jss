import type { NextApiRequest, NextApiResponse } from 'next';
import { EditingConfigMiddleware } from '@sitecore-jss/sitecore-jss-nextjs';
import { components } from 'temp/componentBuilder';
import metadata from 'temp/metadata.json';

/**
 * This Next.js API route is used by Sitecore editors (Pages) in XM Cloud
 * to determine feature compatibility and configuration.
 */

const handler = new EditingConfigMiddleware({
  components,
  metadata,
}).getHandler();

export default handler;