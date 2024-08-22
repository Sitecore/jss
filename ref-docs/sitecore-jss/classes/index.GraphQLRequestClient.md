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

[packages/sitecore-jss/src/graphql-request-client.ts:165](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L165)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:155](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L155)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:152](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L152)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:154](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L154)

___

### endpoint

• `Private` **endpoint**: `string`

The Graphql endpoint

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:165](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L165)

___

### headers

• `Private` **headers**: `Record`\<`string`, `string`\> = `{}`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:153](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L153)

___

### retries

• `Private` **retries**: `number`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:157](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L157)

___

### retryStrategy

• `Private` **retryStrategy**: [`RetryStrategy`](../interfaces/index.RetryStrategy.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:158](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L158)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:156](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L156)

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

[packages/sitecore-jss/src/graphql-request-client.ts:211](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L211)

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

[packages/sitecore-jss/src/graphql-request-client.ts:198](https://github.com/Sitecore/jss/blob/1b68e94e9/packages/sitecore-jss/src/graphql-request-client.ts#L198)
