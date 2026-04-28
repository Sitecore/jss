[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryVariables

# Interface: SearchQueryVariables

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:39](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L39)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:39](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L39)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

## Properties

### language

> **language**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L43)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Required. The language versions to search for. Fetch pages that have versions in this language.

***

### pageSize?

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

***

### rootItemId?

> `optional` **rootItemId?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L48)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

***

### templates?

> `optional` **templates?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql/search-service.ts#L53)
=======
Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql/search-service.ts#L53)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).
