[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryService

# Class: ~~SearchQueryService\<T\>~~

## Deprecated

use GraphQLClient instead
Provides functionality for performing GraphQL 'search' operations, including handling pagination.
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

## Mixin

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of objects being requested. |

## Constructors

### new SearchQueryService()

> **new SearchQueryService**\<`T`\>(`client`): [`SearchQueryService`](SearchQueryService.md)\<`T`\>

Creates an instance of search query service.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`GraphQLClient`](../../index/interfaces/GraphQLClient.md) | that fetches data from a GraphQL endpoint. |

#### Returns

[`SearchQueryService`](SearchQueryService.md)\<`T`\>

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/410baa3185964545d070498517cd670bf4efc6d5/packages/sitecore-jss/src/graphql/search-service.ts#L92)

## Properties

### ~~client~~

> `protected` **client**: [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

that fetches data from a GraphQL endpoint.

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/410baa3185964545d070498517cd670bf4efc6d5/packages/sitecore-jss/src/graphql/search-service.ts#L92)

## Methods

### ~~fetch()~~

> **fetch**(`query`, `args`): `Promise`\<`T`[]\>

1. Validates mandatory search query arguments
2. Executes search query with pagination
3. Aggregates pagination results into a single result-set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` \| `DocumentNode` | the search query. |
| `args` | [`SearchQueryVariables`](../interfaces/SearchQueryVariables.md) | search query arguments. |

#### Returns

`Promise`\<`T`[]\>

array of result objects.

#### Throws

if a valid root item ID is not provided.

#### Throws

if the provided language(s) is(are) not valid.

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:105](https://github.com/Sitecore/jss/blob/410baa3185964545d070498517cd670bf4efc6d5/packages/sitecore-jss/src/graphql/search-service.ts#L105)
