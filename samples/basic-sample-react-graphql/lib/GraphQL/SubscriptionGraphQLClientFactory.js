import "isomorphic-fetch";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getOperationAST } from "graphql";
import { createHttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `update-fragments` script.
*/
import introspectionQueryResultData from "../../sitecore/GraphQLFragmentTypes.json";

export default function(endpoint, ssr, initialCacheState) {
  /*
    QUERY LINK SELECTION
    A link is transport which GraphQL queries are pushed across.
    You have many choices; see BasicGraphQLClientFactory for more details
  */

  // An automatic persisted query link, which reduces bandwidth by using query hashes to alias content
  const automaticPersistHttp = createPersistedQueryLink().concat(
    createHttpLink({ uri: endpoint, credentials: "include" })
  );

  /* HTTP link selection */
  let link = automaticPersistHttp;

  /* 
    SUBSCRIPTIONS LINK 
    Subscriptions are real-time data; they run over WebSockets.
    When server-side rendering, we do not want to enable subscriptions so we don't link them;
    enabling them (e.g. with `ws`) will cause Node to hang during SSR.
    For SSR set 'ssr: false' in your query options for subscription queries.
  */
  if (!ssr) {
    // The endpoint for Sitecore is the same as the HTTP(s) endpoint, but with ws:// or wss:// (encrypted)
    const subscriptionsEndpointUrl = endpoint.replace(/^http(s?)/, "ws$1");

    const wsClient = new SubscriptionClient(subscriptionsEndpointUrl, {
      reconnect: true
    });

    wsClient.onDisconnected(() => {
      console.log("Subscription link disconnected");
    });

    wsClient.onReconnected(() => {
      console.log("Subscription link is connected");
    });

    const subscriptionsLink = new WebSocketLink(wsClient);

    // create a split link, which runs queries over the selected query link,
    // and subscriptions over the WS link.
    const httpLink = link;
    link = ApolloLink.split(
      operation => {
        const operationAST = getOperationAST(
          operation.query,
          operation.operationName
        );
        return !!operationAST && operationAST.operation === "subscription";
      },
      subscriptionsLink,
      httpLink
    );
  }

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
