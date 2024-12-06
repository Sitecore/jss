[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchServiceConfig

# Interface: ~~SearchServiceConfig~~

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

> `optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

#### Inherited from

`Omit.pageSize`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L61)

***

### ~~rootItemId?~~

> `optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

`Omit.rootItemId`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L48)

***

### ~~siteName~~

> **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:77](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L77)

***

### ~~templates?~~

> `optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

`Omit.templates`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/fb8998247eef17ee53f447fd1710b29e1df03c4e/packages/sitecore-jss/src/graphql/search-service.ts#L53)
