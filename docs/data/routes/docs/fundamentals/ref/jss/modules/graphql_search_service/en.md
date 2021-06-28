---
name: graphql_search_service
routeTemplate: ./data/component-templates/article.yml
title: graphql_search_service
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / graphql/search-service

# Module: graphql/search-service

## Table of contents

### Classes

- [SearchQueryService](/docs/fundamentals/ref/jss/classes/graphql_search_service/searchqueryservice)

### Interfaces

- [SearchServiceConfig](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig)

### Type aliases

- [SearchQueryResult](/docs/fundamentals/ref/jss/modules/graphql_search_service#searchqueryresult)
- [SearchQueryVariables](/docs/fundamentals/ref/jss/modules/graphql_search_service#searchqueryvariables)

## Type aliases

### SearchQueryResult

Ƭ **SearchQueryResult**<`T`\>: `Object`

Schema of data returned in response to a "search" query request

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of objects being requested. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `search` | `Object` |
| `search.pageInfo` | `Object` |
| `search.pageInfo.endCursor` | `string` |
| `search.pageInfo.hasNext` | `boolean` |
| `search.results` | `T`[] |

___

### SearchQueryVariables

Ƭ **SearchQueryVariables**: `Object`

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | Required. The language versions to search for. Fetch pages that have versions in this language. |
| `pageSize?` | `number` | Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.  **`default`** 10 |
| `rootItemId?` | `string` | Optional. The ID of the search root item. Fetch items that have this item as an ancestor. |
| `templates?` | `string` | Optional. Sitecore template ID(s). Fetch items that inherit from this template(s). |
