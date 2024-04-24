[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [graphql](../modules/graphql.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

[graphql](../modules/graphql.md).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

## Table of contents

### Constructors

- [constructor](graphql.GraphQLRequestClient.md#constructor)

### Properties

- [abortTimeout](graphql.GraphQLRequestClient.md#aborttimeout)
- [client](graphql.GraphQLRequestClient.md#client)
- [debug](graphql.GraphQLRequestClient.md#debug)
- [endpoint](graphql.GraphQLRequestClient.md#endpoint)
- [headers](graphql.GraphQLRequestClient.md#headers)
- [retries](graphql.GraphQLRequestClient.md#retries)
- [retryStrategy](graphql.GraphQLRequestClient.md#retrystrategy)
- [timeout](graphql.GraphQLRequestClient.md#timeout)

### Methods

- [request](graphql.GraphQLRequestClient.md#request)
- [createClientFactory](graphql.GraphQLRequestClient.md#createclientfactory)

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

sitecore-jss/types/graphql-request-client.d.ts:129

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:120

___

### client

• `Private` **client**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:117

___

### debug

• `Private` **debug**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:119

___

### endpoint

• `Private` **endpoint**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:116

___

### headers

• `Private` **headers**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:118

___

### retries

• `Private` **retries**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:122

___

### retryStrategy

• `Private` **retryStrategy**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:123

___

### timeout

• `Private` `Optional` **timeout**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:121

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

GraphQLClient.request

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:142

___

### createClientFactory

▸ `Static` **createClientFactory**(`config`): [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../modules/graphql.md#graphqlrequestclientfactoryconfig) | client configuration options. |

#### Returns

[`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:136
