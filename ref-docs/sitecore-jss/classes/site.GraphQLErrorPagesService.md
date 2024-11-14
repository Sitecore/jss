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

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:65](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L65)

___

### options

• **options**: [`GraphQLErrorPagesServiceConfig`](../interfaces/site.GraphQLErrorPagesServiceConfig.md)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:75](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L75)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:67](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L67)

## Methods

### fetchErrorPages

▸ **fetchErrorPages**(): `Promise`\<``null`` \| [`ErrorPages`](../modules/site.md#errorpages)\>

Fetch list of error pages for the site

#### Returns

`Promise`\<``null`` \| [`ErrorPages`](../modules/site.md#errorpages)\>

list of url's error pages

**`Throws`**

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:84](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L84)

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

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:108](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L108)
