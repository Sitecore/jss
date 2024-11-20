[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

Service that fetch the error pages data using Sitecore's GraphQL API.

## Constructors

### new GraphQLErrorPagesService()

> **new GraphQLErrorPagesService**(`options`): [`GraphQLErrorPagesService`](GraphQLErrorPagesService.md)

Creates an instance of graphQL error pages service with the provided options

#### Parameters

• **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md)

instance

#### Returns

[`GraphQLErrorPagesService`](GraphQLErrorPagesService.md)

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:42

## Properties

### options

> **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md)

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:36

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:43

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

sitecore-jss/types/site/graphql-error-pages-service.d.ts:49

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:56
