[@sitecore-jss/sitecore-jss](../README.md) / index

# Module: index

## Table of contents

### Namespaces

- [constants](index.constants.md)

### Classes

- [AxiosDataFetcher](../classes/index.AxiosDataFetcher.md)
- [GraphQLRequestClient](../classes/index.GraphQLRequestClient.md)
- [NativeDataFetcher](../classes/index.NativeDataFetcher.md)

### Interfaces

- [AxiosResponse](../interfaces/index.AxiosResponse.md)
- [GraphQLClient](../interfaces/index.GraphQLClient.md)
- [HttpResponse](../interfaces/index.HttpResponse.md)

### Type Aliases

- [AxiosDataFetcherConfig](index.md#axiosdatafetcherconfig)
- [Debugger](index.md#debugger)
- [GraphQLRequestClientConfig](index.md#graphqlrequestclientconfig)
- [HTMLLink](index.md#htmllink)
- [HttpDataFetcher](index.md#httpdatafetcher)
- [NativeDataFetcherConfig](index.md#nativedatafetcherconfig)

### Variables

- [debug](index.md#debug)

### Functions

- [enableDebug](index.md#enabledebug)
- [fetchData](index.md#fetchdata)

## Type Aliases

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: `AxiosRequestConfig` & `AxiosDataFetcherOptions`

#### Defined in

[src/axios-fetcher.ts:35](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/axios-fetcher.ts#L35)

___

### Debugger

Ƭ **Debugger**: `debug.Debugger`

#### Defined in

[src/debug.ts:6](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/debug.ts#L6)

___

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement

**`See`**

GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | [`Debugger`](index.md#debugger) | Override debugger for logging. Uses 'sitecore-jss:http' by default. |
| `fetch?` | typeof `fetch` | Override fetch method. Uses 'graphql-request' library default otherwise ('cross-fetch'). |
| `timeout?` | `number` | GraphQLClient request timeout |

#### Defined in

[src/graphql-request-client.ts:22](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/graphql-request-client.ts#L22)

___

### HTMLLink

Ƭ **HTMLLink**: { `[key: string]`: `unknown`;  } & `Pick`<`HTMLLinkElement`, ``"rel"`` \| ``"href"``\>

Html <link> tag data model

#### Defined in

[src/models.ts:4](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/models.ts#L4)

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: `unknown`) => `Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

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

`Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

#### Defined in

[src/data-fetcher.ts:26](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/data-fetcher.ts#L26)

___

### NativeDataFetcherConfig

Ƭ **NativeDataFetcherConfig**: `NativeDataFetcherOptions` & `RequestInit`

#### Defined in

[src/native-fetcher.ts:20](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/native-fetcher.ts#L20)

## Variables

### debug

• **debug**: `Object`

Default Sitecore JSS 'debug' module debuggers. Uses namespace prefix 'sitecore-jss:'.
See [https://www.npmjs.com/package/debug](https://www.npmjs.com/package/debug) for details.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dictionary` | `Debugger` |
| `editing` | `Debugger` |
| `errorpages` | `Debugger` |
| `http` | `Debugger` |
| `layout` | `Debugger` |
| `multisite` | `Debugger` |
| `personalize` | `Debugger` |
| `redirects` | `Debugger` |
| `robots` | `Debugger` |
| `sitemap` | `Debugger` |

#### Defined in

[src/debug.ts:30](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/debug.ts#L30)

## Functions

### enableDebug

▸ **enableDebug**(`namespaces`): `void`

Enable debug logging dynamically

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespaces` | `string` | space-separated list of namespaces to enable |

#### Returns

`void`

#### Defined in

[src/debug.ts:24](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/debug.ts#L24)

___

### fetchData

▸ **fetchData**<`T`\>(`url`, `fetcher`, `params?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the URL to request; may include query string |
| `fetcher` | [`HttpDataFetcher`](index.md#httpdatafetcher)<`T`\> | the fetcher to use to perform the request |
| `params` | `ParsedUrlQueryInput` | the query string parameters to send with the request |

#### Returns

`Promise`<`T`\>

#### Defined in

[src/data-fetcher.ts:57](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss/src/data-fetcher.ts#L57)
