import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLRobotsService, SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';

const robotsApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  const hostDetails = {
    hostName: _req.headers['host']?.split(':')[0] || 'localhost',
    language: _req.headers['language']?.toString() || 'en',
  };

  const siteName = await SiteResolver.resolve(hostDetails, config.jssAppName);

  // create robots graphql service
  const robotsService = new GraphQLRobotsService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: siteName || config.jssAppName,
  });

  const robotsResult = await robotsService.fetchRobots();

  return res.status(200).send(robotsResult);
};

export default robotsApi;
