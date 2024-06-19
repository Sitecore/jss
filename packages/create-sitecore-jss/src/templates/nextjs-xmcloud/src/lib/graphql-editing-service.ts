import { GraphQLEditingService } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import clientFactory from 'lib/graphql-client-factory';

/**
 * GraphQL Editing Service instance. Used to fetch editing data in Pages preview (editing) Metadata Edit Mode.
 */
export const graphQLEditingService = new GraphQLEditingService({
  clientFactory,
});
