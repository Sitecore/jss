---
name: component
routeTemplate: ./data/component-templates/article.yml
title: Using GraphQL in component SSR/SSG
---
# Walkthrough: Using Component-Level GraphQL in SSR/SSG

The Next.js sample app provides support for [component-level data fetching](/docs/nextjs/data-fetching/component-level-data-fetching), which enables executing GraphQL queries at the component level.

> NOTE: If you follow the Code First developer workflow, you can execute GraphQL component-level queries only in Connected Mode. They are not supported in [Disconnected Mode](/docs/techniques/working-disconnected/disconnected-overview).

The Next.js sample app utilizes the [apollo-client](https://www.apollographql.com/docs/react/) library to facilitate fetching, caching, and managing local and remote data with GraphQL. The `GraphQLClientFactory` is responsible for initializing a new [ApolloClient](https://www.apollographql.com/docs/react/api/core/ApolloClient) instance. 

In the code, we want to have strong types connected to GraphQL types defined in the Sitecore GraphQL Edge endpoint. To achieve this we are using [GraphQL Introspection](/docs/nextjs/graphql/introspection/).

The sample app provides a GraphiQL interface for exploring the schema and testing queries. By deafult, the interface can accessed using `${SITECORE_API_HOST}/sitecore/api/graph/edge/ui?sc_apikey=${SITECORE_API_KEY}`. This interface is helpful if you need to determine what graphQL types can be used by your components. Note that `graphql-let` provides the same information about types in corresponding `.graphq.d.ts` files.

This walkthrough utilizes the sample apps's [GraphQL-ConnectedDemo](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx) component. 

To use component-level data fetching with GraphQL, complete the following steps:

1. Define `getStaticProps` and/or `getServerSideProps` in your component. You should perform the following steps inside these functions.
2. Create a new GraphQL client. `GraphQLClientFactory` is using the [apollo-client](https://www.apollographql.com/docs/react) library.
```ts
import GraphQLClientFactory from 'lib/GraphQLClientFactory';
...
const graphQLClient = GraphQLClientFactory();
```
3. Import the needed GraphQL query. [graphql-let](https://github.com/piglovesyou/graphql-let) provides ability to import queries.
```ts
import { GraphQlConnectedDemo as GrapQLConnectedDemoDatasource } from './GraphQL-ConnectedDemo.graphql';
```
3. To execute the query, use `graphQLClient.query`.
```ts
const result = await graphQLClient.query({
	query: ConnectedDemoQueryDocument,
	variables: {
		datasource: rendering.dataSource,
		contextItem: layoutData?.sitecore?.route?.itemId,
	},
});
```
4. Return all needed data for your component `result.data`.
5. In the `render` function access this data using `useComponentProps` hook.
```ts
const data = props.rendering.uid
	? useComponentProps<GraphQLConnectedDemoData>(props.rendering.uid)
	: undefined;
```
