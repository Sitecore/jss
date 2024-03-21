[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[index](../modules/index.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`\<`GraphQLRequestClientConfig`, ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLLayoutServiceConfig.md#apikey)
- [clientFactory](index.GraphQLLayoutServiceConfig.md#clientfactory)
- [endpoint](index.GraphQLLayoutServiceConfig.md#endpoint)
- [formatLayoutQuery](index.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](index.GraphQLLayoutServiceConfig.md#retries)
- [retryStrategy](index.GraphQLLayoutServiceConfig.md#retrystrategy)
- [siteName](index.GraphQLLayoutServiceConfig.md#sitename)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The API key to use for authentication

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:18

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:23

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:9

___

### formatLayoutQuery

• `Optional` **formatLayoutQuery**: (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string`

#### Type declaration

▸ (`siteName`, `itemPath`, `locale?`): `string`

Override default layout query

##### Parameters

| Name | Type |
| :------ | :------ |
| `siteName` | `string` |
| `itemPath` | `string` |
| `locale?` | `string` |

##### Returns

`string`

custom layout query

**`Default`**

```ts
Layout query
layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")
```

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:35

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:87

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](graphql.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:92

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

packages/sitecore-jss/types/layout/graphql-layout-service.d.ts:13
