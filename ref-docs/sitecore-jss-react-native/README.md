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

### Functions

- [DateField](README.md#datefield)
- [Image](README.md#image)
- [Link](README.md#link)
- [Placeholder](README.md#placeholder)
- [RichText](README.md#richtext)
- [Text](README.md#text)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [resetEditorChromes](README.md#reseteditorchromes)

## Functions

### DateField

▸ **DateField**(`props`, `context?`): `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`DateFieldProps`\> |
| `context?` | `any` |

#### Returns

`ReactElement`\<`any`, `any`\>

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:544

___

### Image

▸ **Image**(`props`, `context?`): `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`ImageProps`\> |
| `context?` | `any` |

#### Returns

`ReactElement`\<`any`, `any`\>

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:544

___

### Link

▸ **Link**(`props`, `context?`): `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`LinkProps`\> |
| `context?` | `any` |

#### Returns

`ReactElement`\<`any`, `any`\>

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:544

___

### Placeholder

▸ **Placeholder**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PlaceholderComponentProps` |

#### Returns

`Element`

#### Defined in

[sitecore-jss-react-native/src/enhancers/withComponentFactory.tsx:15](https://github.com/Sitecore/jss/blob/34b9884ba/packages/sitecore-jss-react-native/src/enhancers/withComponentFactory.tsx#L15)

___

### RichText

▸ **RichText**(`props`, `context?`): `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`RichTextProps`\> |
| `context?` | `any` |

#### Returns

`ReactElement`\<`any`, `any`\>

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:544

___

### Text

▸ **Text**(`props`, `context?`): `ReactElement`\<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`\<`TextProps`\> |
| `context?` | `any` |

#### Returns

`ReactElement`\<`any`, `any`\>

#### Defined in

sitecore-jss-react-native/node_modules/@types/react/index.d.ts:544

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
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| [`ComponentFields`](interfaces/ComponentFields.md) | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |

#### Returns

`T` \| `undefined`

the field value or null if the field is not defined

#### Defined in

sitecore-jss/types/layout/utils.d.ts:9

▸ **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| [`ComponentFields`](interfaces/ComponentFields.md) |
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

sitecore-jss/types/utils/editing.d.ts:44

___

### resetEditorChromes

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

sitecore-jss/types/utils/editing.d.ts:48
