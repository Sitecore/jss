/* eslint-disable import/first */

import 'cross-fetch/polyfill';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

/* eslint-disable import/order */

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `jss graphql:update` script.
*/
import introspectionQueryResultData from '../temp/GraphQLFragmentTypes.json';

/*
  QUERY LINK SELECTION
  A link is transport which GraphQL queries are pushed across.
  You have many choices.
  See the apollo-link documentation for more details.
*/

// choose between a basic HTTP link to run queries...
// import { createHttpLink } from 'apollo-link-http';
// const link = createHttpLink({ uri: endpoint });

// ...or a batched link (multiple queries within 10ms all go in one HTTP request)
import { BatchHttpLink } from 'apollo-link-batch-http';

// ...and an automatic persisted query link, which reduces bandwidth by using query hashes to alias content
// the APQ link is _chained_ behind another link that performs the actual HTTP calls, so you can choose
// APQ + batched, or APQ + http links for example.
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import config from '../temp/config';

export default function (endpoint, ssr, initialCacheState) {
  /* HTTP link selection: default to batched + APQ */
  const link = createPersistedQueryLink().concat(
    new BatchHttpLink({
      uri: endpoint,
      headers: {
        connection: 'keep-alive',
        sc_apikey: config.sitecoreApiKey,
      },
    })
  );

  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    }),
  });

  return new ApolloClient({
    ssrMode: ssr,
    ssrForceFetchDelay: 100,
    link,
    cache: cache.restore(initialCacheState),
  });
}
