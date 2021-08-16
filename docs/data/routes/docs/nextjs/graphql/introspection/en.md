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

When working with GraphQL in the sample Next.js application, you should be aware of the concept of **introspection data**, which describes the queries supported by the GraphQL schema. Read more [here](https://graphql.org/learn/introspection). `graphq-let` uses this introspection data to understand which types it should use during code generation.

After you build the application for the first time, you will find `src/temp/GraphQLIntrospectionResult.json`, containing introspection data.

When you alter Sitecore templates related to the site, you should update the introspection data. 
In the root of your Next.js application, run: 

```
jss graphql:update 
```
This calls a script `scripts/fetch-graphql-introspection-data.ts` which will fetch fresh introspection data from your defined GraphQL endpoint and update the file.

The script uses the `graphQLEndpoint` and `sitecoreApiKey` defined in `src/temp/config.js`, a file generated when you start your sample app for the first time.
