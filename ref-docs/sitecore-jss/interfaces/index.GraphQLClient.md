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

▸ **request**<`T`\>(`query`, `variables?`): `Promise`<`T`\>

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

#### Returns

`Promise`<`T`\>

#### Defined in

[src/graphql-request-client.ts:16](https://github.com/Sitecore/jss/blob/e853e9616/packages/sitecore-jss/src/graphql-request-client.ts#L16)
