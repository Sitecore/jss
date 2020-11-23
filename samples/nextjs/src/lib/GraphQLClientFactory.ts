import 'cross-fetch/polyfill';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `jss graphql:update` script.
*/
import introspectionQueryResultData from 'temp/GraphQLFragmentTypes.json';

/*
  QUERY LINK SELECTION
  A link is transport which GraphQL queries are pushed across.
  You have many choices.
  See the apollo-link documentation for more details.

  NOTE: to use Sitecore Experience Editor it is essential that your
  link passes cookies along with requests (credentials: 'include').
*/

// choose between a basic HTTP link to run queries...
// import { createHttpLink } from 'apollo-link-http';
// const link = createHttpLink({ uri: endpoint, credentials: 'include' });

// ...or a batched link (multiple queries within 10ms all go in one HTTP request)
import { BatchHttpLink } from 'apollo-link-batch-http';

// ...and an automatic persisted query link, which reduces bandwidth by using query hashes to alias content
// the APQ link is _chained_ behind another link that performs the actual HTTP calls, so you can choose
// APQ + batched, or APQ + http links for example.
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { useMemo } from 'react';
import config from 'temp/config';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

/**
 * Create new apollo client instance
 */
const createApolloClient = (
  endpoint: string,
  initialCacheState: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> => {
  /* HTTP link selection: default to batched + APQ */
  const link = createPersistedQueryLink().concat(
    new BatchHttpLink({
      uri: endpoint,
      credentials: 'include',
      headers: {
        connection: 'keep-alive',
      },
    })
  );

  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    }),
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    ssrForceFetchDelay: 100,
    link,
    cache: cache.restore(initialCacheState),
  });
};

type InitializeApolloOptions = {
  endpoint?: string;
  initialState?: NormalizedCacheObject;
};

/**
 * Get new/current apollo client instance, depends on application mode (SSR/SSG)
 */
export default function initializeApollo({
  endpoint = config.graphQLEndpoint,
  initialState = {},
}: InitializeApolloOptions): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(endpoint, initialState);

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * Hook in order to get access to apollo client instance
 */
export function useApollo(options: InitializeApolloOptions): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(options), [options.initialState]);

  return store;
}
