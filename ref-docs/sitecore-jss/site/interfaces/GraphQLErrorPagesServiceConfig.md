[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:27](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L27)

## Extends

- `Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

***

### language

> **language**: `string`

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:36](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L36)

The language

***

### retries?

> `optional` **retries**: `number`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/graphql-request-client.ts#L83)

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retries`](../../index/type-aliases/GraphQLRequestClientConfig.md#retries)

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/graphql-request-client.ts#L88)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retryStrategy`](../../index/type-aliases/GraphQLRequestClientConfig.md#retrystrategy)

***

### siteName

> **siteName**: `string`

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:32](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L32)

The JSS application name
