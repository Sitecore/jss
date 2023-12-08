import { RevalidateMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/revalidate';
import { NextApiResponse, NextApiRequest } from 'next';
import clientFactory from 'lib/graphql-client-factory';
import nextConfig from '../../../next.config';

/**
 * Nextjs API route /api/revalidate
 * This revalidate endpoint is triggered by the configured Sitecore Experience Edge Webhooks
 * whenever new content is published on Sitecore which initiates On-demand Incremental
 * Static Regeneration (ISR) of the updated page.
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
    // Function to generate language prefix based on i18n configurations
    // it returns the language itself as the prefix based on the other languages configured in next.config.
    localePrefix: (language: string) => {
      if (!i18n) {
        return '';
      } else if (language === i18n.defaultLocale) {
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
