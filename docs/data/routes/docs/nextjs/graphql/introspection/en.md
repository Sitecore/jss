---
name: introspection
routeTemplate: ./data/component-templates/article.yml
title: Introspecting the GraphQL schema
---
# Walkthrough: Introspecting the GraphQL schema

One of the strengths of GraphQL is enforcing data types at runtime. Further, TypeScript and GraphQL code generation make it safer by typing data statically, so you can write type-protected code with rich IDE assists. The Next.js sample app uses [graphql-let](https://github.com/piglovesyou/graphql-let) for this purpose.

> Read more about [how graphql-let works](https://github.com/piglovesyou/graphql-let#how-it-works).

The file `.graphql-let.yml` in the sample app root contains configuration for `graphql-let`.

> Read more about [graphql-let configuration](https://github.com/piglovesyou/graphql-let#configuration-is-compatible-with-codegenyml-except).

When working with GraphQL in the sample Next.js application, you should be aware of two concepts:
* **Introspection data**, which describes the queries supported by the GraphQL schema. Read more [here](https://graphql.org/learn/introspection). `graphq-let` uses this introspection data to understand which types it should use during code generation.
* **Fragment data**, which is basic information about the shape of the GraphQL schema. Apollo Client supports caching GraphQL responses, which can greatly reduce network traffic needs. To work correctly with interfaces in GraphQL, the Apollo Client needs to know the information in this file. Read more [here](https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher).

After you build the application for the first time, you will find: 
* `src/temp/GraphQLIntrospectionResult.json`, containing introspection data.
* `src/temp/GraphQLFragmentTypes.json`, containing fragment data.

When you alter Sitecore templates related to the site, you should update the introspection data. 
In the root of your Next.js application, run: 

```
jss graphql:update 
```
This script will fetch fresh introspection data and fragment data from your defined GraphQL endpoint and update the two files. 

The script `jss graphql:update` calls two other scripts: 
* `scripts/fetch-graphql-introspection-data.ts` is responsible for fetching introspection data. 
* `scripts/update-graphql-fragment-data.ts` is responsible for fetching fragment data. 

Both scripts use the `graphQLEndpoint` defined in `src/temp/config.js`, a file generated when you start your sample app for the first time.
