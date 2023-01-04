import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLRobotsService, SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';

const robotsApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  const hostDetails = {
    hostName: req.headers['host']?.split(':')[0] || 'localhost',
    language: req.headers['language']?.toString() || 'en',
  };

  const siteDetails = JSON.parse(config.sites);

  const siteName = await SiteResolver.resolve(hostDetails,siteDetails, config.jssAppName);

  // create robots graphql service
  const robotsService = new GraphQLRobotsService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: siteName,
  });

  const robotsResult = await robotsService.fetchRobots();

  return res.status(200).send(robotsResult);
};

export default robotsApi;
