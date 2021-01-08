import type { NextApiRequest } from 'next';
import { EditingData } from '@sitecore-jss/sitecore-jss-nextjs';

export interface EditingPreviewData {
  key: string;
}

export function extractEditingData(req: NextApiRequest): EditingData {
  // The Experience Editor will send the following body data structure,
  // though we're only concerned with the "args".
  // {
  //   id: 'JSS app name',
  //   args: ['path', 'serialized layout data object', 'serialized viewbag object'],
  //   functionName: 'renderView',
  //   moduleName: 'server.bundle'
  // }
  // The 'serialized viewbag object' structure:
  // {
  //   language: 'language',
  //   dictionary: 'key-value representation of tokens and their corresponding translations',
  //   httpContext: 'serialized request data'
  // }

  const payload = req.body;
  if (!payload || !payload.args || !Array.isArray(payload.args) || payload.args.length < 3) {
    throw new Error('Unable to extract editing data from request');
  }

  const layoutData = JSON.parse(payload.args[1]);
  const viewBag = JSON.parse(payload.args[2]);
  // Keep backwards compatibility in case people use an older JSS version that doesn't send the path in the context
  const path = layoutData.sitecore.context.itemPath ?? viewBag.httpContext.request.path;

  return {
    path,
    layoutData,
    language: viewBag.language,
    dictionary: viewBag.dictionary,
  };
}

const generateKey = function (data: EditingData): string {
  // Might be better to do something like generate an md5 hash on the entire data object
  // (since requests are made "live" during editing in EE), but Date.now() works for now
  return `${data.layoutData.sitecore.route.itemId}-${Date.now()}`;
};

export async function setEditingData(data: EditingData): Promise<EditingPreviewData> {
  const key = generateKey(data);
  const url = `${process.env.PUBLIC_URL}/api/editing/data/${key}?secret=${process.env.EDITING_SECRET_TOKEN}`;
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(() => {
    return { key };
  });
}

export async function getEditingData(
  previewData: EditingPreviewData
): Promise<EditingData | undefined> {
  const url = `${process.env.PUBLIC_URL}/api/editing/data/${previewData.key}?secret=${process.env.EDITING_SECRET_TOKEN}`;
  return fetch(url, {
    method: 'GET',
  })
    .then((result) => result.json())
    .then((result) => {
      return result as EditingData;
    });
}
