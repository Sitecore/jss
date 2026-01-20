[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:12](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L12)

## Extends

- `Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:22](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L22)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

***

### formatLayoutQuery()?

> `optional` **formatLayoutQuery**: (`siteName`, `itemPath`, `locale?`) => `string`

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:32](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L32)

Override default layout query

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` |  |
| `itemPath` | `string` |  |
| `locale?` | `string` |  |

#### Returns

`string`

custom layout query
Layout query
layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")

***

### retries?

> `optional` **retries**: `number`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/graphql-request-client.ts#L83)

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/graphql-request-client.ts#L88)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

***

### siteName

> **siteName**: `string`

Defined in: [packages/sitecore-jss/src/layout/graphql-layout-service.ts:17](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L17)

The JSS application name
