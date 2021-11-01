@sitecore-jss/sitecore-jss-vue

# @sitecore-jss/sitecore-jss-vue

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)
- [trackingApi](modules/trackingApi.md)

### Classes

- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [RestDictionaryService](classes/RestDictionaryService.md)
- [RestLayoutService](classes/RestLayoutService.md)

### Interfaces

- [CampaignInstance](interfaces/CampaignInstance.md)
- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [DictionaryService](interfaces/DictionaryService.md)
- [EventInstance](interfaces/EventInstance.md)
- [Field](interfaces/Field.md)
- [GoalInstance](interfaces/GoalInstance.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [OutcomeInstance](interfaces/OutcomeInstance.md)
- [PageViewInstance](interfaces/PageViewInstance.md)
- [RouteData](interfaces/RouteData.md)
- [TrackingRequestOptions](interfaces/TrackingRequestOptions.md)

### Variables

- [DateField](README.md#datefield)
- [File](README.md#file)
- [Image](README.md#image)
- [Link](README.md#link)
- [Placeholder](README.md#placeholder)
- [RichText](README.md#richtext)
- [SitecoreContext](README.md#sitecorecontext)
- [SitecoreJssPlaceholderPlugin](README.md#sitecorejssplaceholderplugin)
- [Text](README.md#text)

### Functions

- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [isEditorActive](README.md#iseditoractive)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [providePlaceholders](README.md#provideplaceholders)
- [resetEditorChromes](README.md#reseteditorchromes)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)

## Variables

### DateField

• **DateField**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `editable`: `boolean` ; `field`: `FieldShape` ; `tag`: `string`  } & { `formatter`: `FormatterFunction`  }\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/Date.ts:14](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/Date.ts#L14)

___

### File

• **File**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `field`: `FileFieldValue` \| `FileField`  } & {}\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/File.ts:14](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/File.ts#L14)

___

### Image

• **Image**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `editable`: `boolean` ; `imageParams`: { [paramName: string]: `string`;  } ; `media`: `ImageField` \| `ImageFieldValue`  } & { `mediaUrlPrefix`: `RegExp`  }\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/Image.ts:55](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/Image.ts#L55)

___

### Link

• **Link**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `editable`: `boolean` ; `field`: `LinkField` \| `LinkFieldValue` ; `showLinkTextWithChildrenPresent`: `boolean`  } & {}\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/Link.ts:17](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/Link.ts#L17)

___

### Placeholder

• **Placeholder**: `DefineComponent`<`Object`, () => `VNode`<`RendererNode`, `RendererElement`, `Object`\> \| () => `VNode`<`RendererNode`, `RendererElement`, `Object`\>[], `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `name`: `string` ; `rendering`: [`RouteData`](interfaces/RouteData.md) \| [`ComponentRendering`](interfaces/ComponentRendering.md)  } & { `componentFactory`: `ComponentFactory` ; `errorComponent`: `Record`<`string`, `any`\> ; `fields`: { [name: string]: [`Field`](interfaces/Field.md) \| `Item`[];  } ; `hiddenRenderingComponent`: `Record`<`string`, `any`\> ; `missingComponentComponent`: `Record`<`string`, `any`\> ; `params`: { [name: string]: `string`;  }  }\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/Placeholder.ts:13](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/Placeholder.ts#L13)

___

### RichText

• **RichText**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `editable`: `boolean` ; `field`: { `editable?`: `string` ; `value?`: `string`  } ; `tag`: `string`  } & {}\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/RichText.ts:3](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/RichText.ts#L3)

___

### SitecoreContext

• **SitecoreContext**: `DefineComponent`<`Object`, `fn`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{} & { `componentFactory`: `ComponentFactory`  }\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/SitecoreContext.ts:8](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/SitecoreContext.ts#L8)

___

### SitecoreJssPlaceholderPlugin

• **SitecoreJssPlaceholderPlugin**: `Plugin` & `SitecoreJssPlaceholderPluginOptions`

#### Defined in

[sitecore-jss-vue/src/plugins/SitecoreJssPlaceholderPlugin.ts:30](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/plugins/SitecoreJssPlaceholderPlugin.ts#L30)

___

### Text

• **Text**: `DefineComponent`<`Object`, `unknown`, `unknown`, `Object`, `Object`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, `Record`<`string`, `any`\>, `string`, `PublicProps`, `Readonly`<{ `editable`: `boolean` ; `encode`: `boolean` ; `field`: { `editable?`: `string` ; `value?`: `string` \| `number`  } ; `tag`: `string`  } & {}\>, `Object`\>

#### Defined in

[sitecore-jss-vue/src/components/Text.ts:3](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/components/Text.ts#L3)

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

### providePlaceholders

▸ **providePlaceholders**(`vm`, `componentFactory?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | `ComponentPublicInstance`<`Object`, `Object`, `Object`, `Object`, `Object`, `Object`, `Object`, `Object`, ``false``, `ComponentOptionsBase`<`any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, `Object`\>\> |
| `componentFactory?` | `ComponentFactory` |

#### Returns

`void`

#### Defined in

[sitecore-jss-vue/src/enhancers/providePlaceholders.ts:31](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-vue/src/enhancers/providePlaceholders.ts#L31)

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
