import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLSitemapService } from '@sitecore-jss/sitecore-jss/site';

const sitemapApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { query: { id } } = req;
  const currentUrl = process.env.PUBLIC_URL;
  // create sitemap graphql service
  const sitemapService = new GraphQLSitemapService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  });

  const existSitemap = await sitemapService.getExistsSitemap(id as string);
  if (existSitemap) {
    const sitemapResult = await fetch(`${currentUrl}${existSitemap}` as string, {
      method: 'GET'
    }).then(result => {
      if (result.status === 200) {
        return result.text();
      }
      return;
    });
  
    if (sitemapResult) {
      return res.status(200).send(sitemapResult);
    }
  }

  res.redirect('/404');
};

export default sitemapApi;
