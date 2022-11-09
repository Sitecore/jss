import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLRobotsService } from '@sitecore-jss/sitecore-jss-nextjs';

const robotsApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  // create robots graphql service
  const robotsService = new GraphQLRobotsService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: config.jssAppName,
  });

  const robotsResult = await robotsService.fetchRobots();

  return res.status(200).send(robotsResult);
};

export default robotsApi;
