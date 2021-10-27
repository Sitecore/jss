@sitecore-jss/sitecore-jss

# @sitecore-jss/sitecore-jss

## Table of contents

### Enumerations

- [LayoutServicePageState](enums/LayoutServicePageState.md)

### Classes

- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [RestLayoutService](classes/RestLayoutService.md)

### Interfaces

- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [Field](interfaces/Field.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [Item](interfaces/Item.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContext](interfaces/LayoutServiceContext.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [PlaceholderData](interfaces/PlaceholderData.md)
- [RouteData](interfaces/RouteData.md)

### Type aliases

- [DataFetcherResolver](README.md#datafetcherresolver)
- [GraphQLLayoutServiceConfig](README.md#graphqllayoutserviceconfig)
- [PlaceholdersData](README.md#placeholdersdata)
- [RestLayoutServiceConfig](README.md#restlayoutserviceconfig)

### Functions

- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)

## Type aliases

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => `HttpDataFetcher`<`T`\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): `HttpDataFetcher`<`T`\>

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

`HttpDataFetcher`<`T`\>

#### Defined in

[rest-layout-service.ts:53](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L53)

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

[graphql-layout-service.ts:6](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L6)

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

[models.ts:64](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/models.ts#L64)

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | [`DataFetcherResolver`](README.md#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

#### Defined in

[rest-layout-service.ts:17](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L17)

## Functions

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](interfaces/ComponentRendering.md) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md))[]

child placeholder

#### Defined in

[utils.ts:58](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/utils.ts#L58)

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
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

#### Defined in

[utils.ts:9](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/utils.ts#L9)

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

[utils.ts:14](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/utils.ts#L14)
