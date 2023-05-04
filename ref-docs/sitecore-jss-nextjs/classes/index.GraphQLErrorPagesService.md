[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLErrorPagesService

# Class: GraphQLErrorPagesService

[index](../modules/index.md).GraphQLErrorPagesService

Service that fetch the error pages data using Sitecore's GraphQL API.

## Table of contents

### Constructors

- [constructor](index.GraphQLErrorPagesService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLErrorPagesService.md#graphqlclient)
- [options](index.GraphQLErrorPagesService.md#options)

### Accessors

- [query](index.GraphQLErrorPagesService.md#query)

### Methods

- [fetchErrorPages](index.GraphQLErrorPagesService.md#fetcherrorpages)
- [getGraphQLClient](index.GraphQLErrorPagesService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLErrorPagesService**(`options`)

Creates an instance of graphQL error pages service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLErrorPagesServiceConfig`](../modules/index.md#graphqlerrorpagesserviceconfig) | instance |

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:38

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:32

___

### options

• **options**: [`GraphQLErrorPagesServiceConfig`](../modules/index.md#graphqlerrorpagesserviceconfig)

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:31

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:33

## Methods

### fetchErrorPages

▸ **fetchErrorPages**(): `Promise`<``null`` \| [`ErrorPages`](../modules/index.md#errorpages)\>

Fetch list of error pages for the site

**`Throws`**

if the siteName is empty.

#### Returns

`Promise`<``null`` \| [`ErrorPages`](../modules/index.md#errorpages)\>

list of url's error pages

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:44

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

sitecore-jss/types/site/graphql-error-pages-service.d.ts:51
