[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[layout](../modules/layout.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`\<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [clientFactory](layout.GraphQLLayoutServiceConfig.md#clientfactory)
- [formatLayoutQuery](layout.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](layout.GraphQLLayoutServiceConfig.md#retries)
- [retryStrategy](layout.GraphQLLayoutServiceConfig.md#retrystrategy)
- [siteName](layout.GraphQLLayoutServiceConfig.md#sitename)

## Properties

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:20](https://github.com/Sitecore/jss/blob/57d228d71/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L20)

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

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:32](https://github.com/Sitecore/jss/blob/57d228d71/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L32)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:71](https://github.com/Sitecore/jss/blob/57d228d71/packages/sitecore-jss/src/graphql-request-client.ts#L71)

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](index.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:76](https://github.com/Sitecore/jss/blob/57d228d71/packages/sitecore-jss/src/graphql-request-client.ts#L76)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/layout/graphql-layout-service.ts:15](https://github.com/Sitecore/jss/blob/57d228d71/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L15)
