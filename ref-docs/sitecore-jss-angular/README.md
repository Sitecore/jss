@sitecore-jss/sitecore-jss-angular

# @sitecore-jss/sitecore-jss-angular

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)

### Classes

- [ComponentNameAndType](classes/ComponentNameAndType.md)
- [FileDirective](classes/FileDirective.md)
- [GenericLinkDirective](classes/GenericLinkDirective.md)
- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [ImageDirective](classes/ImageDirective.md)
- [JssModule](classes/JssModule.md)
- [LinkDirective](classes/LinkDirective.md)
- [PlaceholderComponent](classes/PlaceholderComponent.md)
- [PlaceholderLoadingDirective](classes/PlaceholderLoadingDirective.md)
- [RestDictionaryService](classes/RestDictionaryService.md)
- [RestLayoutService](classes/RestLayoutService.md)
- [RichTextDirective](classes/RichTextDirective.md)
- [RouterLinkDirective](classes/RouterLinkDirective.md)
- [TextDirective](classes/TextDirective.md)

### Interfaces

- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [DictionaryService](interfaces/DictionaryService.md)
- [Field](interfaces/Field.md)
- [FileField](interfaces/FileField.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [HttpResponse](interfaces/HttpResponse.md)
- [ImageField](interfaces/ImageField.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [LinkField](interfaces/LinkField.md)
- [RenderingField](interfaces/RenderingField.md)
- [RichTextField](interfaces/RichTextField.md)
- [RouteData](interfaces/RouteData.md)
- [TextField](interfaces/TextField.md)

### Type aliases

- [HttpDataFetcher](README.md#httpdatafetcher)
- [PlaceholdersData](README.md#placeholdersdata)

### Variables

- [DYNAMIC\_COMPONENT](README.md#dynamic_component)

### Functions

- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [handleEditorAnchors](README.md#handleeditoranchors)
- [isEditorActive](README.md#iseditoractive)
- [isExperienceEditorActive](README.md#isexperienceeditoractive)
- [isRawRendering](README.md#israwrendering)
- [isServer](README.md#isserver)
- [resetEditorChromes](README.md#reseteditorchromes)
- [resetExperienceEditorChromes](README.md#resetexperienceeditorchromes)

## Type aliases

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: `unknown`) => `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

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

`Promise`<[`HttpResponse`](interfaces/HttpResponse.md)<`T`\>\>

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

## Variables

### DYNAMIC\_COMPONENT

• **DYNAMIC\_COMPONENT**: `InjectionToken`<`Type`<`unknown`\> \| { [s: string]: `unknown`;  }\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:48](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L48)

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

### handleEditorAnchors

▸ `Const` **handleEditorAnchors**(): `void`

**`description`** in Experience Editor with an Angular sample app, anchor tags
with both onclick and href attributes will use the href, blocking the onclick from firing.
This function makes it so the anchor tags function as intended in an Angular sample when using Experience Editor

The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.

**`see`** Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/utils.ts:12](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/utils.ts#L12)

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

### isRawRendering

▸ **isRawRendering**(`rendering`): rendering is HtmlElementRendering

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md) |

#### Returns

rendering is HtmlElementRendering

#### Defined in

[sitecore-jss-angular/src/components/rendering.ts:6](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/rendering.ts#L6)

___

### isServer

▸ **isServer**(): `boolean`

Determines whether the current execution context is server-side

#### Returns

`boolean`

true if executing server-side

#### Defined in

sitecore-jss/types/utils/is-server.d.ts:5

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
