import { RevalidateMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/revalidate';
import { NextApiResponse, NextApiRequest } from 'next';
import clientFactory from 'lib/graphql-client-factory';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  const secret = query['secret'];
  const revalidateHandler = new RevalidateMiddleware({
    clientFactory,
    multiSite: body.multiSite || false, // override this value through your webhook payload if you're using multi-site add-on
    personalize: body.personalize || false, // override this value through your webhook payload if you're configuring personalization on any page
  }).getHandler();

  // check if the secret is provided, if not, allow the request to proceed without authentication
  if (secret === undefined) {
    console.log('Secret not provided. Proceeding without authentication.');
    await revalidateHandler(req, res);
  } else if (secret !== process.env.YOUR_REVALIDATION_SECRET) {
    // secret is provided but doesn't match the environment variable, log a message and respond with an error
    console.log('Invalid secret provided. Authentication failed.');
    res.status(401).end('Invalid secret');
  } else {
    // secret is provided and matches the environment variable, proceed with authentication
    await revalidateHandler(req, res);
  }
};

export default handler;
