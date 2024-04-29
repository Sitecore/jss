[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[index](../modules/index.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`\<`GraphQLRequestClientConfig`, ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [clientFactory](index.GraphQLErrorPagesServiceConfig.md#clientfactory)
- [language](index.GraphQLErrorPagesServiceConfig.md#language)
- [retries](index.GraphQLErrorPagesServiceConfig.md#retries)
- [retryStrategy](index.GraphQLErrorPagesServiceConfig.md#retrystrategy)
- [siteName](index.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:17

___

### language

• **language**: `string`

The language

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:12

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:87

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](graphql.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:92

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:8
