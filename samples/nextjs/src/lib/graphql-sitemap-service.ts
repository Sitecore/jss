import { GraphQLSitemapService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

const graphQLSitemapService = new GraphQLSitemapService({
  endpoint: config.graphqlEndpoint,
});

export { graphQLSitemapService };
