import { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { AxiosDataFetcher, GraphQLSitemapXmlService } from '@sitecore-jss/sitecore-jss-nextjs';

const ABSOLUTE_URL_REGEXP = '^(?:[a-z]+:)?//';

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const {
    query: { id },
  } = req;
  // create sitemap graphql service
  const sitemapXmlService = new GraphQLSitemapXmlService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  });

  const sitemapPath = await sitemapXmlService.getSitemap(id as string);

  if (sitemapPath) {
    const isAbsoluteUrl = sitemapPath.match(ABSOLUTE_URL_REGEXP);
    const sitemapUrl = isAbsoluteUrl ? sitemapPath : `${config.sitecoreApiHost}${sitemapPath}`;
    res.setHeader('Content-Type', 'text/xml;charset=utf-8');

    return new AxiosDataFetcher()
      .get(sitemapUrl, {
        responseType: 'stream',
      })
      .then((response: AxiosResponse) => {
        response.data.pipe(res);
      })
      .catch(() => res.redirect('/404'));
  }

  res.redirect('/404');
};

export default sitemapApi;
