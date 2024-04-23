[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[site](../modules/site.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`\<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [clientFactory](site.GraphQLErrorPagesServiceConfig.md#clientfactory)
- [language](site.GraphQLErrorPagesServiceConfig.md#language)
- [retries](site.GraphQLErrorPagesServiceConfig.md#retries)
- [retryStrategy](site.GraphQLErrorPagesServiceConfig.md#retrystrategy)
- [siteName](site.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:41](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L41)

___

### language

• **language**: `string`

The language

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:36](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L36)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:71](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss/src/graphql-request-client.ts#L71)

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](index.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:76](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss/src/graphql-request-client.ts#L76)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:32](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L32)
