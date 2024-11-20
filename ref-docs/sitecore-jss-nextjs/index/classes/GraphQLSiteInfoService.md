[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

## Constructors

### new GraphQLSiteInfoService()

> **new GraphQLSiteInfoService**(`config`): [`GraphQLSiteInfoService`](GraphQLSiteInfoService.md)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

• **config**: [`GraphQLSiteInfoServiceConfig`](../type-aliases/GraphQLSiteInfoServiceConfig.md)

instance

#### Returns

[`GraphQLSiteInfoService`](GraphQLSiteInfoService.md)

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:49

## Accessors

### siteQuery

#### Get Signature

> **get** `protected` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

##### Returns

`string`

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:53

## Methods

### fetchSiteInfo()

> **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:54

***

### fetchWithSiteQuery()

> `protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:55

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

CacheClient instance

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:61

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

sitecore-jss/types/site/graphql-siteinfo-service.d.ts:68
