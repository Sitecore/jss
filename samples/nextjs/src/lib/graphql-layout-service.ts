import { GraqhQLLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

const graphQLLayoutService = new GraqhQLLayoutService({
  siteName: config.jssAppName,
  endpoint: config.graphQLEndpoint,
});

export { graphQLLayoutService };
