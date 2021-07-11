---
name: searchqueryservice
routeTemplate: ./data/component-templates/article.yml
title: searchqueryservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [graphql/search-service](/docs/fundamentals/ref/jss/modules/graphql_search_service) / SearchQueryService

# Class: SearchQueryService<T\>

[graphql/search-service](/docs/fundamentals/ref/jss/modules/graphql_search_service).SearchQueryService

Provides functionality for performing GraphQL 'search' operations, including handling pagination.
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

**`mixin`**

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of objects being requested. |

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/graphql_search_service/searchqueryservice#constructor)

### Properties

- [client](/docs/fundamentals/ref/jss/classes/graphql_search_service/searchqueryservice#client)

### Methods

- [fetch](/docs/fundamentals/ref/jss/classes/graphql_search_service/searchqueryservice#fetch)

## Constructors

### constructor

• **new SearchQueryService**<`T`\>(`client`)

Creates an instance of search query service.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient) | that fetches data from a GraphQL endpoint. |

## Properties

### client

• `Protected` **client**: [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

## Methods

### fetch

▸ **fetch**(`query`, `args`): `Promise`<`T`[]\>

1. Validates mandatory search query arguments
2. Executes search query with pagination
3. Aggregates pagination results into a single result-set.

**`template`** The type of objects being requested.

**`throws`** {RangeError} if a valid root item ID is not provided.

**`throws`** {RangeError} if the provided language(s) is(are) not valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` \| `DocumentNode` | the search query. |
| `args` | [`SearchQueryVariables`](/docs/fundamentals/ref/jss/modules/graphql_search_service#searchqueryvariables) | search query arguments. |

#### Returns

`Promise`<`T`[]\>

array of result objects.
