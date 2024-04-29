[@sitecore-jss/sitecore-jss-nextjs](../README.md) / graphql

# Module: graphql

## Table of contents

### Classes

- [DefaultRetryStrategy](../classes/graphql.DefaultRetryStrategy.md)
- [GraphQLRequestClient](../classes/graphql.GraphQLRequestClient.md)

### Interfaces

- [RetryStrategy](../interfaces/graphql.RetryStrategy.md)

### Type Aliases

- [GraphQLClientError](graphql.md#graphqlclienterror)
- [GraphQLRequestClientFactory](graphql.md#graphqlrequestclientfactory)
- [GraphQLRequestClientFactoryConfig](graphql.md#graphqlrequestclientfactoryconfig)

### Functions

- [getEdgeProxyContentUrl](graphql.md#getedgeproxycontenturl)

## Type Aliases

### GraphQLClientError

Ƭ **GraphQLClientError**: `Partial`\<`ClientError`\> & \{ `code?`: `string`  }

This type represents errors that can occur in a GraphQL client.
In cases where an error status was sent back from the server (`!response.ok`), the `response` will be populated with details. In cases where a response was never received, the `code` can be populated with the error code (e.g. Node's 'ECONNRESET', 'ETIMEDOUT', etc).

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:21

___

### GraphQLRequestClientFactory

Ƭ **GraphQLRequestClientFactory**: (`config`: `Omit`\<`GraphQLRequestClientConfig`, ``"apiKey"``\>) => [`GraphQLRequestClient`](../classes/graphql.GraphQLRequestClient.md)

#### Type declaration

▸ (`config`): [`GraphQLRequestClient`](../classes/graphql.GraphQLRequestClient.md)

A GraphQL Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Omit`\<`GraphQLRequestClientConfig`, ``"apiKey"``\> | The configuration object that specifies how the GraphQL client should be set up. |

##### Returns

[`GraphQLRequestClient`](../classes/graphql.GraphQLRequestClient.md)

An instance of a GraphQL Request Client ready to send GraphQL requests.

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:80

___

### GraphQLRequestClientFactoryConfig

Ƭ **GraphQLRequestClientFactoryConfig**: `Object`

Configuration type for

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apiKey?` | `string` |
| `endpoint` | `string` |

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:84

## Functions

### getEdgeProxyContentUrl

▸ **getEdgeProxyContentUrl**(`sitecoreEdgeContextId`, `sitecoreEdgeUrl?`): `string`

Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sitecoreEdgeContextId` | `string` | The unique context id. |
| `sitecoreEdgeUrl?` | `string` | The base endpoint URL for the Edge Platform. Default is https://edge-platform.sitecorecloud.io |

#### Returns

`string`

The complete URL for accessing content through the Edge Platform.

#### Defined in

sitecore-jss/types/graphql/graphql-edge-proxy.d.ts:7
