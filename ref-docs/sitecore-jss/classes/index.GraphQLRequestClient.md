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

[src/graphql-request-client.ts:77](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L77)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[src/graphql-request-client.ts:69](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L69)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[src/graphql-request-client.ts:65](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L65)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[src/graphql-request-client.ts:67](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L67)

___

### endpoint

• `Private` **endpoint**: `string`

The Graphql endpoint

#### Defined in

[src/graphql-request-client.ts:77](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L77)

___

### headers

• `Private` **headers**: `Record`\<`string`, `string`\> = `{}`

#### Defined in

[src/graphql-request-client.ts:66](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L66)

___

### retries

• `Private` **retries**: `number`

#### Defined in

[src/graphql-request-client.ts:68](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L68)

___

### timeout

• `Private` `Optional` **timeout**: `number`

#### Defined in

[src/graphql-request-client.ts:70](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L70)

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

[src/graphql-request-client.ts:116](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L116)

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

[src/graphql-request-client.ts:103](https://github.com/Sitecore/jss/blob/f89a83100/packages/sitecore-jss/src/graphql-request-client.ts#L103)
