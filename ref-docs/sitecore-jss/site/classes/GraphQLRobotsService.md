[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Constructors

### new GraphQLRobotsService()

> **new GraphQLRobotsService**(`options`): [`GraphQLRobotsService`](GraphQLRobotsService.md)

Creates an instance of graphQL robots.txt service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md) | instance |

#### Returns

[`GraphQLRobotsService`](GraphQLRobotsService.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)

## Properties

### options

> **options**: [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:48](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-robots-service.ts#L48)

## Methods

### fetchRobots()

> **fetchRobots**(): `Promise`\<`string`\>

Fetch a data of robots.txt from API

#### Returns

`Promise`\<`string`\>

text of robots.txt

#### Throws

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-robots-service.ts:57](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-robots-service.ts#L57)

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

[packages/sitecore-jss/src/site/graphql-robots-service.ts:82](https://github.com/Sitecore/jss/blob/2226f43314f6f0dd9d2003edc1da59f5172fb74b/packages/sitecore-jss/src/site/graphql-robots-service.ts#L82)
