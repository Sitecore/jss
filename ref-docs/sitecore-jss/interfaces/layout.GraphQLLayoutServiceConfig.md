[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[layout](../modules/layout.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [apiKey](layout.GraphQLLayoutServiceConfig.md#apikey)
- [clientFactory](layout.GraphQLLayoutServiceConfig.md#clientfactory)
- [endpoint](layout.GraphQLLayoutServiceConfig.md#endpoint)
- [formatLayoutQuery](layout.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](layout.GraphQLLayoutServiceConfig.md#retries)
- [siteName](layout.GraphQLLayoutServiceConfig.md#sitename)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The API key to use for authentication

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

[src/layout/graphql-layout-service.ts:25](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L25)

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[src/layout/graphql-layout-service.ts:30](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L30)

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

[src/layout/graphql-layout-service.ts:16](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L16)

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

[src/layout/graphql-layout-service.ts:42](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L42)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

[src/graphql-request-client.ts:42](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/graphql-request-client.ts#L42)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[src/layout/graphql-layout-service.ts:20](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L20)
