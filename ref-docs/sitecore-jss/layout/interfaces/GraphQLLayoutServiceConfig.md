[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

## Extends

- `Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:22](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L22)

***

### formatLayoutQuery()?

> `optional` **formatLayoutQuery**: (`siteName`, `itemPath`, `locale`?) => `string`

Override default layout query

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` |  |
| `itemPath` | `string` |  |
| `locale`? | `string` |  |

#### Returns

`string`

custom layout query
Layout query
layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:32](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L32)

***

### retries?

> `optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss/src/graphql-request-client.ts#L83)

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss/src/graphql-request-client.ts#L88)

***

### siteName

> **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:17](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L17)
