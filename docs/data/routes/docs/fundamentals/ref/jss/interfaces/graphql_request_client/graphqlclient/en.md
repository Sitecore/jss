---
name: graphqlclient
routeTemplate: ./data/component-templates/article.yml
title: graphqlclient
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [graphql-request-client](/docs/fundamentals/ref/jss/modules/graphql_request_client) / GraphQLClient

# Interface: GraphQLClient

[graphql-request-client](/docs/fundamentals/ref/jss/modules/graphql_request_client).GraphQLClient

An interface for GraphQL clients for Sitecore APIs

## Implemented by

- [`GraphQLRequestClient`](/docs/fundamentals/ref/jss/classes/graphql_request_client/graphqlrequestclient)

## Table of contents

### Methods

- [request](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient#request)

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
