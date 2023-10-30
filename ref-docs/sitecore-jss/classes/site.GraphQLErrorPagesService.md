[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

[site](../modules/site.md).GraphQLErrorPagesService

Service that fetch the error pages data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](site.GraphQLErrorPagesService.md#constructor)

### Properties

- [graphQLClient](site.GraphQLErrorPagesService.md#graphqlclient)
- [options](site.GraphQLErrorPagesService.md#options)

### Accessors

- [query](site.GraphQLErrorPagesService.md#query)

### Methods

- [fetchErrorPages](site.GraphQLErrorPagesService.md#fetcherrorpages)
- [getGraphQLClient](site.GraphQLErrorPagesService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLErrorPagesService**(`options`)

Creates an instance of graphQL error pages service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLErrorPagesServiceConfig`](../interfaces/site.GraphQLErrorPagesServiceConfig.md) | instance |

#### Defined in

[src/site/graphql-error-pages-service.ts:85](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L85)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)

___

### options

• **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/site.GraphQLErrorPagesServiceConfig.md)

instance

#### Defined in

[src/site/graphql-error-pages-service.ts:85](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L85)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-error-pages-service.ts:77](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L77)

## Methods

### fetchErrorPages

▸ **fetchErrorPages**(): `Promise`<``null`` \| [`ErrorPages`](../modules/site.md#errorpages)\>

Fetch list of error pages for the site

**`Throws`**

if the siteName is empty.

#### Returns

`Promise`<``null`` \| [`ErrorPages`](../modules/site.md#errorpages)\>

list of url's error pages

#### Defined in

[src/site/graphql-error-pages-service.ts:94](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L94)

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

[src/site/graphql-error-pages-service.ts:118](https://github.com/Sitecore/jss/blob/3fa671c7e/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L118)
