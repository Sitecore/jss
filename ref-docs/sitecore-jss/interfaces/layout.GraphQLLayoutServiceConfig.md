[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[layout](../modules/layout.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`\<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [apiKey](layout.GraphQLLayoutServiceConfig.md#apikey)
- [clientFactory](layout.GraphQLLayoutServiceConfig.md#clientfactory)
- [endpoint](layout.GraphQLLayoutServiceConfig.md#endpoint)
- [formatLayoutQuery](layout.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](layout.GraphQLLayoutServiceConfig.md#retries)
- [retryStrategy](layout.GraphQLLayoutServiceConfig.md#retrystrategy)
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

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:26](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L26)

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:31](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L31)

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:17](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L17)

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

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:43](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L43)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:71](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/graphql-request-client.ts#L71)

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](index.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:76](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/graphql-request-client.ts#L76)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:21](https://github.com/Sitecore/jss/blob/53b548ace/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L21)
