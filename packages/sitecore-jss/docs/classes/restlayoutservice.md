[@sitecore-jss/sitecore-jss](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- *LayoutServiceBase*

  ↳ **RestLayoutService**

## Table of contents

### Constructors

- [constructor](restlayoutservice.md#constructor)

### Methods

- [fetchLayoutData](restlayoutservice.md#fetchlayoutdata)
- [fetchPlaceholderData](restlayoutservice.md#fetchplaceholderdata)
- [getDefaultFetcher](restlayoutservice.md#getdefaultfetcher)
- [getFetchOptions](restlayoutservice.md#getfetchoptions)
- [setupReqHeaders](restlayoutservice.md#setupreqheaders)
- [setupResHeaders](restlayoutservice.md#setupresheaders)

## Constructors

### constructor

\+ **new RestLayoutService**(`serviceConfig`: [*RestLayoutServiceConfig*](../README.md#restlayoutserviceconfig)): [*RestLayoutService*](restlayoutservice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [*RestLayoutServiceConfig*](../README.md#restlayoutserviceconfig) |

**Returns:** [*RestLayoutService*](restlayoutservice.md)

Overrides: LayoutServiceBase.constructor

Defined in: [layout/rest-layout-service.ts:158](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L158)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`: *string*, `language?`: *string*, `req?`: *IncomingMessage*, `res?`: *ServerResponse*): *Promise*<[*LayoutServiceData*](../interfaces/layoutservicedata.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | *string* |
| `language?` | *string* |
| `req?` | *IncomingMessage* |
| `res?` | *ServerResponse* |

**Returns:** *Promise*<[*LayoutServiceData*](../interfaces/layoutservicedata.md)\>

layout service data

Overrides: LayoutServiceBase.fetchLayoutData

Defined in: [layout/rest-layout-service.ts:171](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L171)

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`: *string*, `itemPath`: *string*, `language?`: *string*, `req?`: *IncomingMessage*, `res?`: *ServerResponse*): *Promise*<[*PlaceholderData*](../interfaces/placeholderdata.md)\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholderName` | *string* |
| `itemPath` | *string* |
| `language?` | *string* |
| `req?` | *IncomingMessage* |
| `res?` | *ServerResponse* |

**Returns:** *Promise*<[*PlaceholderData*](../interfaces/placeholderdata.md)\>

placeholder data

Defined in: [layout/rest-layout-service.ts:221](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L221)

___

### getDefaultFetcher

▸ `Private` **getDefaultFetcher**<T\>(`req?`: *IncomingMessage*, `res?`: *ServerResponse*): *function*

Provides default @see AxiosDataFetcher data fetcher

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | *IncomingMessage* |
| `res?` | *ServerResponse* |

**Returns:** (`url`: *string*, `data?`: *unknown*) => *Promise*<AxiosResponse<T\>\>

default fetcher

Defined in: [layout/rest-layout-service.ts:271](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L271)

___

### getFetchOptions

▸ `Private` **getFetchOptions**(`language?`: *string*): FetchOptions

Provides fetch options in order to fetch data

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | *string* |

**Returns:** FetchOptions

fetch options

Defined in: [layout/rest-layout-service.ts:249](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L249)

___

### setupReqHeaders

▸ `Private` **setupReqHeaders**(`req`: *IncomingMessage*): *function*

Setup request headers

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | *IncomingMessage* |

**Returns:** (`reqConfig`: AxiosRequestConfig) => AxiosRequestConfig

axios request config

Defined in: [layout/rest-layout-service.ts:293](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L293)

___

### setupResHeaders

▸ `Private` **setupResHeaders**(`res`: *ServerResponse*): *function*

Setup response headers based on response from layout service

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | *ServerResponse* |

**Returns:** (`serverRes`: *AxiosResponse*<any\>) => *AxiosResponse*<any\>

response

Defined in: [layout/rest-layout-service.ts:312](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/rest-layout-service.ts#L312)
