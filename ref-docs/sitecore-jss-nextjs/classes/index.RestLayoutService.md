[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [index](../modules/index.md) / RestLayoutService

# Class: RestLayoutService

[index](../modules/index.md).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](index.RestLayoutService.md#constructor)

### Properties

- [getDefaultFetcher](index.RestLayoutService.md#getdefaultfetcher)
- [getFetchOptions](index.RestLayoutService.md#getfetchoptions)
- [serviceConfig](index.RestLayoutService.md#serviceconfig)
- [setupReqHeaders](index.RestLayoutService.md#setupreqheaders)
- [setupResHeaders](index.RestLayoutService.md#setupresheaders)

### Methods

- [fetchLayoutData](index.RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](index.RestLayoutService.md#fetchplaceholderdata)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../modules/index.md#restlayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:103

## Properties

### getDefaultFetcher

• `Private` **getDefaultFetcher**: `any`

Provides default @see AxiosDataFetcher data fetcher

**`param`** Request instance

**`param`** Response instance

**`returns`** default fetcher

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:137

___

### getFetchOptions

• `Private` **getFetchOptions**: `any`

Provides fetch options in order to fetch data

**`param`** language will be applied to `sc_lang` param

**`returns`** fetch options

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:130

___

### serviceConfig

• `Private` **serviceConfig**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:102

___

### setupReqHeaders

• `Private` **setupReqHeaders**: `any`

Setup request headers

**`param`**

**`returns`** axios request config

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:143

___

### setupResHeaders

• `Private` **setupResHeaders**: `any`

Setup response headers based on response from layout service

**`param`**

**`returns`** response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:149

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:112

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<`PlaceholderData`\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholderName` | `string` |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<`PlaceholderData`\>

placeholder data

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:124
