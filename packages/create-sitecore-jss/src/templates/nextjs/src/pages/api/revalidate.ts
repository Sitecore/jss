import { RevalidateMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/revalidate';
import { NextApiResponse, NextApiRequest } from 'next';
import clientFactory from 'lib/graphql-client-factory';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  const secret = query['secret'];
  const revalidateHandler = new RevalidateMiddleware({
    clientFactory,
    multiSite: body.multiSite || false, // override this value through your webhook payload if using multi-site add-on
    personalize: body.personalize || false, // override this value through your webhook payload if personalization is configured
  }).getHandler();

  // It is highly recommended to add a secret to  to your revalidate endpoint before going to production.
  // This prevents unauthorized users from triggering revalidation requests.
  if (secret && secret !== process.env.ISR_REVALIDATE_SECRET) {
    console.log('Invalid secret provided. Authentication failed.');
    res.status(401).end('Invalid secret');
  }

  if (secret === undefined) {
    console.log('Secret not provided. Proceeding without authentication.');
  }

  await revalidateHandler(req, res);
};

export default handler;
