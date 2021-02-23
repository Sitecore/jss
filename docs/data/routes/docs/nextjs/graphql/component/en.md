---
name: component
routeTemplate: ./data/component-templates/article.yml
title: Using GraphQL in component SSR/SSG
---
# Walkthrough: Using Component-Level GraphQL in SSR/SSG

The Next.js sample app provides support for [component-level data fetching](/docs/nextjs/data-fetching/component-level-data-fetching), which enables executing GraphQL queries at the component level.

> NOTE: If you are following the `Code First` developer workflow, you can execute GeaphQL component-level queries only in `Connected Mode`. They are not supported in [`Disconnected Mode`](/docs/techniques/working-disconnected/disconnected-overview).

Next.js sample app provides easy way how to manage both local and remote data with GraphQL, fetch, cache application data.
For this purpose we are using [apollo-client](https://www.apollographql.com/docs/react/) library. Our `GraphQLClientFactory` is responsible for creation of [ApolloClient](https://www.apollographql.com/docs/react/api/core/ApolloClient) instance. 

In the code we want to have strong types connected to GraphQL types which are defined in Sitecore GraphQL Edge endpoint. In order to achive it we are using [GraphQL Introspection](/docs/nextjs/graphql/introspection/).

You can use `${SITECORE_API_HOST}/sitecore/api/graph/edge/ui?sc_apikey=${SITECORE_API_KEY}` endpoint if you want:
* Find all supported graphql types. You can find all types which you need to import in your component file. `graphql-let` provides same types in corresponding `.graphq.d.ts` files.
* Write and test new query.
* Debug existing query.

This walkthrough utilizes the sample apps's [GraphQL-ConnectedDemo](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx) component. Complete the following steps to demonstrate usage of component-level data fetching with GraphQL.

1. Define `getStaticProps` or/and `getServerSideProps` in your component. Next steps you should perform inside these functions.
2. Create new GraphQL client. `GraphQLClientFactory` is using [apollo-client](https://www.apollographql.com/docs/react) library.
```ts
import GraphQLClientFactory from 'lib/GraphQLClientFactory';
...
const graphQLClient = GraphQLClientFactory();
```
3. Import needed GraphQL query. [graphql-let](https://github.com/piglovesyou/graphql-let) provides ability to import queries.
```ts
import { GraphQlConnectedDemo as GrapQLConnectedDemoDatasource } from './GraphQL-ConnectedDemo.graphql';
```
3. In order to execute query, use `graphQLClient.query`.
```ts
const result = await graphQLClient.query({
	query: ConnectedDemoQueryDocument,
	variables: {
		datasource: rendering.dataSource,
		contextItem: layoutData?.sitecore?.route?.itemId,
	},
});
```
4. Return all needed data for your component. In our case it's `result.data`.
5. In `render` function access this data using `useComponentProps` hook.
```ts
const data = props.rendering.uid
	? useComponentProps<GraphQLConnectedDemoData>(props.rendering.uid)
	: undefined;
```
