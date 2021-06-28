---
name: index
routeTemplate: ./data/component-templates/article.yml
title: index
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / index

# Module: index

## Table of contents

### References

- [ComponentModule](/docs/nextjs/ref/modules/index#componentmodule)
- [ComponentPropsCollection](/docs/nextjs/ref/modules/index#componentpropscollection)
- [ComponentPropsContext](/docs/nextjs/ref/modules/index#componentpropscontext)
- [ComponentPropsContextProps](/docs/nextjs/ref/modules/index#componentpropscontextprops)
- [ComponentPropsReactContext](/docs/nextjs/ref/modules/index#componentpropsreactcontext)
- [ComponentPropsService](/docs/nextjs/ref/modules/index#componentpropsservice)
- [DisconnectedSitemapService](/docs/nextjs/ref/modules/index#disconnectedsitemapservice)
- [EditingData](/docs/nextjs/ref/modules/index#editingdata)
- [EditingDataService](/docs/nextjs/ref/modules/index#editingdataservice)
- [EditingDataServiceConfig](/docs/nextjs/ref/modules/index#editingdataserviceconfig)
- [EditingPreviewData](/docs/nextjs/ref/modules/index#editingpreviewdata)
- [GetServerSideComponentProps](/docs/nextjs/ref/modules/index#getserversidecomponentprops)
- [GetStaticComponentProps](/docs/nextjs/ref/modules/index#getstaticcomponentprops)
- [GraphQLSitemapService](/docs/nextjs/ref/modules/index#graphqlsitemapservice)
- [GraphQLSitemapServiceConfig](/docs/nextjs/ref/modules/index#graphqlsitemapserviceconfig)
- [JSS\_MODE\_CONNECTED](/docs/nextjs/ref/modules/index#jss_mode_connected)
- [JSS\_MODE\_DISCONNECTED](/docs/nextjs/ref/modules/index#jss_mode_disconnected)
- [Link](/docs/nextjs/ref/modules/index#link)
- [RichText](/docs/nextjs/ref/modules/index#richtext)
- [StaticPath](/docs/nextjs/ref/modules/index#staticpath)
- [editingDataService](/docs/nextjs/ref/modules/index#editingdataservice)
- [getPublicUrl](/docs/nextjs/ref/modules/index#getpublicurl)
- [handleExperienceEditorFastRefresh](/docs/nextjs/ref/modules/index#handleexperienceeditorfastrefresh)
- [isEditingData](/docs/nextjs/ref/modules/index#iseditingdata)
- [useComponentProps](/docs/nextjs/ref/modules/index#usecomponentprops)

### Namespaces

- [mediaApi](/docs/nextjs/ref/modules/index/mediaapi)

### Enumerations

- [LayoutServicePageState](/docs/nextjs/ref/enums/index/layoutservicepagestate)

### Classes

- [AxiosDataFetcher](/docs/nextjs/ref/classes/index/axiosdatafetcher)
- [GraphQLDictionaryService](/docs/nextjs/ref/classes/index/graphqldictionaryservice)
- [GraphQLLayoutService](/docs/nextjs/ref/classes/index/graphqllayoutservice)
- [GraphQLRequestClient](/docs/nextjs/ref/classes/index/graphqlrequestclient)
- [RestDictionaryService](/docs/nextjs/ref/classes/index/restdictionaryservice)
- [RestLayoutService](/docs/nextjs/ref/classes/index/restlayoutservice)
- [SitecoreContext](/docs/nextjs/ref/classes/index/sitecorecontext)

### Interfaces

- [ComponentFields](/docs/nextjs/ref/interfaces/index/componentfields)
- [ComponentParams](/docs/nextjs/ref/interfaces/index/componentparams)
- [ComponentRendering](/docs/nextjs/ref/interfaces/index/componentrendering)
- [DictionaryPhrases](/docs/nextjs/ref/interfaces/index/dictionaryphrases)
- [DictionaryService](/docs/nextjs/ref/interfaces/index/dictionaryservice)
- [Field](/docs/nextjs/ref/interfaces/index/field)
- [FileField](/docs/nextjs/ref/interfaces/index/filefield)
- [GraphQLDictionaryServiceConfig](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig)
- [HtmlElementRendering](/docs/nextjs/ref/interfaces/index/htmlelementrendering)
- [HttpResponse](/docs/nextjs/ref/interfaces/index/httpresponse)
- [ImageField](/docs/nextjs/ref/interfaces/index/imagefield)
- [Item](/docs/nextjs/ref/interfaces/index/item)
- [LayoutService](/docs/nextjs/ref/interfaces/index/layoutservice)
- [LayoutServiceContext](/docs/nextjs/ref/interfaces/index/layoutservicecontext)
- [LayoutServiceContextData](/docs/nextjs/ref/interfaces/index/layoutservicecontextdata)
- [LayoutServiceData](/docs/nextjs/ref/interfaces/index/layoutservicedata)
- [LayoutServiceRequestOptions](/docs/nextjs/ref/interfaces/index/layoutservicerequestoptions)
- [LinkField](/docs/nextjs/ref/interfaces/index/linkfield)
- [LinkFieldValue](/docs/nextjs/ref/interfaces/index/linkfieldvalue)
- [ManifestInstance](/docs/nextjs/ref/interfaces/index/manifestinstance)
- [RouteData](/docs/nextjs/ref/interfaces/index/routedata)
- [SitecoreContextState](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)

### Type aliases

- [AxiosDataFetcherConfig](/docs/nextjs/ref/modules/index#axiosdatafetcherconfig)
- [ComponentFactory](/docs/nextjs/ref/modules/index#componentfactory)
- [GraphQLLayoutServiceConfig](/docs/nextjs/ref/modules/index#graphqllayoutserviceconfig)
- [HttpDataFetcher](/docs/nextjs/ref/modules/index#httpdatafetcher)
- [PlaceholdersData](/docs/nextjs/ref/modules/index#placeholdersdata)
- [RestDictionaryServiceConfig](/docs/nextjs/ref/modules/index#restdictionaryserviceconfig)
- [RestLayoutServiceConfig](/docs/nextjs/ref/modules/index#restlayoutserviceconfig)

### Variables

- [DateField](/docs/nextjs/ref/modules/index#datefield)
- [File](/docs/nextjs/ref/modules/index#file)
- [Image](/docs/nextjs/ref/modules/index#image)
- [SitecoreContextReactContext](/docs/nextjs/ref/modules/index#sitecorecontextreactcontext)
- [Text](/docs/nextjs/ref/modules/index#text)
- [dataApi](/docs/nextjs/ref/modules/index#dataapi)

### Functions

- [Placeholder](/docs/nextjs/ref/modules/index#placeholder)
- [VisitorIdentification](/docs/nextjs/ref/modules/index#visitoridentification)
- [getChildPlaceholder](/docs/nextjs/ref/modules/index#getchildplaceholder)
- [getFieldValue](/docs/nextjs/ref/modules/index#getfieldvalue)
- [isExperienceEditorActive](/docs/nextjs/ref/modules/index#isexperienceeditoractive)
- [resetExperienceEditorChromes](/docs/nextjs/ref/modules/index#resetexperienceeditorchromes)
- [useSitecoreContext](/docs/nextjs/ref/modules/index#usesitecorecontext)
- [withDatasourceCheck](/docs/nextjs/ref/modules/index#withdatasourcecheck)
- [withExperienceEditorChromes](/docs/nextjs/ref/modules/index#withexperienceeditorchromes)
- [withPlaceholder](/docs/nextjs/ref/modules/index#withplaceholder)
- [withSitecoreContext](/docs/nextjs/ref/modules/index#withsitecorecontext)

## References

### ComponentModule

Re-exports: [ComponentModule](/docs/nextjs/ref/modules/sharedtypes_component_module#componentmodule)

___

### ComponentPropsCollection

Re-exports: [ComponentPropsCollection](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)

___

### ComponentPropsContext

Re-exports: [ComponentPropsContext](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropscontext)

___

### ComponentPropsContextProps

Re-exports: [ComponentPropsContextProps](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropscontextprops)

___

### ComponentPropsReactContext

Re-exports: [ComponentPropsReactContext](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropsreactcontext)

___

### ComponentPropsService

Re-exports: [ComponentPropsService](/docs/nextjs/ref/classes/services_component_props_service/componentpropsservice)

___

### DisconnectedSitemapService

Re-exports: [DisconnectedSitemapService](/docs/nextjs/ref/classes/services_disconnected_sitemap_service/disconnectedsitemapservice)

___

### EditingData

Re-exports: [EditingData](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

___

### EditingDataService

Re-exports: [EditingDataService](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice)

___

### EditingDataServiceConfig

Re-exports: [EditingDataServiceConfig](/docs/nextjs/ref/interfaces/services_editing_data_service/editingdataserviceconfig)

___

### EditingPreviewData

Re-exports: [EditingPreviewData](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata)

___

### GetServerSideComponentProps

Re-exports: [GetServerSideComponentProps](/docs/nextjs/ref/modules/sharedtypes_component_props#getserversidecomponentprops)

___

### GetStaticComponentProps

Re-exports: [GetStaticComponentProps](/docs/nextjs/ref/modules/sharedtypes_component_props#getstaticcomponentprops)

___

### GraphQLSitemapService

Re-exports: [GraphQLSitemapService](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice)

___

### GraphQLSitemapServiceConfig

Re-exports: [GraphQLSitemapServiceConfig](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig)

___

### JSS\_MODE\_CONNECTED

Re-exports: [JSS\_MODE\_CONNECTED](/docs/nextjs/ref/modules/constants#jss_mode_connected)

___

### JSS\_MODE\_DISCONNECTED

Re-exports: [JSS\_MODE\_DISCONNECTED](/docs/nextjs/ref/modules/constants#jss_mode_disconnected)

___

### Link

Re-exports: [Link](/docs/nextjs/ref/modules/components_link#link)

___

### RichText

Re-exports: [RichText](/docs/nextjs/ref/modules/components_richtext#richtext)

___

### StaticPath

Re-exports: [StaticPath](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)

___

### editingDataService

Re-exports: [editingDataService](/docs/nextjs/ref/modules/services_editing_data_service#editingdataservice)

___

### getPublicUrl

Re-exports: [getPublicUrl](/docs/nextjs/ref/modules/utils#getpublicurl)

___

### handleExperienceEditorFastRefresh

Re-exports: [handleExperienceEditorFastRefresh](/docs/nextjs/ref/modules/utils#handleexperienceeditorfastrefresh)

___

### isEditingData

Re-exports: [isEditingData](/docs/nextjs/ref/modules/sharedtypes_editing_data#iseditingdata)

___

### useComponentProps

Re-exports: [useComponentProps](/docs/nextjs/ref/modules/components_componentpropscontext#usecomponentprops)

## Type aliases

### AxiosDataFetcherConfig

Ƭ **AxiosDataFetcherConfig**: `AxiosRequestConfig` & `AxiosDataFetcherOptions`

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

___

### GraphQLLayoutServiceConfig

Ƭ **GraphQLLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for authentication |
| `endpoint` | `string` | Your Graphql endpoint |
| `formatLayoutQuery?` | (`siteName`: `string`, `itemPath`: `string`, `locale?`: `string`) => `string` | - |
| `siteName` | `string` | The JSS application name |

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: { [key: string]: `unknown`;  }) => `Promise`<[`HttpResponse`](/docs/nextjs/ref/interfaces/index/httpresponse)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](/docs/nextjs/ref/interfaces/index/httpresponse)<`T`\>\>

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
| `data?` | `Object` |

##### Returns

`Promise`<[`HttpResponse`](/docs/nextjs/ref/interfaces/index/httpresponse)<`T`\>\>

___

### PlaceholdersData

Ƭ **PlaceholdersData**<`TYPEDNAME`\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[]}

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string``string` |

___

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: `CacheOptions` & { `apiHost`: `string` ; `apiKey`: `string` ; `dataFetcher?`: [`HttpDataFetcher`](/docs/nextjs/ref/modules/index#httpdatafetcher)<`RestDictionaryServiceData`\> ; `siteName`: `string`  }

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

## Variables

### DateField

• `Const` **DateField**: `React.SFC`<`DateFieldProps`\>

___

### File

• `Const` **File**: `React.SFC`<`FileProps`\>

___

### Image

• `Const` **Image**: `React.SFC`<`ImageProps`\>

___

### SitecoreContextReactContext

• `Const` **SitecoreContextReactContext**: `React.Context`<[`SitecoreContextState`](/docs/nextjs/ref/interfaces/index/sitecorecontextstate)<`any`\>\>

___

### Text

• `Const` **Text**: `FunctionComponent`<`TextProps`\>

___

### dataApi

• `Const` **dataApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fetchPlaceholderData` | typeof `fetchPlaceholderData` |
| `fetchRouteData` | typeof `fetchRouteData` |

## Functions

### Placeholder

▸ `Const` **Placeholder**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderComponentProps` |

#### Returns

`Element`

___

### VisitorIdentification

▸ `Const` **VisitorIdentification**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Pick`<`VIProps`, `never`\> |

#### Returns

`Element`

___

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) \| [`HtmlElementRendering`](/docs/nextjs/ref/interfaces/index/htmlelementrendering))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) \| [`HtmlElementRendering`](/docs/nextjs/ref/interfaces/index/htmlelementrendering))[]

child placeholder

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
| `renderingOrFields` | [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

___

### isExperienceEditorActive

▸ `Const` **isExperienceEditorActive**(): `boolean`

#### Returns

`boolean`

___

### resetExperienceEditorChromes

▸ `Const` **resetExperienceEditorChromes**(): `void`

#### Returns

`void`

___

### useSitecoreContext

▸ **useSitecoreContext**<`Context`\>(`options?`): `Object`

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

#### Type parameters

| Name |
| :------ |
| `Context` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithSitecoreContextOptions` |

#### Returns

`Object`

{ sitecoreContext, updateSitecoreContext }

| Name | Type |
| :------ | :------ |
| `sitecoreContext` | `Context` |
| `updateSitecoreContext` | (`value`: `any`) => `void` \| `undefined` |

___

### withDatasourceCheck

▸ **withDatasourceCheck**(`options?`): <ComponentProps\>(`Component`: `React.ComponentType`<`ComponentProps`\>) => (`props`: `ComponentProps`) => `JSX.Element` \| ``null``

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithDatasourceCheckOptions` |

#### Returns

`fn`

 The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

▸ <`ComponentProps`\>(`Component`): (`props`: `ComponentProps`) => `JSX.Element` \| ``null``

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

▸ (`props`): `JSX.Element` \| ``null``

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ComponentProps` |

##### Returns

`JSX.Element` \| ``null``

___

### withExperienceEditorChromes

▸ `Const` **withExperienceEditorChromes**(`WrappedComponent`): `ComponentClass`<`Object`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`unknown`, `any`\> \| `SFC`<`unknown`\> |

#### Returns

`ComponentClass`<`Object`, `any`\>

___

### withPlaceholder

▸ **withPlaceholder**(`placeholders`, `options?`): (`WrappedComponent`: `React.ComponentClass`<`any`, `any`\> \| `React.SFC`<`any`\>) => (`props`: `PlaceholderProps`) => `JSX.Element`

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
| `WrappedComponent` | `React.ComponentClass`<`any`, `any`\> \| `React.SFC`<`any`\> |

##### Returns

`fn`

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderProps` |

##### Returns

`JSX.Element`

___

### withSitecoreContext

▸ **withSitecoreContext**(`options?`): <ComponentProps\>(`Component`: `React.ComponentType`<`ComponentProps`\>) => (`props`: `Pick`<`ComponentProps`, `Exclude`<keyof `ComponentProps`, ``"sitecoreContext"`` \| ``"updateSitecoreContext"``\>\>) => `JSX.Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithSitecoreContextOptions` |

#### Returns

`fn`

▸ <`ComponentProps`\>(`Component`): (`props`: `Pick`<`ComponentProps`, `Exclude`<keyof `ComponentProps`, ``"sitecoreContext"`` \| ``"updateSitecoreContext"``\>\>) => `JSX.Element`

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
| `props` | `Pick`<`ComponentProps`, `Exclude`<keyof `ComponentProps`, ``"sitecoreContext"`` \| ``"updateSitecoreContext"``\>\> |

##### Returns

`JSX.Element`
