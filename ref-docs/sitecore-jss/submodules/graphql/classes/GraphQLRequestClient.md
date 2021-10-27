[@sitecore-jss/sitecore-jss](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/GraphQLClient.md)

## Table of contents

### Constructors

- [constructor](GraphQLRequestClient.md#constructor)

### Properties

- [client](GraphQLRequestClient.md#client)
- [debug](GraphQLRequestClient.md#debug)
- [headers](GraphQLRequestClient.md#headers)

### Methods

- [request](GraphQLRequestClient.md#request)

## Constructors

### constructor

• **new GraphQLRequestClient**(`endpoint`, `clientConfig?`)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig` | [`GraphQLRequestClientConfig`](../README.md#graphqlrequestclientconfig) | - |

#### Defined in

[graphql-request-client.ts:46](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L46)

## Properties

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[graphql-request-client.ts:37](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L37)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[graphql-request-client.ts:39](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L39)

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[graphql-request-client.ts:38](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L38)

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

#### Implementation of

[GraphQLClient](../interfaces/GraphQLClient.md).[request](../interfaces/GraphQLClient.md#request)

#### Defined in

[graphql-request-client.ts:66](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L66)
