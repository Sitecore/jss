[@sitecore-jss/sitecore-jss](../README.md) / [graphql](../modules/graphql.md) / SearchQueryService

# Class: SearchQueryService<T\>

[graphql](../modules/graphql.md).SearchQueryService

Provides functionality for performing GraphQL 'search' operations, including handling pagination.
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

**`Mixin`**

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of objects being requested. |

## Table of contents

### Constructors

- [constructor](graphql.SearchQueryService.md#constructor)

### Properties

- [client](graphql.SearchQueryService.md#client)

### Methods

- [fetch](graphql.SearchQueryService.md#fetch)

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
| `client` | [`GraphQLClient`](../interfaces/index.GraphQLClient.md) | that fetches data from a GraphQL endpoint. |

#### Defined in

[src/graphql/search-service.ts:89](https://github.com/Sitecore/jss/blob/4f2bbb4bf/packages/sitecore-jss/src/graphql/search-service.ts#L89)

## Properties

### client

• `Protected` **client**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

that fetches data from a GraphQL endpoint.

#### Defined in

[src/graphql/search-service.ts:89](https://github.com/Sitecore/jss/blob/4f2bbb4bf/packages/sitecore-jss/src/graphql/search-service.ts#L89)

## Methods

### fetch

▸ **fetch**(`query`, `args`): `Promise`<`T`[]\>

1. Validates mandatory search query arguments
2. Executes search query with pagination
3. Aggregates pagination results into a single result-set.

**`Throws`**

if a valid root item ID is not provided.

**`Throws`**

if the provided language(s) is(are) not valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` \| `DocumentNode` | the search query. |
| `args` | [`SearchQueryVariables`](../interfaces/graphql.SearchQueryVariables.md) | search query arguments. |

#### Returns

`Promise`<`T`[]\>

array of result objects.

#### Defined in

[src/graphql/search-service.ts:102](https://github.com/Sitecore/jss/blob/4f2bbb4bf/packages/sitecore-jss/src/graphql/search-service.ts#L102)
