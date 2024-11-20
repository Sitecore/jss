[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

## Extends

- `Pick`\<`GraphQLRequestClientConfig`, `"retries"` \| `"retryStrategy"`\>

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:14

***

### formatLayoutQuery()?

> `optional` **formatLayoutQuery**: (`siteName`, `itemPath`, `locale`?) => `string`

Override default layout query

#### Parameters

• **siteName**: `string`

• **itemPath**: `string`

• **locale?**: `string`

#### Returns

`string`

custom layout query
Layout query
layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:24

***

### retries?

> `optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:74

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../graphql/interfaces/RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:79

***

### siteName

> **siteName**: `string`

The JSS application name

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:9
