[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:35

Service that fetch the error pages data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLErrorPagesService**(`options`): `GraphQLErrorPagesService`

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:42

Creates an instance of graphQL error pages service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md) | instance |

#### Returns

`GraphQLErrorPagesService`

## Properties

### options

> **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/GraphQLErrorPagesServiceConfig.md)

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:36

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:43

##### Returns

`string`

## Methods

### fetchErrorPages()

> **fetchErrorPages**(): `Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:49

Fetch list of error pages for the site

#### Returns

`Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

list of url's error pages

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: sitecore-jss/types/site/graphql-error-pages-service.d.ts:56

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation
