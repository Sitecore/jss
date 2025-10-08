[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryVariables

# Interface: SearchQueryVariables

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:39](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/graphql/search-service.ts#L39)

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

## Properties

### language

> **language**: `string`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/graphql/search-service.ts#L43)

Required. The language versions to search for. Fetch pages that have versions in this language.

***

### pageSize?

> `optional` **pageSize**: `number`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/graphql/search-service.ts#L61)

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

***

### rootItemId?

> `optional` **rootItemId**: `string`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/graphql/search-service.ts#L48)

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

***

### templates?

> `optional` **templates**: `string`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss/src/graphql/search-service.ts#L53)

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).
