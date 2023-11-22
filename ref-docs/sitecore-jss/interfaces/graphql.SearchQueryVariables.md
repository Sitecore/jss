[@sitecore-jss/sitecore-jss](../README.md) / [graphql](../modules/graphql.md) / SearchQueryVariables

# Interface: SearchQueryVariables

[graphql](../modules/graphql.md).SearchQueryVariables

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

## Table of contents

### Properties

- [language](graphql.SearchQueryVariables.md#language)
- [pageSize](graphql.SearchQueryVariables.md#pagesize)
- [rootItemId](graphql.SearchQueryVariables.md#rootitemid)
- [templates](graphql.SearchQueryVariables.md#templates)

## Properties

### language

• **language**: `string`

Required. The language versions to search for. Fetch pages that have versions in this language.

#### Defined in

[src/graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss/src/graphql/search-service.ts#L43)

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

10

#### Defined in

[src/graphql/search-service.ts:60](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss/src/graphql/search-service.ts#L60)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Defined in

[src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss/src/graphql/search-service.ts#L48)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Defined in

[src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/44427ed6d/packages/sitecore-jss/src/graphql/search-service.ts#L53)
