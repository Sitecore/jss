import { EditingDataMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

// Bump body size limit (1mb by default) for EE payload
// See https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

// Wire up the EditingDataMiddleware handler
const handler = new EditingDataMiddleware().getHandler();

export default handler;
