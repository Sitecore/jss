@sitecore-jss/sitecore-jss-react

# @sitecore-jss/sitecore-jss-react

## Table of contents

### Namespaces

- [DateField](modules/DateField.md)
- [File](modules/File.md)
- [Image](modules/Image.md)
- [Link](modules/Link.md)
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
- [Item](interfaces/Item.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContext](interfaces/LayoutServiceContext.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [LinkField](interfaces/LinkField.md)
- [LinkFieldValue](interfaces/LinkFieldValue.md)
- [OutcomeInstance](interfaces/OutcomeInstance.md)
- [PageViewInstance](interfaces/PageViewInstance.md)
- [RichTextField](interfaces/RichTextField.md)
- [RichTextProps](interfaces/RichTextProps.md)
- [RouteData](interfaces/RouteData.md)
- [SitecoreContextState](interfaces/SitecoreContextState.md)
- [TextField](interfaces/TextField.md)
- [TrackingRequestOptions](interfaces/TrackingRequestOptions.md)

### Type aliases

- [ComponentFactory](README.md#componentfactory)
- [LinkProps](README.md#linkprops)

### Variables

- [DateField](README.md#datefield)
- [File](README.md#file)
- [Image](README.md#image)
- [Link](README.md#link)
- [LinkPropTypes](README.md#linkproptypes)
- [RichText](README.md#richtext)
- [RichTextPropTypes](README.md#richtextproptypes)
- [SitecoreContextReactContext](README.md#sitecorecontextreactcontext)
- [Text](README.md#text)

### Functions

- [Placeholder](README.md#placeholder)
- [VisitorIdentification](README.md#visitoridentification)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [resetEditorChromes](README.md#reseteditorchromes)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)
- [useSitecoreContext](README.md#usesitecorecontext)
- [withDatasourceCheck](README.md#withdatasourcecheck)
- [withEditorChromes](README.md#witheditorchromes)
- [withExperienceEditorChromes](README.md#withexperienceeditorchromes)
- [withPlaceholder](README.md#withplaceholder)
- [withSitecoreContext](README.md#withsitecorecontext)

## Type aliases

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

[sitecore-jss-react/src/components/sharedTypes.ts:3](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/sharedTypes.ts#L3)

___

### LinkProps

Ƭ **LinkProps**: `React.DetailedHTMLProps`<`React.AnchorHTMLAttributes`<`HTMLAnchorElement`\>, `HTMLAnchorElement`\> & { `editable?`: `boolean` ; `field`: [`LinkField`](interfaces/LinkField.md) \| [`LinkFieldValue`](interfaces/LinkFieldValue.md) ; `showLinkTextWithChildrenPresent?`: `boolean`  }

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:20](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Link.tsx#L20)

## Variables

### DateField

• **DateField**: `React.SFC`<`DateFieldProps`\>

#### Defined in

[sitecore-jss-react/src/components/Date.tsx:26](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Date.tsx#L26)

___

### File

• **File**: `React.SFC`<`FileProps`\>

#### Defined in

[sitecore-jss-react/src/components/File.tsx:23](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/File.tsx#L23)

___

### Image

• **Image**: `React.SFC`<`ImageProps`\>

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:117](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Image.tsx#L117)

___

### Link

• **Link**: `React.SFC`<[`LinkProps`](README.md#linkprops)\>

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:40](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Link.tsx#L40)

___

### LinkPropTypes

• **LinkPropTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `Requireable`<`ReactNodeLike`\> |
| `editable` | `Requireable`<`boolean`\> |
| `field` | `Validator`<`InferProps`<`Object`\> \| `InferProps`<`Object`\>\> |
| `showLinkTextWithChildrenPresent` | `Requireable`<`boolean`\> |

#### Defined in

[sitecore-jss-react/src/components/Link.tsx:117](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Link.tsx#L117)

___

### RichText

• **RichText**: `React.SFC`<[`RichTextProps`](interfaces/RichTextProps.md)\>

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:26](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/RichText.tsx#L26)

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

[sitecore-jss-react/src/components/RichText.tsx:44](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/RichText.tsx#L44)

___

### SitecoreContextReactContext

• **SitecoreContextReactContext**: `Context`<[`SitecoreContextState`](interfaces/SitecoreContextState.md)<`any`\>\>

#### Defined in

[sitecore-jss-react/src/components/SitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L17)

___

### Text

• **Text**: `FunctionComponent`<`TextProps`\>

#### Defined in

[sitecore-jss-react/src/components/Text.tsx:29](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Text.tsx#L29)

## Functions

### Placeholder

▸ `Const` **Placeholder**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderComponentProps` |

#### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:126](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/Placeholder.tsx#L126)

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

[sitecore-jss-react/src/components/VisitorIdentification.tsx:40](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/components/VisitorIdentification.tsx#L40)

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

sitecore-jss/types/layout/utils.d.ts:9

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

sitecore-jss/types/layout/utils.d.ts:10

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

sitecore-jss/types/utils/editing.d.ts:35

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

sitecore-jss/types/utils/editing.d.ts:40

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
| `updateSitecoreContext` | (`value`: `any`) => `void` |

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:70](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L70)

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

[sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx:30](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withDatasourceCheck.tsx#L30)

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

[sitecore-jss-react/src/enhancers/withEditorChromes.tsx:4](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withEditorChromes.tsx#L4)

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

[sitecore-jss-react/src/enhancers/withEditorChromes.tsx:26](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withEditorChromes.tsx#L26)

___

### withPlaceholder

▸ **withPlaceholder**(`placeholders`, `options?`): (`WrappedComponent`: `ComponentClass`<`PlaceholderProps`, `any`\> \| `FunctionComponent`<`PlaceholderProps`\>) => (`props`: `PlaceholderProps`) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholders` | `WithPlaceholderSpec` |
| `options?` | `WithPlaceholderOptions` |

#### Returns

`fn`

▸ (`WrappedComponent`): (`props`: `PlaceholderProps`) => `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `WrappedComponent` | `ComponentClass`<`PlaceholderProps`, `any`\> \| `FunctionComponent`<`PlaceholderProps`\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderProps` |

##### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/enhancers/withPlaceholder.tsx:45](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withPlaceholder.tsx#L45)

___

### withSitecoreContext

▸ **withSitecoreContext**(`options?`): <ComponentProps\>(`Component`: `ComponentType`<`ComponentProps`\>) => (`props`: `WithSitecoreContextHocProps`<`ComponentProps`\>) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `WithSitecoreContextOptions` |

#### Returns

`fn`

▸ <`ComponentProps`\>(`Component`): (`props`: `WithSitecoreContextHocProps`<`ComponentProps`\>) => `Element`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `ComponentProps` | extends `ComponentConsumerProps` |

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
| `props` | `WithSitecoreContextHocProps`<`ComponentProps`\> |

##### Returns

`Element`

#### Defined in

[sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:25](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L25)
