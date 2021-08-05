[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / layout/rest-layout-service

# Module: layout/rest-layout-service

## Table of contents

### Classes

- [RestLayoutService](../classes/layout_rest_layout_service.RestLayoutService.md)

### Interfaces

- [LayoutServiceConfig](../interfaces/layout_rest_layout_service.LayoutServiceConfig.md)
- [LayoutServiceRequestOptions](../interfaces/layout_rest_layout_service.LayoutServiceRequestOptions.md)

### Type aliases

- [DataFetcherResolver](layout_rest_layout_service.md#datafetcherresolver)
- [RestLayoutServiceConfig](layout_rest_layout_service.md#restlayoutserviceconfig)

### Functions

- [fetchPlaceholderData](layout_rest_layout_service.md#fetchplaceholderdata)
- [fetchRouteData](layout_rest_layout_service.md#fetchroutedata)
- [resolveLayoutServiceUrl](layout_rest_layout_service.md#resolvelayoutserviceurl)

## Type aliases

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => [`HttpDataFetcher`](data_fetcher.md#httpdatafetcher)<`T`\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): [`HttpDataFetcher`](data_fetcher.md#httpdatafetcher)<`T`\>

Data fetcher resolver in order to provide custom data fetcher

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

##### Returns

[`HttpDataFetcher`](data_fetcher.md#httpdatafetcher)<`T`\>

#### Defined in

[layout/rest-layout-service.ts:154](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L154)

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | [`DataFetcherResolver`](layout_rest_layout_service.md#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

#### Defined in

[layout/rest-layout-service.ts:118](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L118)

## Functions

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `options`): `Promise`<[`PlaceholderData`](../interfaces/layout_models.PlaceholderData.md)\>

Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

**`deprecated`** Will be removed in a future release. Please use LayoutService.fetchPlaceholderData instead,

**`see`** {LayoutService} - fetchPlaceholderData

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholderName` | `string` |
| `itemPath` | `string` |
| `options` | [`LayoutServiceRequestOptions`](../interfaces/layout_rest_layout_service.LayoutServiceRequestOptions.md)<[`PlaceholderData`](../interfaces/layout_models.PlaceholderData.md)\> |

#### Returns

`Promise`<[`PlaceholderData`](../interfaces/layout_models.PlaceholderData.md)\>

placeholder data

#### Defined in

[layout/rest-layout-service.ts:57](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L57)

___

### fetchRouteData

▸ **fetchRouteData**(`itemPath`, `options`): `Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

Makes a request to Sitecore Layout Service for the specified route item path.

**`deprecated`** Will be removed in a future release. Please use LayoutService.fetchLayoutData instead,

**`see`** {LayoutService} - fetchLayoutData

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `options` | [`LayoutServiceRequestOptions`](../interfaces/layout_rest_layout_service.LayoutServiceRequestOptions.md)<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\> |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

layout data

#### Defined in

[layout/rest-layout-service.ts:36](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L36)

___

### resolveLayoutServiceUrl

▸ **resolveLayoutServiceUrl**(`options?`, `apiType`): `string`

Resolves layout service url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`LayoutServiceConfig`](../interfaces/layout_rest_layout_service.LayoutServiceConfig.md) | - |
| `apiType` | ``"render"`` \| ``"placeholder"`` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

#### Defined in

[layout/rest-layout-service.ts:15](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L15)
