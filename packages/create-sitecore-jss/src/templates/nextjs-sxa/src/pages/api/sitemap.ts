import type { NextApiRequest, NextApiResponse } from 'next';
import { NativeDataFetcher, GraphQLSitemapXmlService } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolver } from 'lib/site-resolver';
import clientFactory from 'lib/graphql-client-factory';

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
    try {
      const fetcher = new NativeDataFetcher();
      const xmlResponse = await fetcher.fetch<string>(sitemapPath);

      if (!xmlResponse?.data) {
        return res.redirect('/404');
      }

      res.setHeader('Content-Type', 'text/xml;charset=utf-8');

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

  const reqHost = req.headers.host;
  const reqProtocol = req.headers['x-forwarded-proto'] || 'https';
  const SitemapLinks = sitemaps
    .map((item: string) => {
      const parseUrl = item.split('/');
      const lastSegment = parseUrl[parseUrl.length - 1];
      const escapedUrl = `${reqProtocol}://${reqHost}/${lastSegment}`.replace(/&/g, '&amp;');

      return `<sitemap>
        <loc>${escapedUrl}</loc>
      </sitemap>`;
    })
    .join('');

  res.setHeader('Content-Type', 'text/xml;charset=utf-8');

  return res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://sitemaps.org/schemas/sitemap/0.9">${SitemapLinks}</sitemapindex>
  `);
};

export default sitemapApi;
