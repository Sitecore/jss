[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:64](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L64)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:64](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L64)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Service that fetch the error pages data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLErrorPagesService**(`options`): `GraphQLErrorPagesService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

instance

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

##### Returns

`string`

## Methods

### fetchErrorPages()

> **fetchErrorPages**(): `Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:84](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L84)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:84](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L84)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch list of error pages for the site

#### Returns

`Promise`\<`null` \| [`ErrorPages`](../type-aliases/ErrorPages.md)\>

list of url's error pages

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:108](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L108)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-error-pages-service.ts:108](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L108)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
