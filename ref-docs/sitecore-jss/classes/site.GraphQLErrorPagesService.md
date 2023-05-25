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
| `options` | [`GraphQLErrorPagesServiceConfig`](../modules/site.md#graphqlerrorpagesserviceconfig) | instance |

#### Defined in

[src/site/graphql-error-pages-service.ts:76](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L76)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-error-pages-service.ts:66](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L66)

___

### options

• **options**: [`GraphQLErrorPagesServiceConfig`](../modules/site.md#graphqlerrorpagesserviceconfig)

instance

#### Defined in

[src/site/graphql-error-pages-service.ts:76](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L76)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-error-pages-service.ts:68](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L68)

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

[src/site/graphql-error-pages-service.ts:85](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L85)

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

[src/site/graphql-error-pages-service.ts:109](https://github.com/Sitecore/jss/blob/7657f7641/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L109)
