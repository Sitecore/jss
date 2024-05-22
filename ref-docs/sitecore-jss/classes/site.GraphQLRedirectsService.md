[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLRedirectsService

# Class: GraphQLRedirectsService

[site](../modules/site.md).GraphQLRedirectsService

The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint

## Table of contents

### Constructors

- [constructor](site.GraphQLRedirectsService.md#constructor)

### Properties

- [cache](site.GraphQLRedirectsService.md#cache)
- [graphQLClient](site.GraphQLRedirectsService.md#graphqlclient)
- [options](site.GraphQLRedirectsService.md#options)

### Accessors

- [query](site.GraphQLRedirectsService.md#query)

### Methods

- [fetchRedirects](site.GraphQLRedirectsService.md#fetchredirects)
- [getCacheClient](site.GraphQLRedirectsService.md#getcacheclient)
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

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:70](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L70)

## Properties

### cache

• `Private` **cache**: `CacheClient`\<[`RedirectsQueryResult`](../modules/site.md#redirectsqueryresult)\>

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:60](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L60)

___

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:59](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L59)

___

### options

• `Private` **options**: [`GraphQLRedirectsServiceConfig`](../modules/site.md#graphqlredirectsserviceconfig)

instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:70](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L70)

## Accessors

### query

• `Protected` `get` **query**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:62](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L62)

## Methods

### fetchRedirects

▸ **fetchRedirects**(`siteName`): `Promise`\<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Fetch an array of redirects from API

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<[`RedirectInfo`](../modules/site.md#redirectinfo)[]\>

Promise<RedirectInfo[]>

**`Throws`**

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:81](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L81)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`RedirectsQueryResult`](../modules/site.md#redirectsqueryresult)\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

`CacheClient`\<[`RedirectsQueryResult`](../modules/site.md#redirectsqueryresult)\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:121](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L121)

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

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:105](https://github.com/Sitecore/jss/blob/3cc9d032c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L105)
