[@sitecore-jss/sitecore-jss](../README.md) / layout

# Module: layout

## Table of contents

### Enumerations

- [EditMode](../enums/layout.EditMode.md)
- [LayoutServicePageState](../enums/layout.LayoutServicePageState.md)

### Classes

- [GraphQLLayoutService](../classes/layout.GraphQLLayoutService.md)
- [RestLayoutService](../classes/layout.RestLayoutService.md)

### Interfaces

- [ComponentFields](../interfaces/layout.ComponentFields.md)
- [ComponentParams](../interfaces/layout.ComponentParams.md)
- [ComponentRendering](../interfaces/layout.ComponentRendering.md)
- [Field](../interfaces/layout.Field.md)
- [GraphQLLayoutServiceConfig](../interfaces/layout.GraphQLLayoutServiceConfig.md)
- [HtmlElementRendering](../interfaces/layout.HtmlElementRendering.md)
- [Item](../interfaces/layout.Item.md)
- [LayoutService](../interfaces/layout.LayoutService.md)
- [LayoutServiceContext](../interfaces/layout.LayoutServiceContext.md)
- [LayoutServiceContextData](../interfaces/layout.LayoutServiceContextData.md)
- [LayoutServiceData](../interfaces/layout.LayoutServiceData.md)
- [PlaceholderData](../interfaces/layout.PlaceholderData.md)
- [RouteData](../interfaces/layout.RouteData.md)

### Type Aliases

- [DataFetcherResolver](layout.md#datafetcherresolver)
- [PlaceholdersData](layout.md#placeholdersdata)
- [RestLayoutServiceConfig](layout.md#restlayoutserviceconfig)

### Functions

- [getChildPlaceholder](layout.md#getchildplaceholder)
- [getComponentLibraryStylesheetLinks](layout.md#getcomponentlibrarystylesheetlinks)
- [getContentStylesheetLink](layout.md#getcontentstylesheetlink)
- [getFieldValue](layout.md#getfieldvalue)

## Type Aliases

### DataFetcherResolver

Ƭ **DataFetcherResolver**: \<T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => [`HttpDataFetcher`](index.md#httpdatafetcher)\<`T`\>

#### Type declaration

▸ \<`T`\>(`req?`, `res?`): [`HttpDataFetcher`](index.md#httpdatafetcher)\<`T`\>

Data fetcher resolver in order to provide custom data fetcher

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

##### Returns

[`HttpDataFetcher`](index.md#httpdatafetcher)\<`T`\>

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:53](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/rest-layout-service.ts#L53)

___

### PlaceholdersData

Ƭ **PlaceholdersData**\<`TYPEDNAME`\>: \{ [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[] }

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string` = `string` |

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:75](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/models.ts#L75)

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | [`DataFetcherResolver`](layout.md#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking) **`Default`** ```ts true ``` |

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:17](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/rest-layout-service.ts#L17)

## Functions

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/layout.HtmlElementRendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/layout.ComponentRendering.md) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/layout.HtmlElementRendering.md))[]

child placeholder

#### Defined in

[packages/sitecore-jss/src/layout/utils.ts:60](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/utils.ts#L60)

___

### getComponentLibraryStylesheetLinks

▸ **getComponentLibraryStylesheetLinks**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl?`): [`HTMLLink`](index.md#htmllink)[]

Walks through rendering tree and returns list of links of all FEAAS, BYOC or SXA Component Library Stylesheets that are used

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `layoutData` | [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) | `undefined` | Layout service data |
| `sitecoreEdgeContextId` | `string` | `undefined` | Sitecore Edge Context ID |
| `sitecoreEdgeUrl?` | `string` | `SITECORE_EDGE_URL_DEFAULT` | Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io |

#### Returns

[`HTMLLink`](index.md#htmllink)[]

library stylesheet links

#### Defined in

[packages/sitecore-jss/src/layout/themes.ts:24](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/themes.ts#L24)

___

### getContentStylesheetLink

▸ **getContentStylesheetLink**(`layoutData`, `sitecoreEdgeContextId`, `sitecoreEdgeUrl?`): ``null`` \| [`HTMLLink`](index.md#htmllink)

Get the content styles link to be loaded from the Sitecore Edge Platform

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `layoutData` | [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) | `undefined` | Layout service data |
| `sitecoreEdgeContextId` | `string` | `undefined` | Sitecore Edge Context ID |
| `sitecoreEdgeUrl?` | `string` | `SITECORE_EDGE_URL_DEFAULT` | Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io |

#### Returns

``null`` \| [`HTMLLink`](index.md#htmllink)

content styles link, null if no styles are used in layout

#### Defined in

[packages/sitecore-jss/src/layout/content-styles.ts:26](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/content-styles.ts#L26)

___

### getFieldValue

▸ **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| [`ComponentFields`](../interfaces/layout.ComponentFields.md) | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |

#### Returns

`T` \| `undefined`

the field value or null if the field is not defined

#### Defined in

[packages/sitecore-jss/src/layout/utils.ts:10](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/utils.ts#L10)

▸ **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| [`ComponentFields`](../interfaces/layout.ComponentFields.md) | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |
| `defaultValue` | `T` | the default value to return if the field is not defined |

#### Returns

`T`

the field value or the default value if the field is not defined

#### Defined in

[packages/sitecore-jss/src/layout/utils.ts:15](https://github.com/Sitecore/jss/blob/cea6da5d3/packages/sitecore-jss/src/layout/utils.ts#L15)
