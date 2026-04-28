[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:27](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L27)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:27](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L27)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extends

- `Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

***

### language

> **language**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L36)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The language

***

### retries?

> `optional` **retries?**: `number`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L83)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L83)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retries`](../../index/type-aliases/GraphQLRequestClientConfig.md#retries)

***

### retryStrategy?

> `optional` **retryStrategy?**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L88)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L88)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retryStrategy`](../../index/type-aliases/GraphQLRequestClientConfig.md#retrystrategy)

***

### siteName

> **siteName**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L32)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The JSS application name
