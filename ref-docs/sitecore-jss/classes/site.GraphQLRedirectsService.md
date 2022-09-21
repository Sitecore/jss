[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLRedirectsService

# Class: GraphQLRedirectsService

[site](../modules/site.md).GraphQLRedirectsService

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

[site/graphql-redirects-service.ts:69](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L69)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[site/graphql-redirects-service.ts:59](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L59)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[site/graphql-redirects-service.ts:61](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L61)

## Methods

### fetchRedirects

▸ **fetchRedirects**(): `Promise`<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Fetch an array of redirects from API

**`throws`** {Error} if the siteName is empty.

#### Returns

`Promise`<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Promise<RedirectInfo[]>

#### Defined in

[site/graphql-redirects-service.ts:78](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L78)

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

[site/graphql-redirects-service.ts:100](https://github.com/Sitecore/jss/blob/1db69b67/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L100)
