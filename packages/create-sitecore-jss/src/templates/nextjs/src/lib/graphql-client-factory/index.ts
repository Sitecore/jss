import config from 'temp/config';
import { createGraphQLClientFactory } from './utils';

/**
 * Create a new GraphQLClientFactory instance on each import call
 */
export default createGraphQLClientFactory(config);
