[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

Service that fetch the error pages data using Sitecore's GraphQL API.

## Constructors

### new GraphQLErrorPagesService()

> **new GraphQLErrorPagesService**(`options`): [`GraphQLErrorPagesService`](GraphQLErrorPagesService.md)

Creates an instance of graphQL error pages service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md) | instance |

#### Returns

[`GraphQLErrorPagesService`](GraphQLErrorPagesService.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)

## Properties

### options

> **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)

## Methods

### fetchErrorPages()

> **fetchErrorPages**(): `Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

Fetch list of error pages for the site

#### Returns

`Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

list of url's error pages

#### Throws

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:84](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L84)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:108](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L108)
