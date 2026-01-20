[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:37](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L37)

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Constructors

### Constructor

> **new GraphQLRobotsService**(`options`): `GraphQLRobotsService`

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)

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

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:44](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L44)

instance

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:48](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L48)

##### Returns

`string`

## Methods

### fetchRobots()

> **fetchRobots**(): `Promise`\<`string`\>

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:57](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L57)

Fetch a data of robots.txt from API

#### Returns

`Promise`\<`string`\>

text of robots.txt

#### Throws

if the siteName is empty.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/site/graphql-robots-service.ts:82](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/site/graphql-robots-service.ts#L82)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
