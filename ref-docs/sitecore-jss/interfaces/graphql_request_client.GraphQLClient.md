[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [graphql-request-client](../modules/graphql_request_client.md) / GraphQLClient

# Interface: GraphQLClient

[graphql-request-client](../modules/graphql_request_client.md).GraphQLClient

An interface for GraphQL clients for Sitecore APIs

## Implemented by

- [`GraphQLRequestClient`](../classes/graphql_request_client.GraphQLRequestClient.md)

## Table of contents

### Methods

- [request](graphql_request_client.GraphQLClient.md#request)

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

[graphql-request-client.ts:14](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/graphql-request-client.ts#L14)
