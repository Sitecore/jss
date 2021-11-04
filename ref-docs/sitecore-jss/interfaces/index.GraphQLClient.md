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

[graphql-request-client.ts:15](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss/src/graphql-request-client.ts#L15)
