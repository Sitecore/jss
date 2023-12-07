import { RevalidateMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/revalidate';
import { NextApiResponse, NextApiRequest } from 'next';
import clientFactory from 'lib/graphql-client-factory';
import nextConfig from '../../../next.config';

/**
 * Nextjs API route /api/revalidate
 * This is a revalidate endpoint that can be used to trigger Incremental Static Regeneration (ISR).
 * of Next.js pages on-Demand.This endpoint is called by Sitecore when content is published,
 * and can also be called manually to trigger revalidation of pages.
 * @param req  The Next.js API request object
 * @param res  The Next.js API response object
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  const secret = query['secret'];

  const revalidateHandler = new RevalidateMiddleware({
    clientFactory,
    // override this value through your webhook payload if using multi-site add-on
    multiSite: body.multiSite || false,
    // override this value through your webhook payload if personalization is configured
    personalize: body.personalize || false,
    // takes the locales configured in next.config
    languages: nextConfig().i18n,
  }).getHandler();

  /**
   NOTE: It is highly recommended to add a secret to your revalidate endpoint before going to production.
   This prevents unauthorized users from triggering revalidation requests.
   */
  if (process.env.ISR_REVALIDATE_SECRET) {
    if (!secret || secret !== process.env.ISR_REVALIDATE_SECRET) {
      console.log('Invalid secret provided. Authentication failed.');
      res.status(401).end('Invalid secret');
    }
  } else {
    console.log('Secret not configured. Proceeding without authentication.');
  }

  await revalidateHandler(req, res);
};

export default handler;
