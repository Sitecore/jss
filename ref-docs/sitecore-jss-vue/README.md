@sitecore-jss/sitecore-jss-vue

# @sitecore-jss/sitecore-jss-vue

## Table of contents

### Namespaces

- [constants](modules/constants.md)
- [mediaApi](modules/mediaApi.md)
- [trackingApi](modules/trackingApi.md)

### Classes

- [ClientError](classes/ClientError.md)
- [DefaultRetryStrategy](classes/DefaultRetryStrategy.md)
- [GraphQLDictionaryService](classes/GraphQLDictionaryService.md)
- [GraphQLLayoutService](classes/GraphQLLayoutService.md)
- [GraphQLRequestClient](classes/GraphQLRequestClient.md)
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
- [RetryStrategy](interfaces/RetryStrategy.md)
- [RouteData](interfaces/RouteData.md)
- [TrackingRequestOptions](interfaces/TrackingRequestOptions.md)

### Type Aliases

- [EditButtonTypes](README.md#editbuttontypes)
- [EditFrameDataSource](README.md#editframedatasource)
- [FieldEditButton](README.md#fieldeditbutton)
- [GraphQLClientError](README.md#graphqlclienterror)
- [GraphQLRequestClientFactoryConfig](README.md#graphqlrequestclientfactoryconfig)
- [WebEditButton](README.md#webeditbutton)

### Variables

- [DateField](README.md#datefield)
- [DefaultEditFrameButton](README.md#defaulteditframebutton)
- [DefaultEditFrameButtons](README.md#defaulteditframebuttons)
- [EditFrame](README.md#editframe)
- [File](README.md#file)
- [Image](README.md#image)
- [Link](README.md#link)
- [Placeholder](README.md#placeholder)
- [RichText](README.md#richtext)
- [SitecoreContext](README.md#sitecorecontext)
- [SitecoreJssPlaceholderPlugin](README.md#sitecorejssplaceholderplugin)
- [Text](README.md#text)

### Functions

- [enableDebug](README.md#enabledebug)
- [getChildPlaceholder](README.md#getchildplaceholder)
- [getFieldValue](README.md#getfieldvalue)
- [handleEditorAnchors](README.md#handleeditoranchors)
- [isEditorActive](README.md#iseditoractive)
- [providePlaceholders](README.md#provideplaceholders)
- [resetEditorChromes](README.md#reseteditorchromes)

## Type Aliases

### EditButtonTypes

Ƭ **EditButtonTypes**: [`WebEditButton`](README.md#webeditbutton) \| [`FieldEditButton`](README.md#fieldeditbutton) \| ``"|"``

#### Defined in

packages/sitecore-jss/types/editing/edit-frame.d.ts:62

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

packages/sitecore-jss/types/editing/edit-frame.d.ts:43

___

### FieldEditButton

Ƭ **FieldEditButton**: `BaseEditButton` & \{ `fields`: `string`[]  }

#### Defined in

packages/sitecore-jss/types/editing/edit-frame.d.ts:54

___

### GraphQLClientError

Ƭ **GraphQLClientError**: `Partial`\<[`ClientError`](classes/ClientError.md)\> & \{ `code?`: `string`  }

This type represents errors that can occur in a GraphQL client.
In cases where an error status was sent back from the server (`!response.ok`), the `response` will be populated with details. In cases where a response was never received, the `code` can be populated with the error code (e.g. Node's 'ECONNRESET', 'ETIMEDOUT', etc).

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:21

___

### GraphQLRequestClientFactoryConfig

Ƭ **GraphQLRequestClientFactoryConfig**: `Object`

Configuration type for

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apiKey?` | `string` |
| `endpoint` | `string` |

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:88

___

### WebEditButton

Ƭ **WebEditButton**: `BaseEditButton` & \{ `click`: `string` ; `parameters?`: `Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined` \| ``null``\> ; `type?`: `string`  }

#### Defined in

packages/sitecore-jss/types/editing/edit-frame.d.ts:57

## Variables

### DateField

• `Const` **DateField**: `DefineComponent`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`FieldShape`\> ; `default`: () => `FieldShape`  } ; `formatter`: \{ `default`: `any` = undefined; `type`: `PropType`\<`FormatterFunction`\>  } ; `tag`: \{ `default`: `string` = 'span'; `type`: `StringConstructor` = String }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`FieldShape`\> ; `default`: () => `FieldShape`  } ; `formatter`: \{ `default`: `any` = undefined; `type`: `PropType`\<`FormatterFunction`\>  } ; `tag`: \{ `default`: `string` = 'span'; `type`: `StringConstructor` = String }  }\>\>, \{ `editable`: `boolean` ; `field`: `FieldShape` ; `formatter`: `FormatterFunction` ; `tag`: `string`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/Date.ts:14](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/Date.ts#L14)

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

packages/sitecore-jss/types/editing/edit-frame.d.ts:12

___

### DefaultEditFrameButtons

• `Const` **DefaultEditFrameButtons**: (\{ `click`: `string` ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  } \| \{ `fields`: `string`[] ; `header`: `string` ; `icon`: `string` ; `tooltip`: `string`  })[]

#### Defined in

packages/sitecore-jss/types/editing/edit-frame.d.ts:32

___

### EditFrame

• `Const` **EditFrame**: `DefineComponent`\<\{ `buttons`: \{ `default`: `any` = undefined; `type`: `PropType`\<[`EditButtonTypes`](README.md#editbuttontypes)[]\>  } ; `context`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `cssClass`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String } ; `dataSource`: \{ `default`: `any` = undefined; `type`: `PropType`\<[`EditFrameDataSource`](README.md#editframedatasource)\>  } ; `parameters`: \{ `default`: `any` = undefined; `type`: `PropType`\<`Record`\<`string`, `string` \| `number` \| `boolean`\>\>  } ; `routeData`: \{ `default`: `any` = undefined; `type`: () => [`RouteData`](interfaces/RouteData.md)\<`Record`\<`string`, [`Field`](interfaces/Field.md)\<`GenericFieldValue`\> \| `Item` \| `Item`[]\>\>  } ; `title`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String } ; `tooltip`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `buttons`: \{ `default`: `any` = undefined; `type`: `PropType`\<[`EditButtonTypes`](README.md#editbuttontypes)[]\>  } ; `context`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `cssClass`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String } ; `dataSource`: \{ `default`: `any` = undefined; `type`: `PropType`\<[`EditFrameDataSource`](README.md#editframedatasource)\>  } ; `parameters`: \{ `default`: `any` = undefined; `type`: `PropType`\<`Record`\<`string`, `string` \| `number` \| `boolean`\>\>  } ; `routeData`: \{ `default`: `any` = undefined; `type`: () => [`RouteData`](interfaces/RouteData.md)\<`Record`\<`string`, [`Field`](interfaces/Field.md)\<`GenericFieldValue`\> \| `Item` \| `Item`[]\>\>  } ; `title`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String } ; `tooltip`: \{ `default`: `any` = undefined; `type`: `StringConstructor` = String }  }\>\>, \{ `buttons`: [`EditButtonTypes`](README.md#editbuttontypes)[] ; `context`: `Record`\<`string`, `any`\> ; `cssClass`: `string` ; `dataSource`: [`EditFrameDataSource`](README.md#editframedatasource) ; `parameters`: `Record`\<`string`, `string` \| `number` \| `boolean`\> ; `routeData`: [`RouteData`](interfaces/RouteData.md)\<`Record`\<`string`, [`Field`](interfaces/Field.md)\<`GenericFieldValue`\> \| `Item` \| `Item`[]\>\> ; `title`: `string` ; `tooltip`: `string`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/EditFrame.ts:10](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/EditFrame.ts#L10)

___

### File

• `Const` **File**: `DefineComponent`\<\{ `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`FileFieldValue` \| `FileField`\> ; `default`: () => `FileFieldValue` \| `FileField`  }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`FileFieldValue` \| `FileField`\> ; `default`: () => `FileFieldValue` \| `FileField`  }  }\>\>, \{ `field`: `FileFieldValue` \| `FileField`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/File.ts:14](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/File.ts#L14)

___

### Image

• `Const` **Image**: `DefineComponent`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `imageParams`: \{ `default`: () => {} ; `type`: `PropType`\<\{ `[paramName: string]`: `string`;  }\>  } ; `media`: \{ `required`: ``true`` = true; `type`: `PropType`\<`ImageFieldValue` \| `ImageField`\> ; `default`: () => `ImageFieldValue` \| `ImageField`  } ; `mediaUrlPrefix`: \{ `default`: `any` = undefined; `type`: `RegExpConstructor` = RegExp }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `imageParams`: \{ `default`: () => {} ; `type`: `PropType`\<\{ `[paramName: string]`: `string`;  }\>  } ; `media`: \{ `required`: ``true`` = true; `type`: `PropType`\<`ImageFieldValue` \| `ImageField`\> ; `default`: () => `ImageFieldValue` \| `ImageField`  } ; `mediaUrlPrefix`: \{ `default`: `any` = undefined; `type`: `RegExpConstructor` = RegExp }  }\>\>, \{ `editable`: `boolean` ; `imageParams`: \{ `[paramName: string]`: `string`;  } ; `media`: `ImageFieldValue` \| `ImageField` ; `mediaUrlPrefix`: `RegExp`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/Image.ts:55](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/Image.ts#L55)

___

### Link

• `Const` **Link**: `DefineComponent`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`LinkFieldValue` \| `LinkField`\> ; `default`: () => `LinkFieldValue` \| `LinkField`  } ; `showLinkTextWithChildrenPresent`: \{ `default`: `boolean` = false; `type`: `BooleanConstructor` = Boolean }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<`LinkFieldValue` \| `LinkField`\> ; `default`: () => `LinkFieldValue` \| `LinkField`  } ; `showLinkTextWithChildrenPresent`: \{ `default`: `boolean` = false; `type`: `BooleanConstructor` = Boolean }  }\>\>, \{ `editable`: `boolean` ; `field`: `LinkFieldValue` \| `LinkField` ; `showLinkTextWithChildrenPresent`: `boolean`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/Link.ts:19](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/Link.ts#L19)

___

### Placeholder

• `Const` **Placeholder**: `DefineComponent`\<\{ `componentFactory`: \{ `default`: `any` = undefined; `type`: () => `ComponentFactory`  } ; `errorComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `fields`: \{ `default`: `any` = undefined; `type`: () => \{ `[name: string]`: [`Field`](interfaces/Field.md) \| `Item`[];  }  } ; `hiddenRenderingComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `missingComponentComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `name`: \{ `required`: ``true`` = true; `type`: `StringConstructor` = String } ; `params`: \{ `default`: `any` = undefined; `type`: () => \{ `[name: string]`: `string`;  }  } ; `rendering`: \{ `required`: ``true`` = true; `type`: () => [`RouteData`](interfaces/RouteData.md)\<`Record`\<`string`, [`Field`](interfaces/Field.md)\<`GenericFieldValue`\> \| `Item` \| `Item`[]\>\> \| [`ComponentRendering`](interfaces/ComponentRendering.md)  }  }, () => `VNode`\<`RendererNode`, `RendererElement`, \{ `[key: string]`: `any`;  }\> \| () => `VNode`\<`RendererNode`, `RendererElement`, \{ `[key: string]`: `any`;  }\>[], `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `componentFactory`: \{ `default`: `any` = undefined; `type`: () => `ComponentFactory`  } ; `errorComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `fields`: \{ `default`: `any` = undefined; `type`: () => \{ `[name: string]`: [`Field`](interfaces/Field.md) \| `Item`[];  }  } ; `hiddenRenderingComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `missingComponentComponent`: \{ `default`: `any` = undefined; `type`: `ObjectConstructor` = Object } ; `name`: \{ `required`: ``true`` = true; `type`: `StringConstructor` = String } ; `params`: \{ `default`: `any` = undefined; `type`: () => \{ `[name: string]`: `string`;  }  } ; `rendering`: \{ `required`: ``true`` = true; `type`: () => [`RouteData`](interfaces/RouteData.md)\<`Record`\<`string`, [`Field`](interfaces/Field.md)\<`GenericFieldValue`\> \| `Item` \| `Item`[]\>\> \| [`ComponentRendering`](interfaces/ComponentRendering.md)  }  }\>\>, \{ `componentFactory`: `ComponentFactory` ; `errorComponent`: `Record`\<`string`, `any`\> ; `fields`: \{ `[name: string]`: [`Field`](interfaces/Field.md) \| `Item`[];  } ; `hiddenRenderingComponent`: `Record`\<`string`, `any`\> ; `missingComponentComponent`: `Record`\<`string`, `any`\> ; `params`: \{ `[name: string]`: `string`;  }  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/Placeholder.ts:13](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/Placeholder.ts#L13)

___

### RichText

• `Const` **RichText**: `DefineComponent`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<\{ `editable?`: `string` ; `value?`: `string`  }\> ; `default`: () => \{ `editable?`: `string` ; `value?`: `string`  }  } ; `tag`: \{ `default`: `string` = 'div'; `type`: `StringConstructor` = String }  }, `unknown`, `unknown`, {}, \{ `bindRouteLinks`: () => `void` ; `routeHandler`: (`event`: `MouseEvent`) => `void`  }, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<\{ `editable?`: `string` ; `value?`: `string`  }\> ; `default`: () => \{ `editable?`: `string` ; `value?`: `string`  }  } ; `tag`: \{ `default`: `string` = 'div'; `type`: `StringConstructor` = String }  }\>\>, \{ `editable`: `boolean` ; `field`: \{ `editable?`: `string` ; `value?`: `string`  } ; `tag`: `string`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/RichText.ts:3](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/RichText.ts#L3)

___

### SitecoreContext

• `Const` **SitecoreContext**: `DefineComponent`\<\{ `componentFactory`: \{ `default`: `any` = undefined; `type`: `PropType`\<`ComponentFactory`\>  }  }, () => `VNode`\<`RendererNode`, `RendererElement`, \{ `[key: string]`: `any`;  }\>[], `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `componentFactory`: \{ `default`: `any` = undefined; `type`: `PropType`\<`ComponentFactory`\>  }  }\>\>, \{ `componentFactory`: `ComponentFactory`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/SitecoreContext.ts:8](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/SitecoreContext.ts#L8)

___

### SitecoreJssPlaceholderPlugin

• `Const` **SitecoreJssPlaceholderPlugin**: `Plugin` & `SitecoreJssPlaceholderPluginOptions`

#### Defined in

[packages/sitecore-jss-vue/src/plugins/SitecoreJssPlaceholderPlugin.ts:30](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/plugins/SitecoreJssPlaceholderPlugin.ts#L30)

___

### Text

• `Const` **Text**: `DefineComponent`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `encode`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<\{ `editable?`: `string` ; `value?`: `string` \| `number`  }\> ; `default`: () => \{ `editable?`: `string` ; `value?`: `string` \| `number`  }  } ; `tag`: \{ `default`: `string` = 'span'; `type`: `StringConstructor` = String }  }, `unknown`, `unknown`, {}, {}, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`\<`ExtractPropTypes`\<\{ `editable`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `encode`: \{ `default`: `boolean` = true; `type`: `BooleanConstructor` = Boolean } ; `field`: \{ `required`: ``true`` = true; `type`: `PropType`\<\{ `editable?`: `string` ; `value?`: `string` \| `number`  }\> ; `default`: () => \{ `editable?`: `string` ; `value?`: `string` \| `number`  }  } ; `tag`: \{ `default`: `string` = 'span'; `type`: `StringConstructor` = String }  }\>\>, \{ `editable`: `boolean` ; `encode`: `boolean` ; `field`: \{ `editable?`: `string` ; `value?`: `string` \| `number`  } ; `tag`: `string`  }, {}\>

#### Defined in

[packages/sitecore-jss-vue/src/components/Text.ts:3](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/components/Text.ts#L3)

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

packages/sitecore-jss/types/debug.d.ts:7

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

packages/sitecore-jss/types/layout/utils.d.ts:17

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

packages/sitecore-jss/types/layout/utils.d.ts:9

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

packages/sitecore-jss/types/layout/utils.d.ts:10

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

packages/sitecore-jss/types/editing/utils.d.ts:58

___

### isEditorActive

▸ **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor.
Sitecore Editor environment can be identified only in the browser

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

packages/sitecore-jss/types/editing/utils.d.ts:44

___

### providePlaceholders

▸ **providePlaceholders**(`vm`, `componentFactory?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | `ComponentPublicInstance`\<{}, {}, {}, {}, {}, {}, {}, {}, ``false``, `ComponentOptionsBase`\<`any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, {}, {}, `string`, {}\>, {}, {}\> |
| `componentFactory?` | `ComponentFactory` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-vue/src/enhancers/providePlaceholders.ts:31](https://github.com/Sitecore/jss/blob/5c34447b4/packages/sitecore-jss-vue/src/enhancers/providePlaceholders.ts#L31)

___

### resetEditorChromes

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

packages/sitecore-jss/types/editing/utils.d.ts:48
