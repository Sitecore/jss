[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

[index](../modules/index.md).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

## Table of contents

### Constructors

- [constructor](index.GraphQLRequestClient.md#constructor)

### Properties

- [abortTimeout](index.GraphQLRequestClient.md#aborttimeout)
- [client](index.GraphQLRequestClient.md#client)
- [debug](index.GraphQLRequestClient.md#debug)
- [headers](index.GraphQLRequestClient.md#headers)
- [timeout](index.GraphQLRequestClient.md#timeout)

### Methods

- [request](index.GraphQLRequestClient.md#request)

## Constructors

### constructor

• **new GraphQLRequestClient**(`endpoint`, `clientConfig?`)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig` | [`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig) | - |

#### Defined in

[src/graphql-request-client.ts:57](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L57)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[src/graphql-request-client.ts:49](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L49)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[src/graphql-request-client.ts:46](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L46)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[src/graphql-request-client.ts:48](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L48)

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/graphql-request-client.ts:47](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L47)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[src/graphql-request-client.ts:50](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L50)

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

[GraphQLClient](../interfaces/index.GraphQLClient.md).[request](../interfaces/index.GraphQLClient.md#request)

#### Defined in

[src/graphql-request-client.ts:81](https://github.com/Sitecore/jss/blob/84407752e/packages/sitecore-jss/src/graphql-request-client.ts#L81)
