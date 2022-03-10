// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MiddlewarePlugin } from '..';

export const personalizePlugin: MiddlewarePlugin = async function (
  req: NextRequest,
  res: NextResponse
) {
  // no need to personalize for preview, layout data already prepared on XM Cloud for preview,
  // personalizeLayout function will not perform any transformation if pass not existing segment code: e.g. _default
  const isPreview = req.cookies['__prerender_bypass'] || req.cookies['__next_preview_data'];
  let segment = '';
  let cdpBrowserId = '';

  const pathname = req.nextUrl?.pathname;
  // exclude /api route as not page one
  const isApiRoute = pathname?.indexOf('/api/') !== -1;

  // middleware in the root intercepts requests for static assets (/public folder on app src)
  // no need to personalize them, no way to distinguish asset based on request, see https://github.com/vercel/next.js/issues/31721
  const isAsset = /\.(gif|jpg|jpeg|tiff|png|svg|ashx|ico)$/i.test(pathname || '');

  if (!isAsset && !isApiRoute) {
    if (isPreview) {
      segment = '_default';
    } else {
      // logic inside call Exp Edge to get itemid, call Boxever API to get segment
      const cdpResponse = await getSegmentForCurrentUser(req);
      segment = cdpResponse.segmentCode;
      cdpBrowserId = cdpResponse.browserId;
      if (!segment) {
        segment = '_default';
      }
    }

    if (pathname) {
      // _segmentId_ is just special word to distinguish path with segment code
      // without local rewrite will not work, see bug: https://github.com/vercel-customer-feedback/edge-functions/issues/85
      const rewriteTo = `/${req.nextUrl.locale || 'en'}/_segmentId_${segment}` + pathname;

      const nextResponse = NextResponse.rewrite(rewriteTo);
      // set Boxever identification cookie
      // had better set boxeverid cookie on server, read https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
      if (cdpBrowserId) {
        const boxeverClientKey = process.env.BOXEVER_CLIENT_KEY;
        const browserIdCookieName = `bid_${boxeverClientKey}`;
        SetCookie(nextResponse, cdpBrowserId, browserIdCookieName);
      }

      return nextResponse;
    }
  }

  return res;
};

personalizePlugin.order = 0;

async function getSegmentForCurrentUser(req: NextRequest) {
  // ALL THOSE KEYS ALL PUBLIC, move to env variables in production implementation
  const boxeverApi = process.env.BOXEVER_API;
  const boxeverClientKey = process.env.BOXEVER_CLIENT_KEY;
  const expEdgeGraphql =
    process.env.GRAPH_QL_ENDPOINT ||
    (process.env.SITECORE_API_HOST || 'http://nextjsedge102') + '/sitecore/api/graph/edge';
  const sc_apikey = process.env.SITECORE_API_KEY || '24B40E6D-B002-465B-91CF-A3EE37E584E2';
  const site = process.env.JSS_APP_NAME || 'JssNextWeb';
  const routePath = req.nextUrl?.pathname;
  const language = req.nextUrl.locale || 'en';
  let friendlyId = '';

  // HERE WILL BE personalization field on item with segmentFriendlyIds,
  // if segmentFriendlyIds is empty no need to call Boxever, page has not personalization
  const init = {
    body: JSON.stringify({
      operationName: 'layout',
      query: `query layout {
        layout(site: "${site}", routePath: "${routePath}", language: "${language}") {
          item {
            id
            version
          }
        }
      }`,
      variables: {},
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      sc_apikey: sc_apikey,
    },
  };
  const edgeResponse = await fetch(`${expEdgeGraphql}`, init);
  const edgeResult = await edgeResponse.json();

  friendlyId =
    `${edgeResult?.data?.layout?.item.id}_${language}_${edgeResult.data?.layout?.item?.version}`.toLowerCase();

  return await GetSegmentFromCdp(req, boxeverApi, boxeverClientKey, friendlyId);
}

async function GetSegmentFromCdp(
  req: NextRequest,
  boxeverApi: string,
  boxeverClientKey: string,
  contentFriendlyId: string
) {
  // Each user should have saved identifier to connect between session, Boxever use bid cookies + local storage
  const browserIdCookieName = `bid_${boxeverClientKey}`;

  const payload = { clientKey: boxeverClientKey, browserId: '', params: {} };
  if (req.cookies[browserIdCookieName] !== null) {
    payload.browserId = req.cookies[browserIdCookieName];
  }
  console.log(`Payload -> ${JSON.stringify(payload)}`);

  const rawResponse = await fetch(boxeverApi + `/${contentFriendlyId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!rawResponse.ok) {
    return { segmentCode: '' };
  }

  const cdpSegmentsResponseJson = await rawResponse.json();
  console.log(`CDP response -> ${JSON.stringify(cdpSegmentsResponseJson)}`);

  const segmentCode =
    cdpSegmentsResponseJson?.segments && cdpSegmentsResponseJson?.segments.length
      ? cdpSegmentsResponseJson?.segments[0]
      : '';
  return {
    segmentCode: segmentCode,
    browserId: cdpSegmentsResponseJson.browserId,
  };
}

function SetCookie(res: NextResponse, browserId: string, browserIdCookieName: string) {
  if (typeof browserId !== 'undefined') {
    const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
    const options = { expires: expiryDate, secure: true };

    res.cookie(browserIdCookieName, browserId, options);
  }
}
