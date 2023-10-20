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
- [endpoint](index.GraphQLRequestClient.md#endpoint)
- [headers](index.GraphQLRequestClient.md#headers)
- [retries](index.GraphQLRequestClient.md#retries)
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
| `clientConfig?` | [`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig) | GraphQL request client configuration. |

#### Defined in

[src/graphql-request-client.ts:62](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L62)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[src/graphql-request-client.ts:54](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L54)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[src/graphql-request-client.ts:50](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L50)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[src/graphql-request-client.ts:52](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L52)

___

### endpoint

• `Private` **endpoint**: `string`

The Graphql endpoint

#### Defined in

[src/graphql-request-client.ts:62](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L62)

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/graphql-request-client.ts:51](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L51)

___

### retries

• `Private` **retries**: `number`

#### Defined in

[src/graphql-request-client.ts:53](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L53)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[src/graphql-request-client.ts:55](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L55)

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

[src/graphql-request-client.ts:87](https://github.com/Sitecore/jss/blob/aa3ad840e/packages/sitecore-jss/src/graphql-request-client.ts#L87)
