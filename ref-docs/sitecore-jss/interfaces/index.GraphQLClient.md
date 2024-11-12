[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / GraphQLClient

# Interface: GraphQLClient

[index](../modules/index.md).GraphQLClient

An interface for GraphQL clients for Sitecore APIs

## Implemented by

- [`GraphQLRequestClient`](../classes/index.GraphQLRequestClient.md)

## Table of contents

### Methods

- [request](index.GraphQLClient.md#request)

## Methods

### request

▸ **request**\<`T`\>(`query`, `variables?`, `options?`): `Promise`\<`T`\>

Execute graphql request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` \| `DocumentNode` | graphql query |
| `variables?` | `Object` | graphql variables |
| `options?` | `RequestOptions` | options for configuring a GraphQL request. |

#### Returns

`Promise`\<`T`\>

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:24](https://github.com/Sitecore/jss/blob/6788e82f0/packages/sitecore-jss/src/graphql-request-client.ts#L24)
