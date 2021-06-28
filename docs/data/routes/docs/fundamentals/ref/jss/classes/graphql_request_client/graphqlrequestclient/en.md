---
name: graphqlrequestclient
routeTemplate: ./data/component-templates/article.yml
title: graphqlrequestclient
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [graphql-request-client](/docs/fundamentals/ref/jss/modules/graphql_request_client) / GraphQLRequestClient

# Class: GraphQLRequestClient

[graphql-request-client](/docs/fundamentals/ref/jss/modules/graphql_request_client).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient#constructor)

### Properties

- [client](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient#client)
- [debug](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient#debug)
- [headers](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient#headers)

### Methods

- [request](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient#request)

## Constructors

### constructor

• **new GraphQLRequestClient**(`endpoint`, `clientConfig?`)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig` | [`GraphQLRequestClientConfig`](/docs/fundamentals/ref/jss/modules/graphql_request_client#graphqlrequestclientconfig) | - |

## Properties

### client

• `Private` **client**: `GraphQLClient`

___

### debug

• `Private` **debug**: `Debugger`

___

### headers

• `Private` **headers**: `Record`<`string`, `string`\> = `{}`

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

[GraphQLClient](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient).[request](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient#request)
