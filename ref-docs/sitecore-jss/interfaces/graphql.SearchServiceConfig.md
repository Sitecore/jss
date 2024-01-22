[@sitecore-jss/sitecore-jss](../README.md) / [graphql](../modules/graphql.md) / SearchServiceConfig

# Interface: SearchServiceConfig

[graphql](../modules/graphql.md).SearchServiceConfig

Configuration options for service classes that extend

**`See`**

 - SearchQueryService.
This extends
 - SearchQueryVariables because properties that can be passed to the search query
as predicates should be configurable. 'language' is excluded because, normally, all properties
except 'language' are consistent across languages so they are passed to constructors, and
'language' can vary so it is passed to methods.

## Hierarchy

- `Omit`\<[`SearchQueryVariables`](graphql.SearchQueryVariables.md), ``"language"``\>

  ↳ **`SearchServiceConfig`**

  ↳↳ [`GraphQLDictionaryServiceConfig`](i18n.GraphQLDictionaryServiceConfig.md)

## Table of contents

### Properties

- [pageSize](graphql.SearchServiceConfig.md#pagesize)
- [rootItemId](graphql.SearchServiceConfig.md#rootitemid)
- [siteName](graphql.SearchServiceConfig.md#sitename)
- [templates](graphql.SearchServiceConfig.md#templates)

## Properties

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

```ts
10
```

#### Inherited from

Omit.pageSize

#### Defined in

[src/graphql/search-service.ts:60](https://github.com/Sitecore/jss/blob/6b42a3100/packages/sitecore-jss/src/graphql/search-service.ts#L60)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

Omit.rootItemId

#### Defined in

[src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/6b42a3100/packages/sitecore-jss/src/graphql/search-service.ts#L48)

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Defined in

[src/graphql/search-service.ts:75](https://github.com/Sitecore/jss/blob/6b42a3100/packages/sitecore-jss/src/graphql/search-service.ts#L75)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

Omit.templates

#### Defined in

[src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/6b42a3100/packages/sitecore-jss/src/graphql/search-service.ts#L53)
