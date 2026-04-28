[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryService

# ~~Class: SearchQueryService\<T\>~~

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:87](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L87)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:87](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L87)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### Constructor

> **new SearchQueryService**\<`T`\>(`client`): `SearchQueryService`\<`T`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L92)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L92)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Creates an instance of search query service.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`GraphQLClient`](../../index/interfaces/GraphQLClient.md) | that fetches data from a GraphQL endpoint. |

#### Returns

`SearchQueryService`\<`T`\>

## Properties

### ~~client~~

> `protected` **client**: [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L92)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:92](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L92)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

that fetches data from a GraphQL endpoint.

## Methods

### ~~fetch()~~

> **fetch**(`query`, `args`): `Promise`\<`T`[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:105](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L105)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:105](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L105)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
