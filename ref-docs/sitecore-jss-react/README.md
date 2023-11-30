@sitecore-jss/sitecore-jss-react

# @sitecore-jss/sitecore-jss-react

## Table of contents

### Namespaces

- [DateField](modules/DateField.md)
- [File](modules/File.md)
- [Image](modules/Image.md)
- [Text](modules/Text.md)
- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)
- [trackingApi](modules/trackingApi.md)

### Enumerations

- [LayoutServicePageState](enums/LayoutServicePageState.md)

### Classes

- [BYOCComponent](classes/BYOCComponent.md)
- [ComponentBuilder](classes/ComponentBuilder.md)
- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [RestDictionaryService](classes/RestDictionaryService.md)
- [RestLayoutService](classes/RestLayoutService.md)
- [SitecoreContext](classes/SitecoreContext.md)

### Interfaces

- [CampaignInstance](interfaces/CampaignInstance.md)
- [ComponentConsumerProps](interfaces/ComponentConsumerProps.md)
- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [DateFieldProps](interfaces/DateFieldProps.md)
- [DictionaryPhrases](interfaces/DictionaryPhrases.md)
- [DictionaryService](interfaces/DictionaryService.md)
- [EditFrameProps](interfaces/EditFrameProps.md)
- [EventInstance](interfaces/EventInstance.md)
- [Field](interfaces/Field.md)
- [FileField](interfaces/FileField.md)
- [GoalInstance](interfaces/GoalInstance.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [ImageField](interfaces/ImageField.md)
- [ImageFieldValue](interfaces/ImageFieldValue.md)
- [ImageProps](interfaces/ImageProps.md)
- [ImageSizeParameters](interfaces/ImageSizeParameters.md)
- [Item](interfaces/Item.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContext](interfaces/LayoutServiceContext.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [LinkField](interfaces/LinkField.md)
- [LinkFieldValue](interfaces/LinkFieldValue.md)
- [OutcomeInstance](interfaces/OutcomeInstance.md)
- [PageViewInstance](interfaces/PageViewInstance.md)
- [PlaceholderComponentProps](interfaces/PlaceholderComponentProps.md)
- [RichTextField](interfaces/RichTextField.md)
- [RichTextProps](interfaces/RichTextProps.md)
- [RouteData](interfaces/RouteData.md)
- [SitecoreContextState](interfaces/SitecoreContextState.md)
- [TextField](interfaces/TextField.md)
- [TrackingRequestOptions](interfaces/TrackingRequestOptions.md)
- [WithSitecoreContextOptions](interfaces/WithSitecoreContextOptions.md)
- [WithSitecoreContextProps](interfaces/WithSitecoreContextProps.md)

### Type Aliases

- [BYOCComponentParams](README.md#byoccomponentparams)
- [BYOCComponentProps](README.md#byoccomponentprops)
- [ComponentBuilderConfig](README.md#componentbuilderconfig)
- [ComponentFactory](README.md#componentfactory)
- [EditButtonTypes](README.md#editbuttontypes)
- [EditFrameDataSource](README.md#editframedatasource)
- [FEaaSComponentParams](README.md#feaascomponentparams)
- [FEaaSComponentProps](README.md#feaascomponentprops)
- [FieldEditButton](README.md#fieldeditbutton)
- [LinkProps](README.md#linkprops)
- [SitecoreContextValue](README.md#sitecorecontextvalue)
- [WebEditButton](README.md#webeditbutton)
- [WithSitecoreContextHocProps](README.md#withsitecorecontexthocprops)

### Variables

- [DefaultEditFrameButton](README.md#defaulteditframebutton)
- [DefaultEditFrameButtons](README.md#defaulteditframebuttons)
- [LinkPropTypes](README.md#linkproptypes)
- [RichTextPropTypes](README.md#richtextproptypes)
- [SitecoreContextReactContext](README.md#sitecorecontextreactcontext)

### Functions

- [BYOCWrapper](README.md#byocwrapper)
- [DateField](README.md#datefield)
- [EditFrame](README.md#editframe)
- [FEaaSComponent](README.md#feaascomponent)
- [FEaaSWrapper](README.md#feaaswrapper)
- [File](README.md#file)
- [Image](README.md#image)
- [Link](README.md#link)
- [Placeholder](README.md#placeholder)
- [RichText](README.md#richtext)
- [Text](README.md#text)
- [VisitorIdentification](README.md#visitoridentification)
- [enableDebug](README.md#enabledebug)
- [fetchBYOCComponentServerProps](README.md#fetchbyoccomponentserverprops)
- [fetchFEaaSComponentServerProps](README.md#fetchfeaascomponentserverprops)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getEEMarkup](README.md#geteemarkup)
- [getFEAASLibraryStylesheetLinks](README.md#getfeaaslibrarystylesheetlinks)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [resetEditorChromes](README.md#reseteditorchromes)
- [useSitecoreContext](README.md#usesitecorecontext)
- [withDatasourceCheck](README.md#withdatasourcecheck)
- [withEditorChromes](README.md#witheditorchromes)
- [withPlaceholder](README.md#withplaceholder)
- [withSitecoreContext](README.md#withsitecorecontext)

## Type Aliases

### BYOCComponentParams

Ƭ **BYOCComponentParams**: `Object`

Data from rendering params on Sitecore's BYOC rendering

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ComponentName?` | `string` | Name of the component to render |
| `ComponentProps?` | `string` | JSON props to pass into rendered component |
| `RenderingIdentifier?` | `string` | - |
| `styles?` | `string` | A string with classes that can be used to apply themes, via SXA functionality |

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:22](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L22)

___

### BYOCComponentProps

Ƭ **BYOCComponentProps**: `BYOCComponentClientProps` & `BYOCServerProps`

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:63](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L63)

___

### ComponentBuilderConfig

Ƭ **ComponentBuilderConfig**<`ComponentType`\>: `Object`

Configuration for ComponentBuilder

#### Type parameters

| Name |
| :------ |
| `ComponentType` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `Map`<`string`, `ComponentType`\> | List of components to be stored |

#### Defined in

[sitecore-jss-react/src/ComponentBuilder.ts:7](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/ComponentBuilder.ts#L7)

___

### ComponentFactory

Ƭ **ComponentFactory**: (`componentName`: `string`, `exportName?`: `string`) => `ComponentType` \| ``null``

#### Type declaration

▸ (`componentName`, `exportName?`): `ComponentType` \| ``null``

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentName` | `string` | component to be imported from the component factory |
| `exportName?` | `string` | component to be imported in case you export multiple components from the same file |

##### Returns

`ComponentType` \| ``null``

#### Defined in

[sitecore-jss-react/src/components/sharedTypes.ts:7](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/sharedTypes.ts#L7)

___

### EditButtonTypes

Ƭ **EditButtonTypes**: [`WebEditButton`](README.md#webeditbutton) \| [`FieldEditButton`](README.md#fieldeditbutton) \| ``"|"``

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:62

___

### EditFrameDataSource

Ƭ **EditFrameDataSource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `databaseName?` | `string` |
| `itemId` | `string` |
| `language?` | `string` |

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:43

___

### FEaaSComponentParams

Ƭ **FEaaSComponentParams**: `Object`

Params from a Sitecore FEaaS rendering

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ComponentDataOverride?` | `string` |
| `ComponentHTMLOverride?` | `string` |
| `ComponentHostName?` | `string` |
| `ComponentId?` | `string` |
| `ComponentInstanceId?` | `string` |
| `ComponentRevision?` | `RevisionType` |
| `ComponentVersion?` | `string` |
| `LibraryId?` | `string` |
| `RenderingIdentifier?` | `string` |
| `styles?` | `string` |

#### Defined in

[sitecore-jss-react/src/components/FEaaSComponent.tsx:11](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/FEaaSComponent.tsx#L11)

___

### FEaaSComponentProps

Ƭ **FEaaSComponentProps**: `FEaaSComponentServerProps` & `FEaaSComponentClientProps`

#### Defined in

[sitecore-jss-react/src/components/FEaaSComponent.tsx:59](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/FEaaSComponent.tsx#L59)

___

### FieldEditButton

Ƭ **FieldEditButton**: `BaseEditButton` & { `fields`: `string`[]  }

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:54

___

### LinkProps

Ƭ **LinkProps**: `React.DetailedHTMLProps`<`React.AnchorHTMLAttributes`<`HTMLAnchorElement`\>, `HTMLAnchorElement`\> & { `editable?`: `boolean` ; `field`: [`LinkField`](interfaces/LinkField.md) \| [`LinkFieldValue`](interfaces/LinkFieldValue.md) ; `showLinkTextWithChildrenPresent?`: `boolean`  }

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:23](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/Link.tsx#L23)

___

### SitecoreContextValue

Ƭ **SitecoreContextValue**: [`LayoutServiceContext`](interfaces/LayoutServiceContext.md) & { `itemId?`: `string` ; `route?`: [`RouteData`](interfaces/RouteData.md)  }

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:26](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L26)

___

### WebEditButton

Ƭ **WebEditButton**: `BaseEditButton` & { `click`: `string` ; `parameters?`: `Record`<`string`, `string` \| `number` \| `boolean` \| `undefined` \| ``null``\> ; `type?`: `string`  }

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:57

___

### WithSitecoreContextHocProps

Ƭ **WithSitecoreContextHocProps**<`ComponentProps`\>: `Pick`<`ComponentProps`, `Exclude`<keyof `ComponentProps`, keyof [`WithSitecoreContextProps`](interfaces/WithSitecoreContextProps.md)\>\>

#### Type parameters

| Name |
| :------ |
| `ComponentProps` |

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L17)

## Variables

### DefaultEditFrameButton

• `Const` **DefaultEditFrameButton**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | { `fields`: `string`[] ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `edit.fields` | `string`[] |
| `edit.header` | `string` |
| `edit.icon` | `string` |
| `edit.tooltip` | `string` |
| `editRelatedItem` | { `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `editRelatedItem.click` | `string` |
| `editRelatedItem.header` | `string` |
| `editRelatedItem.icon` | `string` |
| `editRelatedItem.tooltip` | `string` |
| `insert` | { `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `insert.click` | `string` |
| `insert.header` | `string` |
| `insert.icon` | `string` |
| `insert.tooltip` | `string` |

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:12

___

### DefaultEditFrameButtons

• `Const` **DefaultEditFrameButtons**: ({ `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } \| { `fields`: `string`[] ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  })[]

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:32

___

### LinkPropTypes

• `Const` **LinkPropTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editable` | `Requireable`<`boolean`\> |
| `field` | `Validator`<`InferProps`<{ `href`: `Requireable`<`any`\>  }\> \| `InferProps`<{ `editableFirstPart`: `Requireable`<`string`\> = PropTypes.string; `editableLastPart`: `Requireable`<`string`\> = PropTypes.string; `value`: `Requireable`<`object`\> = PropTypes.object }\>\> |
| `showLinkTextWithChildrenPresent` | `Requireable`<`boolean`\> |

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:129](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/Link.tsx#L129)

___

### RichTextPropTypes

• `Const` **RichTextPropTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editable` | `Requireable`<`boolean`\> |
| `field` | `Requireable`<`InferProps`<{ `editable`: `Requireable`<`string`\> = PropTypes.string; `value`: `Requireable`<`string`\> = PropTypes.string }\>\> |
| `tag` | `Requireable`<`string`\> |

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:44](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/RichText.tsx#L44)

___

### SitecoreContextReactContext

• `Const` **SitecoreContextReactContext**: `Context`<[`SitecoreContextState`](interfaces/SitecoreContextState.md)\>

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:19](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L19)

## Functions

### BYOCWrapper

▸ **BYOCWrapper**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BYOCComponentProps`](README.md#byoccomponentprops) |

#### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/components/BYOCWrapper.tsx:6](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/BYOCWrapper.tsx#L6)

___

### DateField

▸ **DateField**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`DateFieldProps`](interfaces/DateFieldProps.md) |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### EditFrame

▸ **EditFrame**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<[`EditFrameProps`](interfaces/EditFrameProps.md)\> |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### FEaaSComponent

▸ **FEaaSComponent**(`props`): `Element`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`FEaaSComponentProps`](README.md#feaascomponentprops) | component props |

#### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/components/FEaaSComponent.tsx:64](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/FEaaSComponent.tsx#L64)

___

### FEaaSWrapper

▸ **FEaaSWrapper**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FEaaSComponentProps`](README.md#feaascomponentprops) |

#### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/components/FEaaSWrapper.tsx:6](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/FEaaSWrapper.tsx#L6)

___

### File

▸ **File**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `FileProps` |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### Image

▸ **Image**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ImageProps`](interfaces/ImageProps.md) |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### Link

▸ **Link**(`props`): `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`<[`LinkProps`](README.md#linkprops), ``"ref"``\> & `RefAttributes`<`HTMLAnchorElement`\> |

#### Returns

`ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:362

___

### Placeholder

▸ **Placeholder**(`props`): `JSX.Element`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`PlaceholderComponentProps`](interfaces/PlaceholderComponentProps.md) | props to pass to the wrapped component |

#### Returns

`JSX.Element`

- the rendered component

#### Defined in

[sitecore-jss-react/src/enhancers/withComponentFactory.tsx:20](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withComponentFactory.tsx#L20)

___

### RichText

▸ **RichText**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`RichTextProps`](interfaces/RichTextProps.md) |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### Text

▸ **Text**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `TextProps` |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### VisitorIdentification

▸ **VisitorIdentification**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `VisitorIdentificationProps` |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

sitecore-jss-react/node_modules/@types/react/ts5.0/index.d.ts:532

___

### enableDebug

▸ **enableDebug**(`namespaces`): `void`

Enable debug logging dynamically

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespaces` | `string` | space-separated list of namespaces to enable |

#### Returns

`void`

#### Defined in

sitecore-jss/types/debug.d.ts:7

___

### fetchBYOCComponentServerProps

▸ **fetchBYOCComponentServerProps**(`params`): `Promise`<[`BYOCComponentProps`](README.md#byoccomponentprops)\>

Fetches server component props required for server rendering, based on rendering params.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`BYOCComponentParams`](README.md#byoccomponentparams) | component params |

#### Returns

`Promise`<[`BYOCComponentProps`](README.md#byoccomponentprops)\>

#### Defined in

[sitecore-jss-react/src/components/BYOCComponent.tsx:169](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/BYOCComponent.tsx#L169)

___

### fetchFEaaSComponentServerProps

▸ **fetchFEaaSComponentServerProps**(`params`, `pageState?`, `endpointOverride?`): `Promise`<[`FEaaSComponentProps`](README.md#feaascomponentprops)\>

Fetches server component props required for server rendering, based on rendering params.
Component endpoint will either be retrieved from params or from endpointOverride

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`FEaaSComponentParams`](README.md#feaascomponentparams) | component params |
| `pageState?` | [`LayoutServicePageState`](enums/LayoutServicePageState.md) | page state to determine which component variant to use |
| `endpointOverride?` | `string` | optional override for component endpoint |

#### Returns

`Promise`<[`FEaaSComponentProps`](README.md#feaascomponentprops)\>

#### Defined in

[sitecore-jss-react/src/components/FEaaSComponent.tsx:118](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/FEaaSComponent.tsx#L118)

___

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

sitecore-jss/types/layout/utils.d.ts:17

___

### getEEMarkup

▸ **getEEMarkup**(`imageField`, `imageParams?`, `mediaUrlPrefix?`, `otherProps?`): `Element`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `imageField` | [`ImageField`](interfaces/ImageField.md) | {ImageField} provides the dynamicMedia which is used to render the image |
| `imageParams?` | `Object` | {ImageProp['imageParams']}} provides the image parameters that will be attached to the image URL |
| `mediaUrlPrefix?` | `RegExp` | {RegExp} the url prefix regex used in the mediaApi |
| `otherProps?` | [`ImageProps`](interfaces/ImageProps.md) | {ImageProps} all other props included on the image component |

#### Returns

`Element`

Experience Editor Markup

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:125](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/components/Image.tsx#L125)

___

### getFEAASLibraryStylesheetLinks

▸ **getFEAASLibraryStylesheetLinks**(`layoutData`, `serverUrl?`): `HTMLLink`[]

Walks through rendering tree and returns list of links of all FEAAS Component Library Stylesheets that are used

**`See`**

url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layoutData` | [`LayoutServiceData`](interfaces/LayoutServiceData.md) | Layout service data |
| `serverUrl?` | `string` | server URL, default is |

#### Returns

`HTMLLink`[]

library stylesheet links

#### Defined in

sitecore-jss/types/feaas/themes.d.ts:10

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderingOrFields` | [`ComponentFields`](interfaces/ComponentFields.md) \| [`ComponentRendering`](interfaces/ComponentRendering.md) | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |

#### Returns

`T` \| `undefined`

the field value or null if the field is not defined

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
| `renderingOrFields` | [`ComponentFields`](interfaces/ComponentFields.md) \| [`ComponentRendering`](interfaces/ComponentRendering.md) |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

sitecore-jss/types/layout/utils.d.ts:10

___

### isEditorActive

▸ **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor.
Sitecore Editor environment can be identified only in the browser

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

sitecore-jss/types/utils/editing.d.ts:36

___

### resetEditorChromes

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

sitecore-jss/types/utils/editing.d.ts:40

___

### useSitecoreContext

▸ **useSitecoreContext**(`options?`): `Object`

This hook grants acсess to the current Sitecore page context
by default JSS includes the following properties in this context:
- pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
- pageState - Like pageEditing, but a string: normal, preview or edit.
- site - Provided by Layout Service, an object containing the name of the current Sitecore site context.

**`See`**

https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-extending-context

**`Example`**

```ts
const EditMode = () => {
   const { sitecoreContext } = useSitecoreContext();
   return <span>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}
```

**`Example`**

```ts
const EditMode = () => {
   const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });
   const onClick = () => updateSitecoreContext({ pageEditing: true });
   return <span onClick={onClick}>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WithSitecoreContextOptions`](interfaces/WithSitecoreContextOptions.md) | hook options |

#### Returns

`Object`

{ sitecoreContext, updateSitecoreContext }

| Name | Type |
| :------ | :------ |
| `sitecoreContext` | [`SitecoreContextValue`](README.md#sitecorecontextvalue) |
| `updateSitecoreContext` | (`value`: [`LayoutServiceData`](interfaces/LayoutServiceData.md) \| [`SitecoreContextValue`](README.md#sitecorecontextvalue)) => `void` |

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:70](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L70)

___

### withDatasourceCheck

▸ **withDatasourceCheck**(`options?`): <ComponentProps\>(`Component`: `ComponentType`<`ComponentProps`\>) => (`props`: `ComponentProps`) => `Element`

Checks whether a Sitecore datasource is present and renders appropriately depending on page mode (normal vs editing).

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithDatasourceCheckOptions` |

#### Returns

`fn`

The wrapped component, if a datasource is present.
 A null component (in normal mode) or an error component (in editing mode), if a datasource is not present.

▸ <`ComponentProps`\>(`Component`): (`props`: `ComponentProps`) => `Element`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentProps` | extends `WithDatasourceCheckProps` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<`ComponentProps`\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ComponentProps` |

##### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)

___

### withEditorChromes

▸ **withEditorChromes**(`WrappedComponent`): `ComponentClass`<{}, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\> |

#### Returns

`ComponentClass`<{}, `any`\>

#### Defined in

[sitecore-jss-react/src/enhancers/withEditorChromes.tsx:4](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withEditorChromes.tsx#L4)

___

### withPlaceholder

▸ **withPlaceholder**(`placeholders`, `options?`): (`WrappedComponent`: `ComponentClass`<`PlaceholderProps`, `any`\> \| `FunctionComponent`<`PlaceholderProps`\>) => (`props`: `PlaceholderProps`) => `JSX.Element`

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
| `WrappedComponent` | `ComponentClass`<`PlaceholderProps`, `any`\> \| `FunctionComponent`<`PlaceholderProps`\> |

##### Returns

`fn`

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `PlaceholderProps` | props to pass to the wrapped component |

##### Returns

`JSX.Element`

- the rendered component

| Name | Type |
| :------ | :------ |
| `displayName` | `string` |

#### Defined in

[sitecore-jss-react/src/enhancers/withPlaceholder.tsx:45](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx#L45)

___

### withSitecoreContext

▸ **withSitecoreContext**(`options?`): <ComponentProps\>(`Component`: `ComponentType`<`ComponentProps`\>) => (`props`: [`WithSitecoreContextHocProps`](README.md#withsitecorecontexthocprops)<`ComponentProps`\>) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`WithSitecoreContextOptions`](interfaces/WithSitecoreContextOptions.md) |

#### Returns

`fn`

▸ <`ComponentProps`\>(`Component`): (`props`: [`WithSitecoreContextHocProps`](README.md#withsitecorecontexthocprops)<`ComponentProps`\>) => `Element`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentProps` | extends [`ComponentConsumerProps`](interfaces/ComponentConsumerProps.md) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<`ComponentProps`\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WithSitecoreContextHocProps`](README.md#withsitecorecontexthocprops)<`ComponentProps`\> |

##### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:25](https://github.com/Sitecore/jss/blob/f38246430/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L25)
