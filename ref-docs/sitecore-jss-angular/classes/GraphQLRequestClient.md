[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

## Table of contents

### Constructors

- [constructor](GraphQLRequestClient.md#constructor)

### Properties

- [abortTimeout](GraphQLRequestClient.md#aborttimeout)
- [client](GraphQLRequestClient.md#client)
- [debug](GraphQLRequestClient.md#debug)
- [endpoint](GraphQLRequestClient.md#endpoint)
- [headers](GraphQLRequestClient.md#headers)
- [retries](GraphQLRequestClient.md#retries)
- [retryStrategy](GraphQLRequestClient.md#retrystrategy)
- [timeout](GraphQLRequestClient.md#timeout)

### Methods

- [request](GraphQLRequestClient.md#request)
- [createClientFactory](GraphQLRequestClient.md#createclientfactory)

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

packages/sitecore-jss/types/graphql-request-client.d.ts:149

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:140

___

### client

• `Private` **client**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:137

___

### debug

• `Private` **debug**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:139

___

### endpoint

• `Private` **endpoint**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:136

___

### headers

• `Private` **headers**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:138

___

### retries

• `Private` **retries**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:142

___

### retryStrategy

• `Private` **retryStrategy**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:143

___

### timeout

• `Private` `Optional` **timeout**: `any`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:141

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

packages/sitecore-jss/types/graphql-request-client.d.ts:162

___

### createClientFactory

▸ `Static` **createClientFactory**(`config`): `GraphQLRequestClientFactory`

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../README.md#graphqlrequestclientfactoryconfig) | client configuration options. |

#### Returns

`GraphQLRequestClientFactory`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:156
