[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClientFactory

# Type Alias: GraphQLRequestClientFactory

> **GraphQLRequestClientFactory** = (`config?`) => [`GraphQLRequestClient`](../classes/GraphQLRequestClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:101](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L101)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:101](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L101)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A GraphQL Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `Omit`\<[`GraphQLRequestClientConfig`](GraphQLRequestClientConfig.md), `"apiKey"`\> | The configuration object that specifies how the GraphQL client should be set up. |

## Returns

[`GraphQLRequestClient`](../classes/GraphQLRequestClient.md)

An instance of a GraphQL Request Client ready to send GraphQL requests.
