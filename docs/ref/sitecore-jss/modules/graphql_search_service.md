[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / graphql/search-service

# Module: graphql/search-service

## Table of contents

### Classes

- [SearchQueryService](../classes/graphql_search_service.SearchQueryService.md)

### Interfaces

- [SearchServiceConfig](../interfaces/graphql_search_service.SearchServiceConfig.md)

### Type aliases

- [SearchQueryResult](graphql_search_service.md#searchqueryresult)
- [SearchQueryVariables](graphql_search_service.md#searchqueryvariables)

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

#### Defined in

[graphql/search-service.ts:8](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/graphql/search-service.ts#L8)

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

#### Defined in

[graphql/search-service.ts:34](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/graphql/search-service.ts#L34)
