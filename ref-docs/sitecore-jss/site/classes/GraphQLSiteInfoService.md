[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:64](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L64)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:64](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L64)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Constructors

### Constructor

> **new GraphQLSiteInfoService**(`config`): `GraphQLSiteInfoService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:72](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L72)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:72](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L72)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:80](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L80)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:80](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L80)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

site query is available on XM Cloud and XP 10.4+

##### Returns

`string`

## Methods

### fetchSiteInfo()

> **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:84](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L84)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:84](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L84)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

***

### fetchWithSiteQuery()

> `protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:100](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L100)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:100](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L100)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Returns

`Promise`\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:121](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L121)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:121](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L121)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`SiteInfo`](../type-aliases/SiteInfo.md)[]\>

CacheClient instance

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:134](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L134)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:134](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L134)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
