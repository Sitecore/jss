[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryResult

# Type Alias: SearchQueryResult\<T\>

> **SearchQueryResult**\<`T`\>: `object`

Schema of data returned in response to a "search" query request

## Type Parameters

• **T**

The type of objects being requested.

## Type declaration

### search

> **search**: `object`

### search.pageInfo

> **pageInfo**: [`PageInfo`](../interfaces/PageInfo.md)

Data needed to paginate the search results

### search.results

> **results**: `T`[]

## Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:22](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql/search-service.ts#L22)
