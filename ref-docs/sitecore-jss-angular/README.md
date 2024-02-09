@sitecore-jss/sitecore-jss-angular

# @sitecore-jss/sitecore-jss-angular

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)
- [trackingApi](modules/trackingApi.md)

### Classes

- [ComponentNameAndType](classes/ComponentNameAndType.md)
- [DateDirective](classes/DateDirective.md)
- [DefaultRetryStrategy](classes/DefaultRetryStrategy.md)
- [EditFrameComponent](classes/EditFrameComponent.md)
- [FileDirective](classes/FileDirective.md)
- [GenericLinkDirective](classes/GenericLinkDirective.md)
- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [HiddenRenderingComponent](classes/HiddenRenderingComponent.md)
- [ImageDirective](classes/ImageDirective.md)
- [JssModule](classes/JssModule.md)
- [LinkDirective](classes/LinkDirective.md)
- [PlaceholderComponent](classes/PlaceholderComponent.md)
- [PlaceholderLoadingDirective](classes/PlaceholderLoadingDirective.md)
- [RenderComponentComponent](classes/RenderComponentComponent.md)
- [RenderEachDirective](classes/RenderEachDirective.md)
- [RenderEmptyDirective](classes/RenderEmptyDirective.md)
- [RestDictionaryService](classes/RestDictionaryService.md)
- [RestLayoutService](classes/RestLayoutService.md)
- [RichTextDirective](classes/RichTextDirective.md)
- [RouterLinkDirective](classes/RouterLinkDirective.md)
- [TextDirective](classes/TextDirective.md)

### Interfaces

- [CampaignInstance](interfaces/CampaignInstance.md)
- [ComponentFields](interfaces/ComponentFields.md)
- [ComponentNameAndModule](interfaces/ComponentNameAndModule.md)
- [ComponentParams](interfaces/ComponentParams.md)
- [ComponentRendering](interfaces/ComponentRendering.md)
- [DictionaryService](interfaces/DictionaryService.md)
- [EventInstance](interfaces/EventInstance.md)
- [Field](interfaces/Field.md)
- [FileField](interfaces/FileField.md)
- [GoalInstance](interfaces/GoalInstance.md)
- [GuardInput](interfaces/GuardInput.md)
- [HtmlElementRendering](interfaces/HtmlElementRendering.md)
- [HttpResponse](interfaces/HttpResponse.md)
- [ImageField](interfaces/ImageField.md)
- [ImageFieldValue](interfaces/ImageFieldValue.md)
- [JssCanActivate](interfaces/JssCanActivate.md)
- [JssCanActivateFn](interfaces/JssCanActivateFn.md)
- [JssResolve](interfaces/JssResolve.md)
- [LayoutService](interfaces/LayoutService.md)
- [LayoutServiceContextData](interfaces/LayoutServiceContextData.md)
- [LayoutServiceData](interfaces/LayoutServiceData.md)
- [LinkField](interfaces/LinkField.md)
- [LinkFieldValue](interfaces/LinkFieldValue.md)
- [OutcomeInstance](interfaces/OutcomeInstance.md)
- [PageViewInstance](interfaces/PageViewInstance.md)
- [RenderingField](interfaces/RenderingField.md)
- [RetryStrategy](interfaces/RetryStrategy.md)
- [RichTextField](interfaces/RichTextField.md)
- [RouteData](interfaces/RouteData.md)
- [TextField](interfaces/TextField.md)
- [TrackingRequestOptions](interfaces/TrackingRequestOptions.md)

### Type Aliases

- [EditFrameDataSource](README.md#editframedatasource)
- [FieldEditButton](README.md#fieldeditbutton)
- [HttpDataFetcher](README.md#httpdatafetcher)
- [PlaceholdersData](README.md#placeholdersdata)
- [WebEditButton](README.md#webeditbutton)

### Variables

- [DYNAMIC\_COMPONENT](README.md#dynamic_component)
- [DefaultEditFrameButton](README.md#defaulteditframebutton)
- [DefaultEditFrameButtons](README.md#defaulteditframebuttons)

### Functions

- [enableDebug](README.md#enabledebug)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [handleEditorAnchors](README.md#handleeditoranchors)
- [isEditorActive](README.md#iseditoractive)
- [isRawRendering](README.md#israwrendering)
- [isServer](README.md#isserver)
- [resetEditorChromes](README.md#reseteditorchromes)

## Type Aliases

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

### FieldEditButton

Ƭ **FieldEditButton**: `BaseEditButton` & \{ `fields`: `string`[]  }

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:54

___

### HttpDataFetcher

Ƭ **HttpDataFetcher**\<`T`\>: (`url`: `string`, `data?`: `unknown`) => `Promise`\<[`HttpResponse`](interfaces/HttpResponse.md)\<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`\<[`HttpResponse`](interfaces/HttpResponse.md)\<`T`\>\>

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

`Promise`\<[`HttpResponse`](interfaces/HttpResponse.md)\<`T`\>\>

#### Defined in

sitecore-jss/types/data-fetcher.d.ts:24

___

### PlaceholdersData

Ƭ **PlaceholdersData**\<`TYPEDNAME`\>: \{ [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[] }

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string` = `string` |

#### Defined in

sitecore-jss/types/layout/models.d.ts:72

___

### WebEditButton

Ƭ **WebEditButton**: `BaseEditButton` & \{ `click`: `string` ; `parameters?`: `Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined` \| ``null``\> ; `type?`: `string`  }

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:57

## Variables

### DYNAMIC\_COMPONENT

• `Const` **DYNAMIC\_COMPONENT**: `InjectionToken`\<`Type`\<`unknown`\> \| \{ `[s: string]`: `unknown`;  }\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.token.ts:65](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss-angular/src/components/placeholder.token.ts#L65)

___

### DefaultEditFrameButton

• `Const` **DefaultEditFrameButton**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | \{ `fields`: `string`[] ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `edit.fields` | `string`[] |
| `edit.header` | `string` |
| `edit.icon` | `string` |
| `edit.tooltip` | `string` |
| `editRelatedItem` | \{ `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `editRelatedItem.click` | `string` |
| `editRelatedItem.header` | `string` |
| `editRelatedItem.icon` | `string` |
| `editRelatedItem.tooltip` | `string` |
| `insert` | \{ `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } |
| `insert.click` | `string` |
| `insert.header` | `string` |
| `insert.icon` | `string` |
| `insert.tooltip` | `string` |

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:12

___

### DefaultEditFrameButtons

• `Const` **DefaultEditFrameButtons**: (\{ `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } \| \{ `fields`: `string`[] ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  })[]

#### Defined in

sitecore-jss/types/utils/edit-frame.d.ts:32

## Functions

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

### handleEditorAnchors

▸ **handleEditorAnchors**(): `void`

#### Returns

`void`

**`Description`**

in Experience Editor, anchor tags
with both onclick and href attributes will use the href, blocking the onclick from firing.
This function makes it so the anchor tags function as intended in the sample when using Experience Editor

The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.

**`See`**

Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver

#### Defined in

sitecore-jss/types/utils/editing.d.ts:58

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

### isRawRendering

▸ **isRawRendering**(`rendering`): rendering is HtmlElementRendering

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](interfaces/HtmlElementRendering.md) |

#### Returns

rendering is HtmlElementRendering

#### Defined in

[sitecore-jss-angular/src/components/rendering.ts:6](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss-angular/src/components/rendering.ts#L6)

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

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

sitecore-jss/types/utils/editing.d.ts:48
