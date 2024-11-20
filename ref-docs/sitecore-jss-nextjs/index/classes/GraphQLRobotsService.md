[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Constructors

### new GraphQLRobotsService()

> **new GraphQLRobotsService**(`options`): [`GraphQLRobotsService`](GraphQLRobotsService.md)

Creates an instance of graphQL robots.txt service with the provided options

#### Parameters

• **options**: [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md)

instance

#### Returns

[`GraphQLRobotsService`](GraphQLRobotsService.md)

#### Defined in

sitecore-jss/types/site/graphql-robots-service.d.ts:34

## Properties

### options

> **options**: [`GraphQLRobotsServiceConfig`](../type-aliases/GraphQLRobotsServiceConfig.md)

#### Defined in

sitecore-jss/types/site/graphql-robots-service.d.ts:28

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

sitecore-jss/types/site/graphql-robots-service.d.ts:35

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

sitecore-jss/types/site/graphql-robots-service.d.ts:41

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

sitecore-jss/types/site/graphql-robots-service.d.ts:48
