[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

[site](../modules/site.md).GraphQLRobotsService

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](site.GraphQLRobotsService.md#constructor)

### Properties

- [graphQLClient](site.GraphQLRobotsService.md#graphqlclient)
- [options](site.GraphQLRobotsService.md#options)

### Accessors

- [query](site.GraphQLRobotsService.md#query)

### Methods

- [fetchRobots](site.GraphQLRobotsService.md#fetchrobots)
- [getGraphQLClient](site.GraphQLRobotsService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLRobotsService**(`options`)

Creates an instance of graphQL robots.txt service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLRobotsServiceConfig`](../modules/site.md#graphqlrobotsserviceconfig) | instance |

#### Defined in

[src/site/graphql-robots-service.ts:50](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L50)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-robots-service.ts:40](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L40)

___

### options

• **options**: [`GraphQLRobotsServiceConfig`](../modules/site.md#graphqlrobotsserviceconfig)

instance

#### Defined in

[src/site/graphql-robots-service.ts:50](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L50)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-robots-service.ts:42](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L42)

## Methods

### fetchRobots

▸ **fetchRobots**(): `Promise`<`string`\>

Fetch a data of robots.txt from API

**`Throws`**

if the siteName is empty.

#### Returns

`Promise`<`string`\>

text of robots.txt

#### Defined in

[src/site/graphql-robots-service.ts:59](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L59)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/index.GraphQLClient.md)

implementation

#### Defined in

[src/site/graphql-robots-service.ts:84](https://github.com/Sitecore/jss/blob/289f7c1a6/packages/sitecore-jss/src/site/graphql-robots-service.ts#L84)
