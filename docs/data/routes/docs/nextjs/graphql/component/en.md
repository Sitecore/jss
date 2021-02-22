---
name: component
routeTemplate: ./data/component-templates/article.yml
title: Using GraphQL in component SSR/SSG
---
# Walkthrough: Using GraphQL in component SSR/SSG

Next.js sample app provides you ability to use [component level data fetching](/docs/nextjs/data-fetching/component-level-data-fetching), read about it first.
Consequently you can execute GraphQL queries on component level and use fetched data in component.

> NOTE: In case if you are working in [Disconnected](/docs/techniques/working-disconnected/disconnected-overview) mode you can't use GraphQL queries, because disconnected server doesn't support GraphQL.

Let's go through the steps to execute first GraphQL query in your component. We can use [GraphQL-ConnectedDemo](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx) example.

1. Define `getStaticProps` or/and `getServerSideProps`. Next steps you should perform inside these functions.
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
3. In order to execute query, use `graphQLClient.query`. Read more about [ApolloClient](https://www.apollographql.com/docs/react/api/core/ApolloClient) API.
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
