---
name: component
routeTemplate: ./data/component-templates/article.yml
title: Using GraphQL in component SSR/SSG
---
# Walkthrough: Using GraphQL in component SSR/SSG

Next.js sample app provides you ability to use [component level data fetching](/docs/nextjs/data-fetching/component-level-data-fetching), read about it first.
Consequently you can execute GraphQL queries on component level and use fetched data in component.

> NOTE: In case if you are working in [Disconnected](/docs/techniques/working-disconnected/disconnected-overview) mode you can't use GraphQL queries, because disconnected server doesn't support GraphQL.

Next.js sample app provides easy way how to manage both local and remote data with GraphQL, fetch, cache application data.
For this purpose we are using [apollo-client](https://www.apollographql.com/docs/react/) library. Our `GraphQLClientFactory` is responsible for creation of [ApolloClient](https://www.apollographql.com/docs/react/api/core/ApolloClient) instance. 

In the code we want to have strong types connected to GraphQL types which are defined in Sitecore GraphQL Edge endpoint. In order to achive it we are using [graphql-let](https://github.com/piglovesyou/graphql-let). Read [how graphql-let is working](https://github.com/piglovesyou/graphql-let#how-it-works).
`graphq-let` is using `src/temp/GraphQLIntrospectionResult.json` schema in order to understand which types it should generate.

The `jss graphql:update` command should be executed when Sitecore templates related to the site are altered. It will fetch fresh `introspection result` and `fragment data` from your defined GraphQL endpoint. As the result you will have generated `src/temp/GraphQLIntrospectionResult.json` and `src/temp/GraphQLFragmentTypes.json` files.

`Introspection result` - information about what queries GraphQL schema supports. Read more [here](https://graphql.org/learn/introspection).

`Fragment data` - Apollo Client supports caching GraphQL responses, which can greatly reduce network traffic needs. In order to work correctly with interfaces in GraphQL, it needs to know some basic information about the shape of the GraphQL schema. Read more [here](https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher).

You can use `${SITECORE_API_HOST}/sitecore/api/graph/edge/ui?sc_apikey=${SITECORE_API_KEY}` endpoint if you want:
* Find all supported graphql types. You can find all types which you need to import in your component file. `graphql-let` provides same types in corresponding `.graphq.d.ts` files.
* Write and test new query.
* Debug existing query.

Let's go through the steps to execute first GraphQL query in your component. We can use [GraphQL-ConnectedDemo](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/graphql/GraphQL-ConnectedDemo.tsx) example.

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
