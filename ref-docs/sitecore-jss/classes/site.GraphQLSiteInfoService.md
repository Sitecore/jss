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

- [siteQuery](site.GraphQLSiteInfoService.md#sitequery)

### Methods

- [fetchSiteInfo](site.GraphQLSiteInfoService.md#fetchsiteinfo)
- [fetchWithSiteQuery](site.GraphQLSiteInfoService.md#fetchwithsitequery)
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

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:88](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L88)

## Properties

### cache

• `Private` **cache**: `CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:75](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L75)

___

### config

• `Private` **config**: [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:88](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L88)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:74](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L74)

## Accessors

### siteQuery

• `Protected` `get` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:80](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L80)

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:93](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L93)

___

### fetchWithSiteQuery

▸ `Protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:109](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L109)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:130](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L130)

___

### getCacheKey

▸ `Private` **getCacheKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:160](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L160)

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

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:143](https://github.com/Sitecore/jss/blob/5b411c1f2/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L143)
