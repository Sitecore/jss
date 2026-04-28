[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchServiceConfig

# ~~Interface: SearchServiceConfig~~

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:72](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L72)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:72](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L72)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Deprecated

will be removed with SearchQueryService. Use GraphQLClient and supporting types
Configuration options for service classes that extend

## See

 - SearchQueryService.
This extends
 - SearchQueryVariables because properties that can be passed to the search query
as predicates should be configurable. 'language' is excluded because, normally, all properties
except 'language' are consistent across languages so they are passed to constructors, and
'language' can vary so it is passed to methods.

## Extends

- `Omit`\<[`SearchQueryVariables`](SearchQueryVariables.md), `"language"`\>

## Properties

### ~~pageSize?~~

> `optional` **pageSize?**: `number`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L61)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L61)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

#### Inherited from

[`SearchQueryVariables`](SearchQueryVariables.md).[`pageSize`](SearchQueryVariables.md#pagesize)

***

### ~~rootItemId?~~

> `optional` **rootItemId?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L48)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

[`SearchQueryVariables`](SearchQueryVariables.md).[`rootItemId`](SearchQueryVariables.md#rootitemid)

***

### ~~siteName~~

> **siteName**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:77](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L77)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:77](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L77)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

***

### ~~templates?~~

> `optional` **templates?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L53)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L53)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

[`SearchQueryVariables`](SearchQueryVariables.md).[`templates`](SearchQueryVariables.md#templates)
