---
name: introspection
routeTemplate: ./data/component-templates/article.yml
title: Introspecting the GraphQL schema
---
# Walkthrough: Introspecting the GraphQL schema

In Next.js sample app it's required to have GraphQL introspection data. In the code we want to have strong types connected to GraphQL types which are defined in Sitecore GraphQL Edge endpoint. This data used by [graphql-let](https://github.com/piglovesyou/graphql-let). Read [how graphql-let is working](https://github.com/piglovesyou/graphql-let#how-it-works).
`graphq-let` is using `src/temp/GraphQLIntrospectionResult.json` schema in order to understand which types it should generate.

`Introspection result` - information about what queries GraphQL schema supports. Read more [here](https://graphql.org/learn/introspection).

`Fragment data` - Apollo Client supports caching GraphQL responses, which can greatly reduce network traffic needs. In order to work correctly with interfaces in GraphQL, it needs to know some basic information about the shape of the GraphQL schema. Read more [here](https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher).

In order to update introspection data you should use `jss graphql:update`. This command should be executed when Sitecore templates related to the site are altered. It will fetch fresh `introspection result` and `fragment data` from your defined GraphQL endpoint. As the result you will have generated `src/temp/GraphQLIntrospectionResult.json` and `src/temp/GraphQLFragmentTypes.json` files.

File `.graphql-let.yml` contains configuration for `graphql-let`. Read more about [configuration](https://github.com/piglovesyou/graphql-let#configuration-is-compatible-with-codegenyml-except).

Script `scripts/fetch-graphql-introspection-data.ts` is responsible for fetching introspection data. It uses `graphQLEndpoint` from `src/temp/config.js` which is generated when you start your sample first time.