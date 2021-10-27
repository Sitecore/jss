@sitecore-jss/sitecore-jss

# @sitecore-jss/sitecore-jss

## Table of contents

### Namespaces

- [constants](modules/constants.md)

### Classes

- [AxiosDataFetcher](classes/AxiosDataFetcher.md)
- [GraphQLRequestClient](classes/GraphQLRequestClient.md)

### Interfaces

- [GraphQLClient](interfaces/GraphQLClient.md)
- [HttpResponse](interfaces/HttpResponse.md)

### Type aliases

- [AxiosDataFetcherConfig](README.md#axiosdatafetcherconfig)
- [Debugger](README.md#debugger)
- [GraphQLRequestClientConfig](README.md#graphqlrequestclientconfig)
- [HttpDataFetcher](README.md#httpdatafetcher)

### Properties

- [debug](README.md#debug)

### Functions

- [fetchData](README.md#fetchdata)

## Type aliases

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: `AxiosRequestConfig` & `AxiosDataFetcherOptions`

#### Defined in

[axios-fetcher.ts:35](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/axios-fetcher.ts#L35)

___

### Debugger

Ƭ **Debugger**: `debug.Debugger`

#### Defined in

[debug.ts:6](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/debug.ts#L6)

___

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement @see GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [`Debugger`](README.md#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |

#### Defined in

[graphql-request-client.ts:21](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L21)

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: `unknown`) => `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `unknown` |

##### Returns

`Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

#### Defined in

[data-fetcher.ts:26](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/data-fetcher.ts#L26)

## Properties

### debug

• **debug**: `Readonly`<`Object`\>

## Functions

### fetchData

▸ **fetchData**<`T`\>(`url`, `fetcher`, `params?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fetcher` | [`HttpDataFetcher`](README.md#httpdatafetcher)<`T`\> |
| `params` | `ParsedUrlQueryInput` |

#### Returns

`Promise`<`T`\>

#### Defined in

[data-fetcher.ts:57](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/data-fetcher.ts#L57)
