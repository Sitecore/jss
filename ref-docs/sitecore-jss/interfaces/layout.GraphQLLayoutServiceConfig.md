[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / GraphQLLayoutServiceConfig

# Interface: GraphQLLayoutServiceConfig

[layout](../modules/layout.md).GraphQLLayoutServiceConfig

## Hierarchy

- `Pick`<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"``\>

  ↳ **`GraphQLLayoutServiceConfig`**

## Table of contents

### Properties

- [apiKey](layout.GraphQLLayoutServiceConfig.md#apikey)
- [endpoint](layout.GraphQLLayoutServiceConfig.md#endpoint)
- [formatLayoutQuery](layout.GraphQLLayoutServiceConfig.md#formatlayoutquery)
- [retries](layout.GraphQLLayoutServiceConfig.md#retries)
- [siteName](layout.GraphQLLayoutServiceConfig.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication

#### Defined in

[src/layout/graphql-layout-service.ts:22](https://github.com/Sitecore/jss/blob/c30972e72/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L22)

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

[src/layout/graphql-layout-service.ts:14](https://github.com/Sitecore/jss/blob/c30972e72/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L14)

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

[src/layout/graphql-layout-service.ts:34](https://github.com/Sitecore/jss/blob/c30972e72/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L34)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

[src/graphql-request-client.ts:42](https://github.com/Sitecore/jss/blob/c30972e72/packages/sitecore-jss/src/graphql-request-client.ts#L42)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[src/layout/graphql-layout-service.ts:18](https://github.com/Sitecore/jss/blob/c30972e72/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L18)
