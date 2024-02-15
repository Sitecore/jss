[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLSitemapXmlService

# Class: GraphQLSitemapXmlService

[index](../modules/index.md).GraphQLSitemapXmlService

Service that fetch the sitemaps data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](index.GraphQLSitemapXmlService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLSitemapXmlService.md#graphqlclient)
- [options](index.GraphQLSitemapXmlService.md#options)

### Accessors

- [query](index.GraphQLSitemapXmlService.md#query)

### Methods

- [fetchSitemaps](index.GraphQLSitemapXmlService.md#fetchsitemaps)
- [getGraphQLClient](index.GraphQLSitemapXmlService.md#getgraphqlclient)
- [getSitemap](index.GraphQLSitemapXmlService.md#getsitemap)

## Constructors

### constructor

• **new GraphQLSitemapXmlService**(`options`)

Creates an instance of graphQL sitemaps service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapXmlServiceConfig`](../modules/index.md#graphqlsitemapxmlserviceconfig) | instance |

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:45

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:39

___

### options

• **options**: [`GraphQLSitemapXmlServiceConfig`](../modules/index.md#graphqlsitemapxmlserviceconfig)

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:38

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:40

## Methods

### fetchSitemaps

▸ **fetchSitemaps**(): `Promise`\<`string`[]\>

Fetch list of sitemaps for the site

#### Returns

`Promise`\<`string`[]\>

list of sitemap paths

**`Throws`**

if the siteName is empty.

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:51

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

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:64

___

### getSitemap

▸ **getSitemap**(`id`): `Promise`\<`undefined` \| `string`\>

Get sitemap file path for sitemap id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the sitemap id (can be empty for default 'sitemap.xml' file) |

#### Returns

`Promise`\<`undefined` \| `string`\>

the sitemap file path or undefined if one doesn't exist

#### Defined in

packages/sitecore-jss/types/site/graphql-sitemap-service.d.ts:57
