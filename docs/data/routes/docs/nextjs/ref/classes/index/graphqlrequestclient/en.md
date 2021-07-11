---
name: graphqlrequestclient
routeTemplate: ./data/component-templates/article.yml
title: graphqlrequestclient
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / GraphQLRequestClient

# Class: GraphQLRequestClient

[index](/docs/nextjs/ref/modules/index).GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/graphqlrequestclient#constructor)

### Properties

- [client](/docs/nextjs/ref/classes/index/graphqlrequestclient#client)
- [debug](/docs/nextjs/ref/classes/index/graphqlrequestclient#debug)
- [endpoint](/docs/nextjs/ref/classes/index/graphqlrequestclient#endpoint)
- [headers](/docs/nextjs/ref/classes/index/graphqlrequestclient#headers)

### Methods

- [request](/docs/nextjs/ref/classes/index/graphqlrequestclient#request)

## Constructors

### constructor

• **new GraphQLRequestClient**(`endpoint`, `clientConfig?`)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig?` | `GraphQLRequestClientConfig` | - |

## Properties

### client

• `Private` **client**: `any`

___

### debug

• `Private` **debug**: `any`

___

### endpoint

• `Private` **endpoint**: `any`

___

### headers

• `Private` **headers**: `any`

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
