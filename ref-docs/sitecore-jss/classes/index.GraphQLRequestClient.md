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

- [abortController](index.GraphQLRequestClient.md#abortcontroller)
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

[graphql-request-client.ts:58](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L58)

## Properties

### abortController

• `Private` **abortController**: `AbortController`

#### Defined in

[graphql-request-client.ts:51](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L51)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[graphql-request-client.ts:47](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L47)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[graphql-request-client.ts:49](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L49)

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[graphql-request-client.ts:48](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L48)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[graphql-request-client.ts:50](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L50)

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

[graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/graphql-request-client.ts#L83)
