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

- [siteQuery](index.GraphQLSiteInfoService.md#sitequery)

### Methods

- [fetchSiteInfo](index.GraphQLSiteInfoService.md#fetchsiteinfo)
- [fetchWithSiteQuery](index.GraphQLSiteInfoService.md#fetchwithsitequery)
- [getCacheClient](index.GraphQLSiteInfoService.md#getcacheclient)
- [getGraphQLClient](index.GraphQLSiteInfoService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLSiteInfoService**(`config`)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`GraphQLSiteInfoServiceConfig`](../modules/index.md#graphqlsiteinfoserviceconfig) | instance |

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:62

## Properties

### cache

• `Private` **cache**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:53

___

### config

• `Private` **config**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:51

___

### getCacheKey

• `Private` **getCacheKey**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:78

___

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:52

## Accessors

### siteQuery

• `Protected` `get` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:57

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:63

___

### fetchWithSiteQuery

▸ `Protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:64

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`SiteInfo`](../modules/index.md#siteinfo)[]\>

CacheClient instance

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:70

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/site/graphql-siteinfo-service.d.ts:77
