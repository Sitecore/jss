import type { NextApiRequest, NextApiResponse } from 'next';
import { NativeDataFetcher, GraphQLSitemapXmlService } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

const ABSOLUTE_URL_REGEXP = '^(?:[a-z]+:)?//';

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { id },
  } = req;

  // Resolve site based on hostname
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);

  // create sitemap graphql service
  const sitemapXmlService = new GraphQLSitemapXmlService({
    clientFactory,
    siteName: site.name,
  });

  // The id is present if url has sitemap-{n}.xml type.
  // The id can be null if it's index sitemap.xml request
  const sitemapPath = await sitemapXmlService.getSitemap(id as string);

  // regular sitemap
  if (sitemapPath) {
    const isAbsoluteUrl = sitemapPath.match(ABSOLUTE_URL_REGEXP);
    const sitemapUrl = isAbsoluteUrl ? sitemapPath : `${config.sitecoreApiHost}${sitemapPath}`;
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');

    try {
      const fetcher = new NativeDataFetcher();
      const xmlResponse = await fetcher.fetch<string>(sitemapUrl);

      return res.send(xmlResponse.data);
    } catch (error) {
      return res.redirect('/404');
    }
  }

  // index /sitemap.xml that includes links to all sitemaps
  const sitemaps = await sitemapXmlService.fetchSitemaps();

  if (!sitemaps.length) {
    return res.redirect('/404');
  }

  const reqtHost = req.headers.host;
  const reqProtocol = req.headers['x-forwarded-proto'] || 'https';
  const SitemapLinks = sitemaps
    .map((item: string) => {
      const parseUrl = item.split('/');
      const lastSegment = parseUrl[parseUrl.length - 1];

      return `<sitemap>
        <loc>${reqProtocol}://${reqtHost}/${lastSegment}</loc>
      </sitemap>`;
    })
    .join('');

  res.setHeader('Content-Type', 'text/xml;charset=utf-8');

  return res.send(`
  <sitemapindex xmlns="http://sitemaps.org/schemas/sitemap/0.9" encoding="UTF-8">${SitemapLinks}</sitemapindex>
  `);
};

export default sitemapApi;
