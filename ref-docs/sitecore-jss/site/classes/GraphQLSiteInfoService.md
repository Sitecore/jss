[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:64](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L64)

## Constructors

### Constructor

> **new GraphQLSiteInfoService**(`config`): `GraphQLSiteInfoService`

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:72](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L72)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLSiteInfoServiceConfig`](../type-aliases/GraphQLSiteInfoServiceConfig.md) | instance |

#### Returns

`GraphQLSiteInfoService`

## Accessors

### siteQuery

#### Get Signature

> **get** `protected` **siteQuery**(): `string`

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:80](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L80)

site query is available on XM Cloud and XP 10.4+

##### Returns

`string`

## Methods

### fetchSiteInfo()

> **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:84](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L84)

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

***

### fetchWithSiteQuery()

> `protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:96](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L96)

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:117](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L117)

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

CacheClient instance

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:130](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L130)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
