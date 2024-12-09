[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

## Constructors

### new GraphQLSiteInfoService()

> **new GraphQLSiteInfoService**(`config`): [`GraphQLSiteInfoService`](GraphQLSiteInfoService.md)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLSiteInfoServiceConfig`](../type-aliases/GraphQLSiteInfoServiceConfig.md) | instance |

#### Returns

[`GraphQLSiteInfoService`](GraphQLSiteInfoService.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:72](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L72)

## Accessors

### siteQuery

#### Get Signature

> **get** `protected` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:80](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L80)

## Methods

### fetchSiteInfo()

> **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:84](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L84)

***

### fetchWithSiteQuery()

> `protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:100](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L100)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:121](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L121)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:134](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L134)
