[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / SearchQueryResult

# Type Alias: SearchQueryResult\<T\>

> **SearchQueryResult**\<`T`\> = `object`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:22](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss/src/graphql/search-service.ts#L22)

Schema of data returned in response to a "search" query request

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of objects being requested. |

## Properties

### search

> **search**: `object`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:23](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss/src/graphql/search-service.ts#L23)

#### pageInfo

> **pageInfo**: [`PageInfo`](../interfaces/PageInfo.md)

Data needed to paginate the search results

#### results

> **results**: `T`[]
