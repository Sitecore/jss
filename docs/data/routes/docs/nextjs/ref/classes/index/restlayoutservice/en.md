---
name: restlayoutservice
routeTemplate: ./data/component-templates/article.yml
title: restlayoutservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / RestLayoutService

# Class: RestLayoutService

[index](/docs/nextjs/ref/modules/index).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/restlayoutservice#constructor)

### Properties

- [getDefaultFetcher](/docs/nextjs/ref/classes/index/restlayoutservice#getdefaultfetcher)
- [getFetchOptions](/docs/nextjs/ref/classes/index/restlayoutservice#getfetchoptions)
- [serviceConfig](/docs/nextjs/ref/classes/index/restlayoutservice#serviceconfig)
- [setupReqHeaders](/docs/nextjs/ref/classes/index/restlayoutservice#setupreqheaders)
- [setupResHeaders](/docs/nextjs/ref/classes/index/restlayoutservice#setupresheaders)

### Methods

- [fetchLayoutData](/docs/nextjs/ref/classes/index/restlayoutservice#fetchlayoutdata)
- [fetchPlaceholderData](/docs/nextjs/ref/classes/index/restlayoutservice#fetchplaceholderdata)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](/docs/nextjs/ref/modules/index#restlayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

## Properties

### getDefaultFetcher

• `Private` **getDefaultFetcher**: `any`

Provides default @see AxiosDataFetcher data fetcher

**`param`** Request instance

**`param`** Response instance

**`returns`** default fetcher

___

### getFetchOptions

• `Private` **getFetchOptions**: `any`

Provides fetch options in order to fetch data

**`param`** language will be applied to `sc_lang` param

**`returns`** fetch options

___

### serviceConfig

• `Private` **serviceConfig**: `any`

___

### setupReqHeaders

• `Private` **setupReqHeaders**: `any`

Setup request headers

**`param`**

**`returns`** axios request config

___

### setupResHeaders

• `Private` **setupResHeaders**: `any`

Setup response headers based on response from layout service

**`param`**

**`returns`** response

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

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
