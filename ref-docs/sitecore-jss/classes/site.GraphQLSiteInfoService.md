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
- [siteQuery](site.GraphQLSiteInfoService.md#sitequery)

### Methods

- [fetchSiteInfo](site.GraphQLSiteInfoService.md#fetchsiteinfo)
- [fetchWithDefaultQuery](site.GraphQLSiteInfoService.md#fetchwithdefaultquery)
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

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:151](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L151)

## Properties

### cache

• `Private` **cache**: `CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:134](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L134)

___

### config

• `Private` **config**: [`GraphQLSiteInfoServiceConfig`](../modules/site.md#graphqlsiteinfoserviceconfig)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:151](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L151)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:133](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L133)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:136](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L136)

___

### siteQuery

• `Protected` `get` **siteQuery**(): `string`

site query is available on XM Cloud and XP 10.4+

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:143](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L143)

## Methods

### fetchSiteInfo

▸ **fetchSiteInfo**(): `Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:156](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L156)

___

### fetchWithDefaultQuery

▸ `Protected` **fetchWithDefaultQuery**(): `Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:174](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L174)

___

### fetchWithSiteQuery

▸ `Protected` **fetchWithSiteQuery**(): `Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Returns

`Promise`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:200](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L200)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`SiteInfo`](../modules/site.md#siteinfo)[]\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:223](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L223)

___

### getCacheKey

▸ `Private` **getCacheKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:253](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L253)

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

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:236](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L236)
