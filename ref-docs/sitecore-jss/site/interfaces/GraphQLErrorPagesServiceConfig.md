[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

## Extends

- `Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)

***

### language

> **language**: `string`

The language

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:36](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L36)

***

### retries?

> `optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/graphql-request-client.ts#L83)

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/graphql-request-client.ts#L88)

***

### siteName

> **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:32](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L32)
