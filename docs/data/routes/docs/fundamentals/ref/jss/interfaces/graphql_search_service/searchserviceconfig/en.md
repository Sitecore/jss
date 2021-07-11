---
name: searchserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: searchserviceconfig
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [graphql/search-service](/docs/fundamentals/ref/jss/modules/graphql_search_service) / SearchServiceConfig

# Interface: SearchServiceConfig

[graphql/search-service](/docs/fundamentals/ref/jss/modules/graphql_search_service).SearchServiceConfig

Configuration options for service classes that extend @see SearchQueryService.
This extends @see SearchQueryVariables because properties that can be passed to the search query
as predicates should be configurable. 'language' is excluded because, normally, all properties
except 'language' are consistent across languages so they are passed to constructors, and
'language' can vary so it is passed to methods.

## Hierarchy

- `Omit`<[`SearchQueryVariables`](/docs/fundamentals/ref/jss/modules/graphql_search_service#searchqueryvariables), ``"language"``\>

  ↳ **`SearchServiceConfig`**

  ↳↳ [`GraphQLDictionaryServiceConfig`](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig)

## Table of contents

### Properties

- [pageSize](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#pagesize)
- [rootItemId](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#rootitemid)
- [siteName](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#sitename)
- [templates](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#templates)

## Properties

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

Omit.pageSize

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

Omit.rootItemId

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

Omit.templates
