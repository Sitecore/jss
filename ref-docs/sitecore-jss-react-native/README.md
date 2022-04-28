@sitecore-jss/sitecore-jss-react-native

# @sitecore-jss/sitecore-jss-react-native

## Table of contents

### Namespaces

- [DateField](modules/DateField.md)
- [Image](modules/Image.md)
- [Link](modules/Link.md)
- [RichText](modules/RichText.md)
- [Text](modules/Text.md)
- [mediaApi](modules/mediaApi.md)

### Classes

- [RestLayoutService](classes/RestLayoutService.md)
- [SitecoreContext](classes/SitecoreContext.md)

### Interfaces

- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [Field](interfaces/Field.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [RouteData](interfaces/RouteData.md)

### Variables

- [DateField](README.md#datefield)
- [Image](README.md#image)
- [Link](README.md#link)
- [RichText](README.md#richtext)
- [Text](README.md#text)

### Functions

- [Placeholder](README.md#placeholder)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [resetEditorChromes](README.md#reseteditorchromes)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)

## Variables

### DateField

• **DateField**: `React.FunctionComponent`<`DateFieldProps`\>

#### Defined in

[sitecore-jss-react-native/src/components/Date.tsx:22](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/Date.tsx#L22)

___

### Image

• **Image**: `React.SFC`<`ImageProps`\>

#### Defined in

[sitecore-jss-react-native/src/components/Image.tsx:104](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/Image.tsx#L104)

___

### Link

• **Link**: `React.FunctionComponent`<`LinkProps`\>

#### Defined in

[sitecore-jss-react-native/src/components/Link.tsx:38](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/Link.tsx#L38)

___

### RichText

• **RichText**: `React.SFC`<`RichTextProps`\>

#### Defined in

[sitecore-jss-react-native/src/components/RichText.tsx:14](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/RichText.tsx#L14)

___

### Text

• **Text**: `React.SFC`<`TextProps`\>

#### Defined in

[sitecore-jss-react-native/src/components/Text.tsx:14](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/Text.tsx#L14)

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

[sitecore-jss-react-native/src/components/Placeholder.tsx:103](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react-native/src/components/Placeholder.tsx#L103)

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
