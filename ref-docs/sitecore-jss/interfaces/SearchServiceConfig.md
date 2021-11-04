[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / SearchServiceConfig

# Interface: SearchServiceConfig

Configuration options for service classes that extend @see SearchQueryService.
This extends @see SearchQueryVariables because properties that can be passed to the search query
as predicates should be configurable. 'language' is excluded because, normally, all properties
except 'language' are consistent across languages so they are passed to constructors, and
'language' can vary so it is passed to methods.

## Hierarchy

- `Omit`<[`SearchQueryVariables`](../README.md#searchqueryvariables), ``"language"``\>

  ↳ **`SearchServiceConfig`**

  ↳↳ [`GraphQLDictionaryServiceConfig`](GraphQLDictionaryServiceConfig.md)

## Table of contents

### Properties

- [pageSize](SearchServiceConfig.md#pagesize)
- [rootItemId](SearchServiceConfig.md#rootitemid)
- [siteName](SearchServiceConfig.md#sitename)
- [templates](SearchServiceConfig.md#templates)

## Properties

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

Omit.pageSize

#### Defined in

[graphql/search-service.ts:49](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L49)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

Omit.rootItemId

#### Defined in

[graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L43)

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Defined in

[graphql/search-service.ts:69](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L69)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

Omit.templates

#### Defined in

[graphql/search-service.ts:54](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L54)
