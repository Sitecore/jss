/* eslint-disable no-param-reassign, import/first */

import 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `update-fragments` script.
*/
import introspectionQueryResultData from '../../sitecore/GraphQLFragmentTypes.json';

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
// const basicHttp = createHttpLink({ uri: endpoint, credentials: 'include' });

// ...or a batched link (multiple queries within 10ms all go in one HTTP request)
import { BatchHttpLink } from 'apollo-link-batch-http';

// ...or an automatic persisted query link, which reduces bandwidth by using query hashes to alias content
// the APQ link takes advantage of _chaining_ links together. You can also chain a batch-http link to APQ,
// and get a persisted, batched link for the ultimate solution.
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
// const automaticPersistHttp = createPersistedQueryLink().concat(basicHttp);

export default function(endpoint, ssr, initialCacheState) {
  /* HTTP link selection: default to batched + APQ */
  const link = createPersistedQueryLink().concat(
    new BatchHttpLink({ uri: endpoint, credentials: 'include' })
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
