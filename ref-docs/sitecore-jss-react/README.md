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
- [DictionaryPhrases](interfaces/DictionaryPhrases.md)
- [DictionaryService](interfaces/DictionaryService.md)
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

### Type aliases

- [ComponentFactory](README.md#componentfactory)
- [LinkProps](README.md#linkprops)
- [SitecoreContextValue](README.md#sitecorecontextvalue)
- [WithSitecoreContextHocProps](README.md#withsitecorecontexthocprops)

### Variables

- [DateField](README.md#datefield)
- [File](README.md#file)
- [Image](README.md#image)
- [Link](README.md#link)
- [LinkPropTypes](README.md#linkproptypes)
- [Placeholder](README.md#placeholder)
- [RichText](README.md#richtext)
- [RichTextPropTypes](README.md#richtextproptypes)
- [SitecoreContextReactContext](README.md#sitecorecontextreactcontext)
- [Text](README.md#text)
- [VisitorIdentification](README.md#visitoridentification)

### Functions

- [enableDebug](README.md#enabledebug)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getEEMarkup](README.md#geteemarkup)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [resetEditorChromes](README.md#reseteditorchromes)
- [useSitecoreContext](README.md#usesitecorecontext)
- [withDatasourceCheck](README.md#withdatasourcecheck)
- [withEditorChromes](README.md#witheditorchromes)
- [withPlaceholder](README.md#withplaceholder)
- [withSitecoreContext](README.md#withsitecorecontext)

## Type aliases

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

[sitecore-jss-react/src/components/sharedTypes.ts:7](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/sharedTypes.ts#L7)

___

### LinkProps

Ƭ **LinkProps**: `React.DetailedHTMLProps`<`React.AnchorHTMLAttributes`<`HTMLAnchorElement`\>, `HTMLAnchorElement`\> & { `editable?`: `boolean` ; `field`: [`LinkField`](interfaces/LinkField.md) \| [`LinkFieldValue`](interfaces/LinkFieldValue.md) ; `showLinkTextWithChildrenPresent?`: `boolean`  }

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:22](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Link.tsx#L22)

___

### SitecoreContextValue

Ƭ **SitecoreContextValue**: [`LayoutServiceContext`](interfaces/LayoutServiceContext.md) & { `itemId?`: `string` ; `route?`: [`RouteData`](interfaces/RouteData.md)  }

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:26](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L26)

___

### WithSitecoreContextHocProps

Ƭ **WithSitecoreContextHocProps**<`ComponentProps`\>: `Pick`<`ComponentProps`, `Exclude`<keyof `ComponentProps`, keyof [`WithSitecoreContextProps`](interfaces/WithSitecoreContextProps.md)\>\>

#### Type parameters

| Name |
| :------ |
| `ComponentProps` |

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L17)

## Variables

### DateField

• **DateField**: `React.FC`<`DateFieldProps`\>

#### Defined in

[sitecore-jss-react/src/components/Date.tsx:24](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Date.tsx#L24)

___

### File

• **File**: `React.FC`<`FileProps`\>

#### Defined in

[sitecore-jss-react/src/components/File.tsx:23](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/File.tsx#L23)

___

### Image

• **Image**: `React.FC`<[`ImageProps`](interfaces/ImageProps.md)\>

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:151](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Image.tsx#L151)

___

### Link

• **Link**: `ForwardRefExoticComponent`<`Pick`<[`LinkProps`](README.md#linkprops), ``"editable"`` \| ``"field"`` \| ``"showLinkTextWithChildrenPresent"`` \| ``"key"`` \| keyof `AnchorHTMLAttributes`<`HTMLAnchorElement`\>\> & `RefAttributes`<`HTMLAnchorElement`\>\>

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:42](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Link.tsx#L42)

___

### LinkPropTypes

• **LinkPropTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editable` | `Requireable`<`boolean`\> |
| `field` | `Validator`<`InferProps`<`Object`\> \| `InferProps`<`Object`\>\> |
| `showLinkTextWithChildrenPresent` | `Requireable`<`boolean`\> |

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:124](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Link.tsx#L124)

___

### Placeholder

• **Placeholder**: `Object`

#### Call signature

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`PlaceholderComponentProps`](interfaces/PlaceholderComponentProps.md) | props to pass to the wrapped component |

##### Returns

`JSX.Element`

- the rendered component

#### Type declaration

| Name | Type |
| :------ | :------ |
| `displayName` | `string` |

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:155](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Placeholder.tsx#L155)

___

### RichText

• **RichText**: `React.FC`<[`RichTextProps`](interfaces/RichTextProps.md)\>

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:26](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/RichText.tsx#L26)

___

### RichTextPropTypes

• **RichTextPropTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editable` | `Requireable`<`boolean`\> |
| `field` | `Requireable`<`InferProps`<`Object`\>\> |
| `tag` | `Requireable`<`string`\> |

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:44](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/RichText.tsx#L44)

___

### SitecoreContextReactContext

• **SitecoreContextReactContext**: `Context`<[`SitecoreContextState`](interfaces/SitecoreContextState.md)\>

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:19](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L19)

___

### Text

• **Text**: `FunctionComponent`<`TextProps`\>

#### Defined in

[sitecore-jss-react/src/components/Text.tsx:29](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Text.tsx#L29)

___

### VisitorIdentification

• **VisitorIdentification**: `FC`<`VisitorIdentificationProps`\> = `VIComponent`

#### Defined in

[sitecore-jss-react/src/components/VisitorIdentification.tsx:41](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/VisitorIdentification.tsx#L41)

## Functions

### enableDebug

▸ `Const` **enableDebug**(`namespaces`): `void`

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

sitecore-jss/types/layout/utils.d.ts:20

___

### getEEMarkup

▸ `Const` **getEEMarkup**(`imageField`, `imageParams?`, `mediaUrlPrefix?`, `otherProps?`): `Element`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `imageField` | [`ImageField`](interfaces/ImageField.md) | provides the dynamicMedia which is used to render the image |
| `imageParams?` | `Object` | provides the image parameters that will be attached to the image URL |
| `mediaUrlPrefix?` | `RegExp` | the url prefix regex used in the mediaApi |
| `otherProps?` | [`ImageProps`](interfaces/ImageProps.md) | all other props included on the image component |

#### Returns

`Element`

Experience Editor Markup

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:125](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/components/Image.tsx#L125)

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
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| `Fields` | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |

#### Returns

`T` \| `undefined`

the field value or null if the field is not defined

#### Defined in

sitecore-jss/types/layout/utils.d.ts:12

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

sitecore-jss/types/layout/utils.d.ts:13

___

### isEditorActive

▸ `Const` **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor.
Sitecore Editor environment can be identified only in the browser

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

sitecore-jss/types/utils/editing.d.ts:36

___

### resetEditorChromes

▸ `Const` **resetEditorChromes**(): `void`

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
| `options?` | [`WithSitecoreContextOptions`](interfaces/WithSitecoreContextOptions.md) |

#### Returns

`Object`

{ sitecoreContext, updateSitecoreContext }

| Name | Type |
| :------ | :------ |
| `sitecoreContext` | [`SitecoreContextValue`](README.md#sitecorecontextvalue) |
| `updateSitecoreContext` | (`value`: [`LayoutServiceData`](interfaces/LayoutServiceData.md) \| [`SitecoreContextValue`](README.md#sitecorecontextvalue)) => `void` |

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:70](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L70)

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

[sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)

___

### withEditorChromes

▸ `Const` **withEditorChromes**(`WrappedComponent`): `ComponentClass`<`Object`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\> |

#### Returns

`ComponentClass`<`Object`, `any`\>

#### Defined in

[sitecore-jss-react/src/enhancers/withEditorChromes.tsx:4](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withEditorChromes.tsx#L4)

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

[sitecore-jss-react/src/enhancers/withPlaceholder.tsx:45](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx#L45)

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

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:25](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L25)
