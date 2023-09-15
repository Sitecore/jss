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

[src/site/graphql-siteinfo-service.ts:119](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L119)

## Properties

### cache

• `Private` **cache**: `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:109](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L109)

___

### config

• `Private` **config**: [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig)

instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:119](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L119)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-siteinfo-service.ts:108](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L108)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:111](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L111)

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[src/site/graphql-siteinfo-service.ts:124](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L124)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

CacheClient instance

#### Defined in

[src/site/graphql-siteinfo-service.ts:165](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L165)

___

### getCacheKey

▸ `Private` **getCacheKey**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-siteinfo-service.ts:185](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L185)

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

[src/site/graphql-siteinfo-service.ts:178](https://github.com/Sitecore/jss/blob/fb32a11df/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L178)
