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
  const i18n = nextConfig().i18n;

  const revalidateHandler = new RevalidateMiddleware({
    clientFactory,
    // override this value through your webhook payload if using multi-site add-on
    multiSite: body.multiSite || false,
    // override this value through your webhook payload if personalization is configured
    personalize: body.personalize || false,
    // pass the following function to handle additional locales configured in next.config
    // if i18n isn't available or the language matches the defaultLocale, it returns an empty string,
    // otherwise, it returns the language itself as the prefix based on the other language configured in next.config.
    languagePrefix: (language: string) => {
      if (!i18n || language === i18n.defaultLocale) {
        return '';
      } else {
        return language;
      }
    },
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
