[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / GraphQLPersonalizeServiceConfig

# Type Alias: GraphQLPersonalizeServiceConfig

> **GraphQLPersonalizeServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:6](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L6)
=======
Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:6](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L6)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Type declaration

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

### fetch?

> `optional` **fetch?**: *typeof* `fetch`

Override fetch method. Uses 'GraphQLRequestClient' default otherwise.

### ~~scope?~~

> `optional` **scope?**: `string`

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

#### Deprecated

Will be removed in a future release.

### timeout?

> `optional` **timeout?**: `number`

Timeout (ms) for the Personalize request. Default is 400.
