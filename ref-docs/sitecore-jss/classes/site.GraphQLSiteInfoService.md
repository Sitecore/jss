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

[src/site/graphql-siteinfo-service.ts:127](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L127)

## Properties

### cache

• `Private` **cache**: `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:117](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L117)

___

### config

• `Private` **config**: [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig)

instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:127](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L127)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-siteinfo-service.ts:116](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L116)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:119](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L119)

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:132](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L132)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

CacheClient instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:173](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L173)

___

### getCacheKey

▸ `Private` **getCacheKey**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:203](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L203)

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

[src/site/graphql-siteinfo-service.ts:186](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L186)
