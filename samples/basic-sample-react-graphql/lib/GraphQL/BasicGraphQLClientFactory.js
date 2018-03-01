import "isomorphic-fetch";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `update-fragments` script.
*/
import introspectionQueryResultData from "../../sitecore/GraphQLFragmentTypes.json";

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

// ...or an automatic persisted query link, which reduces bandwidth by using query hashes to alias content
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
// const automaticPersistHttp = createPersistedQueryLink().concat(basicHttp);

// ...or a batched link (multiple queries within 10ms all go in one HTTP request)
// NOTE: batching is in the process of being integrated into apollo-link-http directly;
// see https://github.com/apollographql/apollo-link/issues/343
// this would also elimintate the need for the apollo-fetch customization to send credentials
// as the options will be the same as for the HTTP link
import { BatchHttpLink } from "apollo-link-batch-http";
import { createApolloFetchUpload } from "apollo-fetch-upload";
function CreateBatchLinkWithCredentials(endpoint) {
  const fetch = createApolloFetchUpload({
    uri: endpoint
  });
  fetch.batchUse(({ options }, next) => {
    options.credentials = "include";
    next();
  });
  return new BatchHttpLink({ fetch: fetch });
}

export default function(endpoint, ssr, initialCacheState) {
  /* HTTP link selection */

  let link = CreateBatchLinkWithCredentials(endpoint);

  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData
    })
  });

  return new ApolloClient({
    ssrMode: ssr,
    ssrForceFetchDelay: 100,
    link: link,
    cache: cache.restore(initialCacheState)
  });
}
