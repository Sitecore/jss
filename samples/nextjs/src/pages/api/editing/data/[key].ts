import type { NextApiRequest, NextApiResponse } from 'next';
import { EditingData } from '@sitecore-jss/sitecore-jss-nextjs';
import { editingDataCache } from 'lib/editing-data-cache';

// Bump body size limit (1mb by default) for EE payload
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
};

const isEditingData = function (data: EditingData | unknown): data is EditingData {
  return (data as EditingData).layoutData !== undefined;
};

function handler(req: NextApiRequest, res: NextApiResponse): void {
  const {
    method,
    query: { secret, key },
    body,
  } = req;

  if (secret !== process.env.EDITING_SECRET_TOKEN) {
    return res.status(401).end('Invalid token');
  }

  switch (method) {
    case 'GET':
      // Get cache value
      const data = editingDataCache.get(key as string);
      res.status(200).json(data);
      break;
    case 'PUT':
      if (!isEditingData(body)) {
        res.status(400).end('Missing or invalid editing data');
      } else {
        // Set cache value
        editingDataCache.set(key as string, body as EditingData);
        res.status(200).json({});
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
