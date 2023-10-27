[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

[index](../modules/index.md).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

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
| `clientConfig?` | `GraphQLRequestClientConfig` | GraphQL request client configuration. |

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:72

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:65

___

### client

• `Private` **client**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:61

___

### debug

• `Private` **debug**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:63

___

### endpoint

• `Private` **endpoint**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:60

___

### headers

• `Private` **headers**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:62

___

### retries

• `Private` **retries**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:64

___

### timeout

• `Private` `Optional` **timeout**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:66

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

GraphQLClient.request

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:85

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

sitecore-jss/types/graphql-request-client.d.ts:79
