import request from 'request';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLSitemapService } from '@sitecore-jss/sitecore-jss/site';

const ABSOLUTE_URL_REGEXP = '^(?:[a-z]+:)?//';

const sitemapApi = async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> => {
  const { query: { id } } = req;
  // create sitemap graphql service
  const sitemapService = new GraphQLSitemapService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  });

  const existSitemap = await sitemapService.getSitemap(id as string);

  if (existSitemap) {
    const isAbsoluteUrl = existSitemap.match(ABSOLUTE_URL_REGEXP);
    const sitemapUrl = isAbsoluteUrl ? existSitemap : `${config.sitecoreApiHost}${existSitemap}`;
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');

    return request(sitemapUrl).pipe(res);
  }

  res.redirect('/404');
};

export default sitemapApi;
