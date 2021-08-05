[Sitecore JavaScript Rendering SDK](../README.md) / [layout/layout-service](../modules/layout_layout_service.md) / LayoutServiceBase

# Class: LayoutServiceBase

[layout/layout-service](../modules/layout_layout_service.md).LayoutServiceBase

## Hierarchy

- **`LayoutServiceBase`**

  ↳ [`GraphQLLayoutService`](layout_graphql_layout_service.GraphQLLayoutService.md)

  ↳ [`RestLayoutService`](layout_rest_layout_service.RestLayoutService.md)

## Implements

- [`LayoutService`](../interfaces/layout_layout_service.LayoutService.md)

## Table of contents

### Constructors

- [constructor](layout_layout_service.LayoutServiceBase.md#constructor)

### Methods

- [fetchLayoutData](layout_layout_service.LayoutServiceBase.md#fetchlayoutdata)

## Constructors

### constructor

• **new LayoutServiceBase**()

## Methods

### fetchLayoutData

▸ `Abstract` **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

layout data

#### Implementation of

[LayoutService](../interfaces/layout_layout_service.LayoutService.md).[fetchLayoutData](../interfaces/layout_layout_service.LayoutService.md#fetchlayoutdata)

#### Defined in

[layout/layout-service.ts:22](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/layout/layout-service.ts#L22)
