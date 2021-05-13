[@sitecore-jss/sitecore-jss](../README.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](axiosdatafetcher.md#constructor)

### Properties

- [instance](axiosdatafetcher.md#instance)

### Methods

- [delete](axiosdatafetcher.md#delete)
- [fetch](axiosdatafetcher.md#fetch)
- [get](axiosdatafetcher.md#get)
- [head](axiosdatafetcher.md#head)
- [post](axiosdatafetcher.md#post)
- [put](axiosdatafetcher.md#put)

## Constructors

### constructor

\+ **new AxiosDataFetcher**(`dataFetcherConfig?`: [*AxiosDataFetcherConfig*](../README.md#axiosdatafetcherconfig)): [*AxiosDataFetcher*](axiosdatafetcher.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataFetcherConfig` | [*AxiosDataFetcherConfig*](../README.md#axiosdatafetcherconfig) | {} | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

**Returns:** [*AxiosDataFetcher*](axiosdatafetcher.md)

Defined in: [axios-fetcher.ts:46](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L46)

## Properties

### instance

• `Private` **instance**: AxiosInstance

Defined in: [axios-fetcher.ts:46](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L46)

## Methods

### delete

▸ **delete**(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a DELETE request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:163](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L163)

___

### fetch

▸ **fetch**<T\>(`url`: *string*, `data?`: *unknown*): *Promise*<AxiosResponse<T\>\>

Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |

**Returns:** *Promise*<AxiosResponse<T\>\>

response

Defined in: [axios-fetcher.ts:107](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L107)

___

### get

▸ **get**<T\>(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<T\>\>

Perform a GET request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<T\>\>

response

Defined in: [axios-fetcher.ts:121](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L121)

___

### head

▸ **head**(`url`: *string*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a HEAD request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:131](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L131)

___

### post

▸ **post**(`url`: *string*, `data?`: *unknown*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a POST request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:142](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L142)

___

### put

▸ **put**(`url`: *string*, `data?`: *unknown*, `config?`: AxiosRequestConfig): *Promise*<AxiosResponse<any\>\>

Perform a PUT request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to request; may include query string |
| `data?` | *unknown* | - |
| `config?` | AxiosRequestConfig | - |

**Returns:** *Promise*<AxiosResponse<any\>\>

response

Defined in: [axios-fetcher.ts:153](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/axios-fetcher.ts#L153)
