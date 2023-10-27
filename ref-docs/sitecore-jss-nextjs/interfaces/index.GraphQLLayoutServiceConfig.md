[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[index](../modules/index.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`<`GraphQLRequestClientConfig`, ``"retries"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLLayoutServiceConfig.md#apikey)
- [clientFactory](index.GraphQLLayoutServiceConfig.md#clientfactory)
- [endpoint](index.GraphQLLayoutServiceConfig.md#endpoint)
- [formatLayoutQuery](index.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](index.GraphQLLayoutServiceConfig.md#retries)
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

sitecore-jss/types/layout/graphql-layout-service.d.ts:18

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:23

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:9

___

### formatLayoutQuery

• `Optional` **formatLayoutQuery**: (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string`

#### Type declaration

▸ (`siteName`, `itemPath`, `locale?`): `string`

Override default layout query

**`Default`**

Layout query
layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")

##### Parameters

| Name | Type |
| :------ | :------ |
| `siteName` | `string` |
| `itemPath` | `string` |
| `locale?` | `string` |

##### Returns

`string`

custom layout query

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:35

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:39

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:13
