[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryVariables

# Interface: SearchQueryVariables

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

## Properties

### language

> **language**: `string`

Required. The language versions to search for. Fetch pages that have versions in this language.

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L43)

***

### pageSize?

> `optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L61)

***

### rootItemId?

> `optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L48)

***

### templates?

> `optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L53)
