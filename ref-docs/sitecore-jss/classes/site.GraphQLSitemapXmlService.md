[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

[site](../modules/site.md).GraphQLSitemapXmlService

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](site.GraphQLSitemapXmlService.md#constructor)

### Properties

- [graphQLClient](site.GraphQLSitemapXmlService.md#graphqlclient)
- [options](site.GraphQLSitemapXmlService.md#options)

### Accessors

- [query](site.GraphQLSitemapXmlService.md#query)

### Methods

- [fetchSitemaps](site.GraphQLSitemapXmlService.md#fetchsitemaps)
- [getGraphQLClient](site.GraphQLSitemapXmlService.md#getgraphqlclient)
- [getSitemap](site.GraphQLSitemapXmlService.md#getsitemap)

## Constructors

### constructor

• **new GraphQLSitemapXmlService**(`options`)

Creates an instance of graphQL sitemaps service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapXmlServiceConfig`](../modules/site.md#graphqlsitemapxmlserviceconfig) | instance |

#### Defined in

[src/site/graphql-sitemap-service.ts:52](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L52)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-sitemap-service.ts:42](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L42)

___

### options

• **options**: [`GraphQLSitemapXmlServiceConfig`](../modules/site.md#graphqlsitemapxmlserviceconfig)

instance

#### Defined in

[src/site/graphql-sitemap-service.ts:52](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L52)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-sitemap-service.ts:44](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L44)

## Methods

### fetchSitemaps

▸ **fetchSitemaps**(): `Promise`<`string`[]\>

Fetch list of sitemaps for the site

**`Throws`**

if the siteName is empty.

#### Returns

`Promise`<`string`[]\>

list of sitemap paths

#### Defined in

[src/site/graphql-sitemap-service.ts:61](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L61)

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

[src/site/graphql-sitemap-service.ts:96](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L96)

___

### getSitemap

▸ **getSitemap**(`id`): `Promise`<`undefined` \| `string`\>

Get sitemap file path for sitemap id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the sitemap id (can be empty for default 'sitemap.xml' file) |

#### Returns

`Promise`<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist

#### Defined in

[src/site/graphql-sitemap-service.ts:83](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/site/graphql-sitemap-service.ts#L83)
