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

[src/site/graphql-error-pages-service.ts:77](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L77)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[src/site/graphql-error-pages-service.ts:67](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L67)

___

### options

• **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/site.GraphQLErrorPagesServiceConfig.md)

instance

#### Defined in

[src/site/graphql-error-pages-service.ts:77](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L77)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[src/site/graphql-error-pages-service.ts:69](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L69)

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

[src/site/graphql-error-pages-service.ts:86](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L86)

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

[src/site/graphql-error-pages-service.ts:110](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L110)
