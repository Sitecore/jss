[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:64](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L64)

Service that fetch the error pages data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLErrorPagesService**(`options`): `GraphQLErrorPagesService`

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)

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

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)

instance

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)

##### Returns

`string`

## Methods

### fetchErrorPages()

> **fetchErrorPages**(): `Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:84](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L84)

Fetch list of error pages for the site

#### Returns

`Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

list of url's error pages

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:108](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L108)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
