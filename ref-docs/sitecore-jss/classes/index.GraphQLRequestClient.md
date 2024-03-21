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
- [retryStrategy](index.GraphQLRequestClient.md#retrystrategy)
- [timeout](index.GraphQLRequestClient.md#timeout)

### Methods

- [request](index.GraphQLRequestClient.md#request)
- [createClientFactory](index.GraphQLRequestClient.md#createclientfactory)

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

[packages/sitecore-jss/src/graphql-request-client.ts:181](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L181)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:171](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L171)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:168](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L168)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:170](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L170)

___

### endpoint

• `Private` **endpoint**: `string`

The Graphql endpoint

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:181](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L181)

___

### headers

• `Private` **headers**: `Record`\<`string`, `string`\> = `{}`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:169](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L169)

___

### retries

• `Private` **retries**: `number`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:173](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L173)

___

### retryStrategy

• `Private` **retryStrategy**: [`RetryStrategy`](../interfaces/index.RetryStrategy.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:174](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L174)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:172](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L172)

## Methods

### request

▸ **request**\<`T`\>(`query`, `variables?`): `Promise`\<`T`\>

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

`Promise`\<`T`\>

#### Implementation of

[GraphQLClient](../interfaces/index.GraphQLClient.md).[request](../interfaces/index.GraphQLClient.md#request)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:223](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L223)

___

### createClientFactory

▸ `Static` **createClientFactory**(`config`): [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../modules/index.md#graphqlrequestclientfactoryconfig) | client configuration options. |

#### Returns

[`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/f7cd258f4/packages/sitecore-jss/src/graphql-request-client.ts#L210)
