[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:5

## Extends

- `Pick`\<`GraphQLRequestClientConfig`, `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:14

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

***

### formatLayoutQuery()?

> `optional` **formatLayoutQuery**: (`siteName`, `itemPath`, `locale?`) => `string`

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:24

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

Defined in: sitecore-jss/types/graphql-request-client.d.ts:74

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../graphql/interfaces/RetryStrategy.md)

Defined in: sitecore-jss/types/graphql-request-client.d.ts:79

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

***

### siteName

> **siteName**: `string`

Defined in: sitecore-jss/types/layout/graphql-layout-service.d.ts:9

The JSS application name
