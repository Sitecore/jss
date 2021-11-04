[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / GraphQLClient

# Interface: GraphQLClient

An interface for GraphQL clients for Sitecore APIs

## Implemented by

- [`GraphQLRequestClient`](../classes/GraphQLRequestClient.md)

## Table of contents

### Methods

- [request](GraphQLClient.md#request)

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

[graphql-request-client.ts:14](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql-request-client.ts#L14)
