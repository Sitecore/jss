[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L37)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLRobotsService**(`options`): `GraphQLRobotsService`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Creates an instance of graphQL robots.txt service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md) | instance |

#### Returns

`GraphQLRobotsService`

## Properties

### options

> **options**: [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

instance

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L48)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

##### Returns

`string`

## Methods

### fetchRobots()

> **fetchRobots**(): `Promise`\<`string`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:57](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L57)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:57](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L57)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch a data of robots.txt from API

#### Returns

`Promise`\<`string`\>

text of robots.txt

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:82](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/site/graphql-robots-service.ts#L82)
=======
Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:82](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/site/graphql-robots-service.ts#L82)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
