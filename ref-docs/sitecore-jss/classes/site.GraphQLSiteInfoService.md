[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLSiteInfoService

# Class: GraphQLSiteInfoService

[site](../modules/site.md).GraphQLSiteInfoService

## Table of contents

### Constructors

- [constructor](site.GraphQLSiteInfoService.md#constructor)

### Properties

- [cache](site.GraphQLSiteInfoService.md#cache)
- [config](site.GraphQLSiteInfoService.md#config)
- [graphQLClient](site.GraphQLSiteInfoService.md#graphqlclient)

### Accessors

- [query](site.GraphQLSiteInfoService.md#query)

### Methods

- [fetchSiteInfo](site.GraphQLSiteInfoService.md#fetchsiteinfo)
- [getCacheClient](site.GraphQLSiteInfoService.md#getcacheclient)
- [getCacheKey](site.GraphQLSiteInfoService.md#getcachekey)
- [getGraphQLClient](site.GraphQLSiteInfoService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLSiteInfoService**(`config`)

Creates an instance of graphQL service to retrieve site configuration list from Sitecore

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig) | instance |

#### Defined in

[src/site/graphql-siteinfo-service.ts:114](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L114)

## Properties

### cache

• `Private` **cache**: `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:104](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L104)

___

### config

• `Private` **config**: [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig)

instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:114](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L114)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-siteinfo-service.ts:103](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L103)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:106](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L106)

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:119](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L119)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

CacheClient instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:146](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L146)

___

### getCacheKey

▸ `Private` **getCacheKey**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:166](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L166)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/index.GraphQLClient.md)

implementation

#### Defined in

[src/site/graphql-siteinfo-service.ts:159](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L159)
