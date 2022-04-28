[@sitecore-jss/sitecore-jss-nextjs](../README.md) / index

# Module: index

## Table of contents

### Namespaces

- [Link](index.Link.md)
- [RichText](index.RichText.md)
- [constants](index.constants.md)
- [mediaApi](index.mediaApi.md)
- [trackingApi](index.trackingApi.md)

### Enumerations

- [LayoutServicePageState](../enums/index.LayoutServicePageState.md)

### Classes

- [AxiosDataFetcher](../classes/index.AxiosDataFetcher.md)
- [ComponentPropsService](../classes/index.ComponentPropsService.md)
- [DisconnectedSitemapService](../classes/index.DisconnectedSitemapService.md)
- [EditingDataService](../classes/index.EditingDataService.md)
- [GraphQLDictionaryService](../classes/index.GraphQLDictionaryService.md)
- [GraphQLLayoutService](../classes/index.GraphQLLayoutService.md)
- [GraphQLRequestClient](../classes/index.GraphQLRequestClient.md)
- [GraphQLSitemapService](../classes/index.GraphQLSitemapService.md)
- [RestDictionaryService](../classes/index.RestDictionaryService.md)
- [RestLayoutService](../classes/index.RestLayoutService.md)
- [SitecoreContext](../classes/index.SitecoreContext.md)

### Interfaces

- [CampaignInstance](../interfaces/index.CampaignInstance.md)
- [ComponentFields](../interfaces/index.ComponentFields.md)
- [ComponentParams](../interfaces/index.ComponentParams.md)
- [ComponentRendering](../interfaces/index.ComponentRendering.md)
- [DictionaryPhrases](../interfaces/index.DictionaryPhrases.md)
- [DictionaryService](../interfaces/index.DictionaryService.md)
- [EditingDataServiceConfig](../interfaces/index.EditingDataServiceConfig.md)
- [EditingPreviewData](../interfaces/index.EditingPreviewData.md)
- [EventInstance](../interfaces/index.EventInstance.md)
- [Field](../interfaces/index.Field.md)
- [FileField](../interfaces/index.FileField.md)
- [GoalInstance](../interfaces/index.GoalInstance.md)
- [GraphQLDictionaryServiceConfig](../interfaces/index.GraphQLDictionaryServiceConfig.md)
- [GraphQLSitemapServiceConfig](../interfaces/index.GraphQLSitemapServiceConfig.md)
- [HtmlElementRendering](../interfaces/index.HtmlElementRendering.md)
- [HttpResponse](../interfaces/index.HttpResponse.md)
- [ImageField](../interfaces/index.ImageField.md)
- [Item](../interfaces/index.Item.md)
- [LayoutService](../interfaces/index.LayoutService.md)
- [LayoutServiceContext](../interfaces/index.LayoutServiceContext.md)
- [LayoutServiceContextData](../interfaces/index.LayoutServiceContextData.md)
- [LayoutServiceData](../interfaces/index.LayoutServiceData.md)
- [LinkField](../interfaces/index.LinkField.md)
- [LinkFieldValue](../interfaces/index.LinkFieldValue.md)
- [OutcomeInstance](../interfaces/index.OutcomeInstance.md)
- [PageViewInstance](../interfaces/index.PageViewInstance.md)
- [RouteData](../interfaces/index.RouteData.md)
- [SitecoreContextState](../interfaces/index.SitecoreContextState.md)
- [TrackingRequestOptions](../interfaces/index.TrackingRequestOptions.md)

### Type aliases

