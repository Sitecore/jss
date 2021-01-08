import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss-nextjs';
import { extractEditingData, setEditingData } from 'lib/editing-utils';

// Bump body size limit (1mb by default) for EE payload
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, query } = req;

  if (method !== 'POST') {
    return res.status(405).json({
      html: `<html><body>Invalid request method '${method})'</body></html>`,
      status: 405,
    });
  }

  // Check the secret
  // Use query string for now - eventually, this may be on the EE payload
  if (query.secret !== process.env.EDITING_SECRET_TOKEN) {
    return res.status(401).json({
      html: `<html><body>Invalid token'</body></html>`,
      status: 401,
    });
  }

  try {
    // Extract data from EE payload
    const editingData = extractEditingData(req);

    // Stash for use later on
    // Note we can't set this directly in setPreviewData since it's stored as a cookie (2KB limit)
    // https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits
    const previewData = await setEditingData(editingData);

    // Enable Preview Mode, passing our preview data (i.e. editingData cache key)
    res.setPreviewData(previewData);

    // Grab Next.js preview cookie to send on request
    const cookies = res.getHeader('Set-Cookie') as string[];
    const headers = {
      Cookie: cookies.join(';'),
    };

    // Make actual render request for page route
    // TODO: make this extensible (e.g. with a delegate function)
    const requestUrl = new URL(editingData.path, `http:\\${req.headers.host}`);

    const client = new AxiosDataFetcher({ headers });
    // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
    // https://stackoverflow.com/questions/49263559/using-javascript-axios-fetch-can-you-disable-browser-cache
    const pageRes = await client.fetch(`${requestUrl.toString()}?timestamp=${Date.now()}`);
    const html = pageRes.data as string;

    // Return expected JSON result
    res.status(pageRes.status).json({ html, status: pageRes.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      html: `<html><body>${error}</body></html>`,
      status: 500,
    });
  }
}

export default handler;
