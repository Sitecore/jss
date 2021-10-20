import { createGzip } from 'zlib';
import { SitemapStream } from 'sitemap';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import nextConfig from 'next.config.base';
import {
  GraphQLSitemapXmlService,
  SitemapItem,
  getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';

const staticURLs: string[] = [
  // Any non-dynamic/Sitecore paths could be defined here, either statically or generated
  //  e.g. crawling "pages" directory: https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js
  //  e.g. using pages-manifest.json?: https://maikelveen.com/blog/generate-a-sitemap-with-next-js-and-typescript
];

const sitemapApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is XML & gzip encoded
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Encoding', 'gzip');

  // Get all dynamic URLs from Sitecore for configured languages
  const sitemapXmlService = new GraphQLSitemapXmlService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
    jssAppTemplateId: '{9ED66404-64C9-4122-90E1-869CB3CEA566}', // SXA Headless Site
  });
  // Note this assumes sub-path routing approach for i18n
  // Would need to go about this differently for domain routing
  const dynamicURLs = await sitemapXmlService.fetchSitemap(
    nextConfig.i18n.locales,
    nextConfig.i18n.defaultLocale
  );

  // Use 'sitemap' module to do the heavy lifting of formatting, streaming, etc
  // https://www.npmjs.com/package/sitemap
  const sitemapStream = new SitemapStream({
    hostname: getPublicUrl(),
    lastmodDateOnly: true,
  });
  const pipeline = sitemapStream.pipe(createGzip());

  // Write static pages to the sitemap
  staticURLs.forEach((url) => {
    sitemapStream.write({ url });
  });

  // Write dynamic pages to the sitemap
  dynamicURLs.forEach((item: SitemapItem) => {
    sitemapStream.write({
      url: item.path,
      changefreq: item.changeFrequency,
      priority: item.priority,
      lastmod: item.lastModified.toISOString(),
    });
  });

  sitemapStream.end();

  // Stream write the response
  pipeline.pipe(res).on('error', (err) => {
    throw err;
  });
};

export default sitemapApi;
