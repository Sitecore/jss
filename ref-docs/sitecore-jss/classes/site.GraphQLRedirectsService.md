[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLRedirectsService

# Class: GraphQLRedirectsService

[site](../modules/site.md).GraphQLRedirectsService

 The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint

## Table of contents

### Constructors

- [constructor](site.GraphQLRedirectsService.md#constructor)

### Properties

- [graphQLClient](site.GraphQLRedirectsService.md#graphqlclient)

### Accessors

- [query](site.GraphQLRedirectsService.md#query)

### Methods

- [fetchRedirects](site.GraphQLRedirectsService.md#fetchredirects)
- [getGraphQLClient](site.GraphQLRedirectsService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLRedirectsService**(`options`)

Creates an instance of graphQL redirects service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLRedirectsServiceConfig`](../modules/site.md#graphqlredirectsserviceconfig) | instance |

#### Defined in

[site/graphql-redirects-service.ts:74](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L74)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[site/graphql-redirects-service.ts:64](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L64)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[site/graphql-redirects-service.ts:66](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L66)

## Methods

### fetchRedirects

▸ **fetchRedirects**(): `Promise`<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Fetch an array of redirects from API

**`throws`** {Error} if the siteName is empty.

#### Returns

`Promise`<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Promise<RedirectInfo[]>

#### Defined in

[site/graphql-redirects-service.ts:83](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L83)

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

[site/graphql-redirects-service.ts:105](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L105)
