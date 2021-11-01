[@sitecore-jss/sitecore-jss](../README.md) / layout

# Module: layout

## Table of contents

### Enumerations

- [LayoutServicePageState](../enums/layout.LayoutServicePageState.md)

### Classes

- [GraphQLLayoutService](../classes/layout.GraphQLLayoutService.md)
- [RestLayoutService](../classes/layout.RestLayoutService.md)

### Interfaces

- [ComponentFields](../interfaces/layout.ComponentFields.md)
- [ComponentParams](../interfaces/layout.ComponentParams.md)
- [ComponentRendering](../interfaces/layout.ComponentRendering.md)
- [Field](../interfaces/layout.Field.md)
- [HtmlElementRendering](../interfaces/layout.HtmlElementRendering.md)
- [Item](../interfaces/layout.Item.md)
- [LayoutService](../interfaces/layout.LayoutService.md)
- [LayoutServiceContext](../interfaces/layout.LayoutServiceContext.md)
- [LayoutServiceContextData](../interfaces/layout.LayoutServiceContextData.md)
- [LayoutServiceData](../interfaces/layout.LayoutServiceData.md)
- [PlaceholderData](../interfaces/layout.PlaceholderData.md)
- [RouteData](../interfaces/layout.RouteData.md)

### Type aliases

- [DataFetcherResolver](layout.md#datafetcherresolver)
- [GraphQLLayoutServiceConfig](layout.md#graphqllayoutserviceconfig)
- [PlaceholdersData](layout.md#placeholdersdata)
- [RestLayoutServiceConfig](layout.md#restlayoutserviceconfig)

### Functions

- [getChildPlaceholder](layout.md#getchildplaceholder)
- [getFieldValue](layout.md#getfieldvalue)

## Type aliases

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => [`HttpDataFetcher`](index.md#httpdatafetcher)<`T`\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): [`HttpDataFetcher`](index.md#httpdatafetcher)<`T`\>

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

[`HttpDataFetcher`](index.md#httpdatafetcher)<`T`\>

#### Defined in

[layout/rest-layout-service.ts:53](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/rest-layout-service.ts#L53)

___

### GraphQLLayoutServiceConfig

Ƭ **GraphQLLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `siteName` | `string` | The JSS application name |
| `formatLayoutQuery?` | (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string` | - |

#### Defined in

[layout/graphql-layout-service.ts:6](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L6)

___

### PlaceholdersData

Ƭ **PlaceholdersData**<`TYPEDNAME`\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[] }

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string``string` |

#### Defined in

[layout/models.ts:64](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/models.ts#L64)

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
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

#### Defined in

[layout/rest-layout-service.ts:17](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/rest-layout-service.ts#L17)

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

[layout/utils.ts:58](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/utils.ts#L58)

___

### getFieldValue

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

#### Defined in

[layout/utils.ts:9](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/utils.ts#L9)

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

[layout/utils.ts:14](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss/src/layout/utils.ts#L14)
