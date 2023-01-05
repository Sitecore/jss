import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import { GraphQLRobotsService, SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';

const robotsApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  // Resolve site based on hostname"
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';

  // Site information fetched directly from Sitecore.
  const sites = JSON.parse(config.sites);

  // Resolve site name based on host information
  const siteName = await SiteResolver.resolve(hostName, sites);

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