- [AxiosDataFetcherConfig](index.md#axiosdatafetcherconfig)
- [ComponentFactory](index.md#componentfactory)
- [ComponentModule](index.md#componentmodule)
- [ComponentPropsCollection](index.md#componentpropscollection)
- [ComponentPropsContextProps](index.md#componentpropscontextprops)
- [EditingData](index.md#editingdata)
- [GetServerSideComponentProps](index.md#getserversidecomponentprops)
- [GetStaticComponentProps](index.md#getstaticcomponentprops)
- [GraphQLLayoutServiceConfig](index.md#graphqllayoutserviceconfig)
- [HttpDataFetcher](index.md#httpdatafetcher)
- [PlaceholdersData](index.md#placeholdersdata)
- [RestDictionaryServiceConfig](index.md#restdictionaryserviceconfig)
- [RestLayoutServiceConfig](index.md#restlayoutserviceconfig)
- [SitecoreContextValue](index.md#sitecorecontextvalue)
- [StaticPath](index.md#staticpath)

### Variables

- [ComponentPropsReactContext](index.md#componentpropsreactcontext)
- [DateField](index.md#datefield)
- [File](index.md#file)
- [Image](index.md#image)
- [Link](index.md#link)
- [RichText](index.md#richtext)
- [SitecoreContextReactContext](index.md#sitecorecontextreactcontext)
- [Text](index.md#text)
- [editingDataService](index.md#editingdataservice)

### Functions

- [ComponentPropsContext](index.md#componentpropscontext)
- [Placeholder](index.md#placeholder)
- [VisitorIdentification](index.md#visitoridentification)
- [getChildPlaceholder](index.md#getchildplaceholder)
- [getFieldValue](index.md#getfieldvalue)
- [getPublicUrl](index.md#getpublicurl)
- [handleEditorFastRefresh](index.md#handleeditorfastrefresh)
- [handleExperienceEditorFastRefresh](index.md#handleexperienceeditorfastrefresh)
- [isEditingData](index.md#iseditingdata)
- [isEditorActive](index.md#iseditoractive)
- [isExperienceEditorActive](index.md#isexperienceeditoractive)
- [resetEditorChromes](index.md#reseteditorchromes)
- [resetExperienceEditorChromes](index.md#resetexperienceeditorchromes)
- [useComponentProps](index.md#usecomponentprops)
- [useSitecoreContext](index.md#usesitecorecontext)
- [withDatasourceCheck](index.md#withdatasourcecheck)
- [withEditorChromes](index.md#witheditorchromes)
- [withExperienceEditorChromes](index.md#withexperienceeditorchromes)
- [withPlaceholder](index.md#withplaceholder)
- [withSitecoreContext](index.md#withsitecorecontext)

## Type aliases

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: `AxiosRequestConfig` & `AxiosDataFetcherOptions`

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:33

___

### ComponentFactory

Ƭ **ComponentFactory**: (`componentName`: `string`) => `ComponentType` \| ``null``

#### Type declaration

▸ (`componentName`): `ComponentType` \| ``null``

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentName` | `string` |

##### Returns

`ComponentType` \| ``null``

#### Defined in

sitecore-jss-react/types/components/sharedTypes.d.ts:2

___

### ComponentModule

Ƭ **ComponentModule**: (`componentName`: `string`) => `Module` \| `Promise`<`Module`\> \| `undefined`

#### Type declaration

▸ (`componentName`): `Module` \| `Promise`<`Module`\> \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentName` | `string` |

##### Returns

`Module` \| `Promise`<`Module`\> \| `undefined`

`undefined` module not found

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-module.ts:14](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/component-module.ts#L14)

___

### ComponentPropsCollection

Ƭ **ComponentPropsCollection**: `Object`

Shape of component props storage

#### Index signature

▪ [componentUid: `string`]: `unknown`

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L7)

___

### ComponentPropsContextProps

Ƭ **ComponentPropsContextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `value` | [`ComponentPropsCollection`](index.md#componentpropscollection) |

#### Defined in

[sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx:26](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L26)

___

### EditingData

Ƭ **EditingData**: `Object`

Data sent from Experience Editor

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dictionary` | [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) |
| `language` | `string` |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `path` | `string` |

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/editing-data.ts:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/editing-data.ts#L7)

___

### GetServerSideComponentProps

Ƭ **GetServerSideComponentProps**: `ComponentPropsFetchFunction`<`GetServerSidePropsContext`\>

Shape of getServerSideProps function on component level

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:23](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L23)

___

### GetStaticComponentProps

Ƭ **GetStaticComponentProps**: `ComponentPropsFetchFunction`<`GetStaticPropsContext`\>

Shape of getStaticProps function on component level

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:28](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L28)

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

sitecore-jss/types/layout/graphql-layout-service.d.ts:4

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

sitecore-jss/types/data-fetcher.d.ts:24

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

sitecore-jss/types/layout/models.d.ts:59

___

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: `CacheOptions` & { `apiHost`: `string` ; `apiKey`: `string` ; `dataFetcher?`: [`HttpDataFetcher`](index.md#httpdatafetcher)<`RestDictionaryServiceData`\> ; `siteName`: `string`  }

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:10

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | `DataFetcherResolver` | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

#### Defined in

sitecore-jss/types/layout/rest-layout-service.d.ts:14

___

### SitecoreContextValue

Ƭ **SitecoreContextValue**: [`LayoutServiceContext`](../interfaces/index.LayoutServiceContext.md) & { `itemId?`: `string` ; `route?`: [`RouteData`](../interfaces/index.RouteData.md)  }

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:15

___

### StaticPath

Ƭ **StaticPath**: `Object`

Object model of a site page item.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `locale?` | `string` |
| `params` | `Object` |
| `params.path` | `string`[] |

#### Defined in

[sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:59](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L59)

## Variables

### ComponentPropsReactContext

• **ComponentPropsReactContext**: `Context`<[`ComponentPropsCollection`](index.md#componentpropscollection)\>

Component props context which we are using in order to store data fetched on components level (getStaticProps/getServerSideProps)

#### Defined in

[sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L7)

___

### DateField

• **DateField**: `React.SFC`<`DateFieldProps`\>

#### Defined in

sitecore-jss-react/types/components/Date.d.ts:21

___

### File

• **File**: `React.SFC`<`FileProps`\>

#### Defined in

sitecore-jss-react/types/components/File.d.ts:18

___

### Image

• **Image**: `React.SFC`<`ImageProps`\>

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:58

___

### Link

• **Link**: `Object`

#### Call signature

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `LinkProps` |

##### Returns

`Element`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultProps` | `Object` |
| `defaultProps.editable` | `boolean` |
| `displayName` | `string` |
| `propTypes` | `Object` |
| `propTypes.children` | `Requireable`<`ReactNodeLike`\> |
| `propTypes.editable` | `Requireable`<`boolean`\> |
| `propTypes.field` | `Validator`<`InferProps`<`Object`\> \| `InferProps`<`Object`\>\> |
| `propTypes.internalLinkMatcher` | `Requireable`<`RegExp`\> |
| `propTypes.showLinkTextWithChildrenPresent` | `Requireable`<`boolean`\> |

#### Defined in

[sitecore-jss-nextjs/src/components/Link.tsx:20](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/Link.tsx#L20)

___

### RichText

• **RichText**: `Object`

#### Call signature

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RichTextProps` |

##### Returns

`Element`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultProps` | `Object` |
| `defaultProps.editable` | `boolean` |
| `defaultProps.tag` | `string` |
| `displayName` | `string` |
| `propTypes` | `Object` |
| `propTypes.editable` | `Requireable`<`boolean`\> |
| `propTypes.field` | `Requireable`<`InferProps`<`Object`\>\> |
| `propTypes.internalLinksSelector` | `Requireable`<`string`\> |
| `propTypes.tag` | `Requireable`<`string`\> |

#### Defined in

[sitecore-jss-nextjs/src/components/RichText.tsx:20](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L20)

___

### SitecoreContextReactContext

• **SitecoreContextReactContext**: `React.Context`<[`SitecoreContextState`](../interfaces/index.SitecoreContextState.md)\>

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:13

___

### Text

• **Text**: `FunctionComponent`<`TextProps`\>

#### Defined in

sitecore-jss-react/types/components/Text.d.ts:25

___

### editingDataService

• **editingDataService**: [`EditingDataService`](../classes/index.EditingDataService.md)

EditingDataService singleton (with default values)

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:104](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L104)

## Functions

### ComponentPropsContext

▸ `Const` **ComponentPropsContext**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ComponentPropsContextProps`](index.md#componentpropscontextprops) |

#### Returns

`Element`

#### Defined in

[sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx:31](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L31)

___

### Placeholder

▸ `Const` **Placeholder**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderComponentProps` |

#### Returns

`Element`

#### Defined in

[sitecore-jss-nextjs/src/components/Placeholder.tsx:8](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/Placeholder.tsx#L8)

___

### VisitorIdentification

▸ `Const` **VisitorIdentification**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `WithSitecoreContextHocProps`<`VIProps`\> |

#### Returns

`Element`

#### Defined in

sitecore-jss-react/types/components/VisitorIdentification.d.ts:6

___

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](../interfaces/index.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/index.HtmlElementRendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](../interfaces/index.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/index.HtmlElementRendering.md))[]

child placeholder

#### Defined in

sitecore-jss/types/layout/utils.d.ts:17

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
| `renderingOrFields` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

#### Defined in

sitecore-jss/types/layout/utils.d.ts:9

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

sitecore-jss/types/layout/utils.d.ts:10

___

### getPublicUrl

▸ `Const` **getPublicUrl**(): `string`

Get the publicUrl.
This is used primarily to enable compatibility with the Sitecore Experience Editor.
This is set to http://localhost:3000 by default.
VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
preview deployment has unique url, we don't know exact url.

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/utils.ts:11](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/utils.ts#L11)

___

### handleEditorFastRefresh

▸ `Const` **handleEditorFastRefresh**(`forceReload?`): `void`

Since Sitecore editors do not support Fast Refresh:
1. Subscribe on events provided by webpack.
2. Reset editor chromes when build is finished

**`default`** forceReload false

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceReload` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/utils.ts:40](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/utils.ts#L40)

___

### handleExperienceEditorFastRefresh

▸ `Const` **handleExperienceEditorFastRefresh**(`forceReload?`): `void`

Since Sitecore editors do not support Fast Refresh:
1. Subscribe on events provided by webpack.
2. Reset editor chromes when build is finished

**`deprecated`** Will be removed in a future release. Please use handleEditorFastRefresh instead.

**`default`** forceReload false

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceReload` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/utils.ts:79](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/utils.ts#L79)

___

### isEditingData

▸ **isEditingData**(`data`): data is EditingData

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `unknown` |

#### Returns

data is EditingData

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/editing-data.ts:17](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/sharedTypes/editing-data.ts#L17)

___

### isEditorActive

▸ `Const` **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

sitecore-jss/types/utils/editing.d.ts:25

___

### isExperienceEditorActive

▸ `Const` **isExperienceEditorActive**(): `boolean`

Determines whether the current execution context is within the Sitecore Experience Editor

**`deprecated`** Will be removed in a future release. Please use isEditorActive instead.

#### Returns

`boolean`

true if executing within the Sitecore Experience Editor

#### Defined in

sitecore-jss/types/utils/editing.d.ts:45

___

### resetEditorChromes

▸ `Const` **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

sitecore-jss/types/utils/editing.d.ts:29

___

### resetExperienceEditorChromes

▸ `Const` **resetExperienceEditorChromes**(): `void`

Resets Sitecore Experience Editor "chromes"

**`deprecated`** Will be removed in a future release. Please use resetEditorChromes instead.

#### Returns

`void`

#### Defined in

sitecore-jss/types/utils/editing.d.ts:50

___

### useComponentProps

▸ **useComponentProps**<`ComponentData`\>(`componentUid`): `ComponentData` \| `undefined`

Hook in order to get access to props related to specific component. Data comes from ComponentPropsContext.

**`see`** ComponentPropsContext

#### Type parameters

| Name |
| :------ |
| `ComponentData` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentUid` | `undefined` \| `string` | component uId |

#### Returns

`ComponentData` \| `undefined`

component props

#### Defined in

[sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx:15](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L15)

___

### useSitecoreContext

▸ **useSitecoreContext**(`options?`): `Object`

This hook grants acсess to the current SiteCore page context
by default JSS includes the following properties in this context:
- pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
- pageState - Like pageEditing, but a string: normal, preview or edit.
- site - Provided by Layout Service, an object containing the name of the current Sitecore site context.

**`see`** https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-extending-context

**`example`**
const EditMode = () => {
   const { sitecoreContext } = useSitecoreContext();
   return <span>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}

**`example`**
const EditMode = () => {
   const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });
   const onClick = () => updateSitecoreContext({ pageEditing: true });
   return <span onClick={onClick}>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithSitecoreContextOptions` |

#### Returns

`Object`

{ sitecoreContext, updateSitecoreContext }

| Name | Type |
| :------ | :------ |
| `sitecoreContext` | [`SitecoreContextValue`](index.md#sitecorecontextvalue) |
| `updateSitecoreContext` | (`value`: [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) \| [`SitecoreContextValue`](index.md#sitecorecontextvalue)) => `void` |

#### Defined in

sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:43

___

### withDatasourceCheck

▸ **withDatasourceCheck**(`options?`): <ComponentProps\>(`Component`: `React.ComponentType`<`ComponentProps`\>) => (`props`: `ComponentProps`) => `JSX.Element`

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithDatasourceCheckOptions` |

#### Returns

`fn`

 The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

▸ <`ComponentProps`\>(`Component`): (`props`: `ComponentProps`) => `JSX.Element`

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

##### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentProps` | extends `WithDatasourceCheckProps` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `React.ComponentType`<`ComponentProps`\> |

##### Returns

`fn`

 The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ComponentProps` |

##### Returns

`JSX.Element`

#### Defined in

sitecore-jss-react/types/enhancers/withDatasourceCheck.d.ts:21

___

### withEditorChromes

▸ `Const` **withEditorChromes**(`WrappedComponent`): `ComponentClass`<`Object`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`unknown`, `any`\> \| `SFC`<`unknown`\> |

#### Returns

`ComponentClass`<`Object`, `any`\>

#### Defined in

sitecore-jss-react/types/enhancers/withEditorChromes.d.ts:2

___

### withExperienceEditorChromes

▸ `Const` **withExperienceEditorChromes**(`WrappedComponent`): `ComponentClass`<`Object`, `any`\>

**`deprecated`** Will be removed in a future release. Please use withEditorChromes instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`unknown`, `any`\> \| `SFC`<`unknown`\> |

#### Returns

`ComponentClass`<`Object`, `any`\>

#### Defined in

sitecore-jss-react/types/enhancers/withEditorChromes.d.ts:6

___

### withPlaceholder

▸ **withPlaceholder**(`placeholders`, `options?`): (`WrappedComponent`: `React.ComponentClass`<`PlaceholderProps`\> \| `React.FunctionComponent`<`PlaceholderProps`\>) => (`props`: `PlaceholderProps`) => `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholders` | `WithPlaceholderSpec` |
| `options?` | `WithPlaceholderOptions` |

#### Returns

`fn`

▸ (`WrappedComponent`): (`props`: `PlaceholderProps`) => `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `React.ComponentClass`<`PlaceholderProps`\> \| `React.FunctionComponent`<`PlaceholderProps`\> |

##### Returns

`fn`

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderProps` |

##### Returns

`JSX.Element`

#### Defined in

sitecore-jss-react/types/enhancers/withPlaceholder.d.ts:34

___

### withSitecoreContext

▸ **withSitecoreContext**(`options?`): <ComponentProps\>(`Component`: `React.ComponentType`<`ComponentProps`\>) => (`props`: `WithSitecoreContextHocProps`<`ComponentProps`\>) => `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithSitecoreContextOptions` |

#### Returns

`fn`

▸ <`ComponentProps`\>(`Component`): (`props`: `WithSitecoreContextHocProps`<`ComponentProps`\>) => `JSX.Element`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentProps` | extends `ComponentConsumerProps` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `React.ComponentType`<`ComponentProps`\> |

##### Returns

`fn`

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `WithSitecoreContextHocProps`<`ComponentProps`\> |

##### Returns

`JSX.Element`

#### Defined in

sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:17
