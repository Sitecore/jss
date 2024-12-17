[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRedirectsService

# Class: GraphQLRedirectsService

The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint

## Constructors

### new GraphQLRedirectsService()

> **new GraphQLRedirectsService**(`options`): [`GraphQLRedirectsService`](GraphQLRedirectsService.md)

Creates an instance of graphQL redirects service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLRedirectsServiceConfig`](../type-aliases/GraphQLRedirectsServiceConfig.md) | instance |

#### Returns

[`GraphQLRedirectsService`](GraphQLRedirectsService.md)

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:66](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L66)

## Accessors

### query

#### Get Signature

> **get** `protected` **query**(): `string`

##### Returns

`string`

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:71](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L71)

## Methods

### fetchRedirects()

> **fetchRedirects**(`siteName`): `Promise`\<[`RedirectInfo`](../type-aliases/RedirectInfo.md)[]\>

Fetch an array of redirects from API

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `siteName` | `string` | site name |

#### Returns

`Promise`\<[`RedirectInfo`](../type-aliases/RedirectInfo.md)[]\>

Promise<RedirectInfo[]>

#### Throws

if the siteName is empty.

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:81](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L81)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`RedirectsQueryResult`](../type-aliases/RedirectsQueryResult.md)\>

Gets cache client implementation
Override this method if custom cache needs to be used

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`RedirectsQueryResult`](../type-aliases/RedirectsQueryResult.md)\>

CacheClient instance

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:121](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L121)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:105](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L105)
