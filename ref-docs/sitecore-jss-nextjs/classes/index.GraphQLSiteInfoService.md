[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

[index](../modules/index.md).GraphQLSiteInfoService

## Table of contents

### Constructors

- [constructor](index.GraphQLSiteInfoService.md#constructor)

### Properties

- [cache](index.GraphQLSiteInfoService.md#cache)
- [config](index.GraphQLSiteInfoService.md#config)
- [getCacheKey](index.GraphQLSiteInfoService.md#getcachekey)
- [graphQLClient](index.GraphQLSiteInfoService.md#graphqlclient)

### Accessors

- [query](index.GraphQLSiteInfoService.md#query)
- [siteQuery](index.GraphQLSiteInfoService.md#sitequery)

### Methods

- [fetchSiteInfo](index.GraphQLSiteInfoService.md#fetchsiteinfo)
- [fetchWithDefaultQuery](index.GraphQLSiteInfoService.md#fetchwithdefaultquery)
- [fetchWithSiteQuery](index.GraphQLSiteInfoService.md#fetchwithsitequery)
- [getCacheClient](index.GraphQLSiteInfoService.md#getcacheclient)
- [getGraphQLClient](index.GraphQLSiteInfoService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLSiteInfoService**(`config`)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

| Name     | Type                                                                               | Description |
| :------- | :--------------------------------------------------------------------------------- | :---------- |
| `config` | [`GraphQLSiteInfoServiceConfig`](../modules/index.md#graphqlsiteinfoserviceconfig) | instance    |

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:78

## Properties

### cache

• `Private` **cache**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:68

---

### config

• `Private` **config**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:66

---

### getCacheKey

• `Private` **getCacheKey**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:95

---

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:67

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:69

---

### siteQuery

• `Protected` `get` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:73

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:79

---

### fetchWithDefaultQuery

▸ `Protected` **fetchWithDefaultQuery**(): `Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:80

---

### fetchWithSiteQuery

▸ `Protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:81

---

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

CacheClient instance

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:87

---

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:94
