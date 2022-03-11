import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLRobotsService } from '@sitecore-jss/sitecore-jss-nextjs';

const robotsApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/plain & gzip encoded
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader('Content-Encoding', 'gzip');

  // Get all dynamic URLs from Sitecore for configured languages
  const robotsService = new GraphQLRobotsService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  });

  const robotsResult = await robotsService.fetchRobots();

  return res.status(200).send(robotsResult);
};

export default robotsApi;
