[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLRobotsService

# Class: GraphQLRobotsService

[index](../modules/index.md).GraphQLRobotsService

Service that fetch the robots.txt data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](index.GraphQLRobotsService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLRobotsService.md#graphqlclient)
- [options](index.GraphQLRobotsService.md#options)

### Accessors

- [query](index.GraphQLRobotsService.md#query)

### Methods

- [fetchRobots](index.GraphQLRobotsService.md#fetchrobots)
- [getGraphQLClient](index.GraphQLRobotsService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLRobotsService**(`options`)

Creates an instance of graphQL robots.txt service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLRobotsServiceConfig`](../modules/index.md#graphqlrobotsserviceconfig) | instance |

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:45

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:39

___

### options

• **options**: [`GraphQLRobotsServiceConfig`](../modules/index.md#graphqlrobotsserviceconfig)

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:38

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:40

## Methods

### fetchRobots

▸ **fetchRobots**(): `Promise`\<`string`\>

Fetch a data of robots.txt from API

#### Returns

`Promise`\<`string`\>

text of robots.txt

**`Throws`**

if the siteName is empty.

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:51

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/site/graphql-robots-service.d.ts:58
