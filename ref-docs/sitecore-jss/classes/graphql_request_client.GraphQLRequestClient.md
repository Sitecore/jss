[Sitecore JavaScript Rendering SDK](../README.md) / [graphql-request-client](../modules/graphql_request_client.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

[graphql-request-client](../modules/graphql_request_client.md).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

## Table of contents

### Constructors

- [constructor](graphql_request_client.GraphQLRequestClient.md#constructor)

### Properties

- [client](graphql_request_client.GraphQLRequestClient.md#client)
- [debug](graphql_request_client.GraphQLRequestClient.md#debug)
- [headers](graphql_request_client.GraphQLRequestClient.md#headers)

### Methods

- [request](graphql_request_client.GraphQLRequestClient.md#request)

## Constructors

### constructor

• **new GraphQLRequestClient**(`endpoint`, `clientConfig?`)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig` | [`GraphQLRequestClientConfig`](../modules/graphql_request_client.md#graphqlrequestclientconfig) | - |

#### Defined in

[graphql-request-client.ts:45](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/graphql-request-client.ts#L45)

## Properties

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[graphql-request-client.ts:36](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/graphql-request-client.ts#L36)

___

### debug

• `Private` **debug**: `Debugger`

#### Defined in

[graphql-request-client.ts:38](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/graphql-request-client.ts#L38)

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[graphql-request-client.ts:37](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/graphql-request-client.ts#L37)

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

[GraphQLClient](../interfaces/graphql_request_client.GraphQLClient.md).[request](../interfaces/graphql_request_client.GraphQLClient.md#request)

#### Defined in

[graphql-request-client.ts:58](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/graphql-request-client.ts#L58)
