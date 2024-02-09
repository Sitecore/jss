[@sitecore-jss/sitecore-jss-nextjs](../README.md) / graphql

# Module: graphql

## Table of contents

### Classes

- [DefaultRetryStrategy](../classes/graphql.DefaultRetryStrategy.md)
- [GraphQLRequestClient](../classes/graphql.GraphQLRequestClient.md)

### Interfaces

- [RetryStrategy](../interfaces/graphql.RetryStrategy.md)

### Type Aliases

- [GraphQLRequestClientFactory](graphql.md#graphqlrequestclientfactory)
- [GraphQLRequestClientFactoryConfig](graphql.md#graphqlrequestclientfactoryconfig)

### Functions

- [getEdgeProxyContentUrl](graphql.md#getedgeproxycontenturl)

## Type Aliases

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

sitecore-jss/types/graphql-request-client.d.ts:73

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

sitecore-jss/types/graphql-request-client.d.ts:77

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
