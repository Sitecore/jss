import { sitecoreConfig } from '@sitecore-jss/sitecore-jss-nextjs';
import { createGraphQLClientFactory } from './create';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

// Create a new instance on each import call
export default createGraphQLClientFactory(sitecoreConfig);
