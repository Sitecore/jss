[@sitecore-jss/sitecore-jss](../README.md) / utils

# Module: utils

## Table of contents

### Classes

- [ExperienceEditor](../classes/utils.ExperienceEditor.md)
- [HorizonEditor](../classes/utils.HorizonEditor.md)

### Type Aliases

- [ChromeCommand](utils.md#chromecommand)
- [EditButtonTypes](utils.md#editbuttontypes)
- [EditFrameDataSource](utils.md#editframedatasource)
- [FieldEditButton](utils.md#fieldeditbutton)
- [WebEditButton](utils.md#webeditbutton)

### Variables

- [DefaultEditFrameButton](utils.md#defaulteditframebutton)
- [DefaultEditFrameButtonIds](utils.md#defaulteditframebuttonids)
- [DefaultEditFrameButtons](utils.md#defaulteditframebuttons)

### Functions

- [handleEditorAnchors](utils.md#handleeditoranchors)
- [isAbsoluteUrl](utils.md#isabsoluteurl)
- [isEditorActive](utils.md#iseditoractive)
- [isServer](utils.md#isserver)
- [isTimeoutError](utils.md#istimeouterror)
- [mapButtonToCommand](utils.md#mapbuttontocommand)
- [resetEditorChromes](utils.md#reseteditorchromes)
- [resolveUrl](utils.md#resolveurl)
- [tryParseEnvValue](utils.md#tryparseenvvalue)

## Type Aliases

### ChromeCommand

Ƭ **ChromeCommand**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `click` | `string` |
| `header` | `string` |
| `icon` | `string` |
| `isDivider` | `boolean` |
| `tooltip` | `string` \| ``null`` |
| `type` | `string` \| ``null`` |

#### Defined in

[src/utils/edit-frame.ts:2](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L2)

___

### EditButtonTypes

Ƭ **EditButtonTypes**: [`WebEditButton`](utils.md#webeditbutton) \| [`FieldEditButton`](utils.md#fieldeditbutton) \| ``"|"``

#### Defined in

[src/utils/edit-frame.ts:73](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L73)

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

[src/utils/edit-frame.ts:49](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L49)

___

### FieldEditButton

Ƭ **FieldEditButton**: `BaseEditButton` & { `fields`: `string`[]  }

#### Defined in

[src/utils/edit-frame.ts:62](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L62)

___

### WebEditButton

Ƭ **WebEditButton**: `BaseEditButton` & { `click`: `string` ; `parameters?`: `Record`<`string`, `string` \| `number` \| `boolean` \| `undefined` \| ``null``\> ; `type?`: `string`  }

#### Defined in

[src/utils/edit-frame.ts:66](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L66)

## Variables

### DefaultEditFrameButton

• `Const` **DefaultEditFrameButton**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | { `fields`: `string`[] ; `header`: `string` = 'Edit Item'; `icon`: `string` = '/~/icon/people/16x16/cubes\_blue.png'; `tooltip`: `string` = 'Edit the item fields.' } |
| `edit.fields` | `string`[] |
| `edit.header` | `string` |
| `edit.icon` | `string` |
| `edit.tooltip` | `string` |
| `editRelatedItem` | { `click`: `string` = 'webedit:open'; `header`: `string` = 'Edit the related item'; `icon`: `string` = '/~/icon/Office/16x16/cubes.png'; `tooltip`: `string` = 'Edit the related item in the Content Editor.' } |
| `editRelatedItem.click` | `string` |
| `editRelatedItem.header` | `string` |
| `editRelatedItem.icon` | `string` |
| `editRelatedItem.tooltip` | `string` |
| `insert` | { `click`: `string` = 'webedit:new'; `header`: `string` = 'Insert New'; `icon`: `string` = '/~/icon/Office/16x16/insert\_from\_template.png'; `tooltip`: `string` = 'Insert a new item' } |
| `insert.click` | `string` |
| `insert.header` | `string` |
| `insert.icon` | `string` |
| `insert.tooltip` | `string` |

#### Defined in

[src/utils/edit-frame.ts:15](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L15)

___

### DefaultEditFrameButtonIds

• `Const` **DefaultEditFrameButtonIds**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | `string` |

#### Defined in

[src/utils/edit-frame.ts:11](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L11)

___

### DefaultEditFrameButtons

• `Const` **DefaultEditFrameButtons**: ({ `click`: `string` = 'webedit:new'; `header`: `string` = 'Insert New'; `icon`: `string` = '/~/icon/Office/16x16/insert\_from\_template.png'; `tooltip`: `string` = 'Insert a new item' } \| { `fields`: `string`[] ; `header`: `string` = 'Edit Item'; `icon`: `string` = '/~/icon/people/16x16/cubes\_blue.png'; `tooltip`: `string` = 'Edit the item fields.' })[]

#### Defined in

[src/utils/edit-frame.ts:36](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L36)

## Functions

### handleEditorAnchors

▸ **handleEditorAnchors**(): `void`

**`Description`**

in Experience Editor, anchor tags
with both onclick and href attributes will use the href, blocking the onclick from firing.
This function makes it so the anchor tags function as intended in the sample when using Experience Editor

The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.

**`See`**

Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver

#### Returns

`void`

#### Defined in

[src/utils/editing.ts:102](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/editing.ts#L102)

___

### isAbsoluteUrl

▸ **isAbsoluteUrl**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/utils.ts:52](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/utils.ts#L52)

___

### isEditorActive

▸ **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor.
Sitecore Editor environment can be identified only in the browser

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

[src/utils/editing.ts:78](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/editing.ts#L78)

___

### isServer

▸ **isServer**(): `boolean`

Determines whether the current execution context is server-side

#### Returns

`boolean`

true if executing server-side

#### Defined in

[src/utils/is-server.ts:5](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/is-server.ts#L5)

___

### isTimeoutError

▸ **isTimeoutError**(`error`): `boolean`

Indicates whether the error is a timeout error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | error |

#### Returns

`boolean`

is timeout error

#### Defined in

[src/utils/utils.ts:69](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/utils.ts#L69)

___

### mapButtonToCommand

▸ **mapButtonToCommand**(`button`, `itemId?`, `frameParameters?`): [`ChromeCommand`](utils.md#chromecommand)

Map the edit button types to chrome data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `button` | [`EditButtonTypes`](utils.md#editbuttontypes) | the edit button to build a ChromeCommand for |
| `itemId?` | `string` | the ID of the item the EditFrame is associated with |
| `frameParameters?` | `Record`<`string`, `undefined` \| ``null`` \| `string` \| `number` \| `boolean`\> | additional parameters passed to the EditFrame |

#### Returns

[`ChromeCommand`](utils.md#chromecommand)

#### Defined in

[src/utils/edit-frame.ts:81](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/edit-frame.ts#L81)

___

### resetEditorChromes

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

[src/utils/editing.ts:85](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/editing.ts#L85)

___

### resolveUrl

▸ **resolveUrl**(`urlBase`, `params?`): `string`

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

**`Throws`**

if the provided url is an empty string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlBase` | `string` | the base URL that may contain query string parameters |
| `params` | `ParsedUrlQueryInput` | query string parameters |

#### Returns

`string`

a URL string

#### Defined in

[src/utils/utils.ts:27](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/utils.ts#L27)

___

### tryParseEnvValue

▸ **tryParseEnvValue**<`T`\>(`envValue`, `defaultValue`): `T`

Method to parse JSON-formatted environment variables

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `envValue` | `undefined` \| `string` | can be undefined when providing values via process.env |
| `defaultValue` | `T` | default value |

#### Returns

`T`

parsed value

#### Defined in

[src/utils/env.ts:7](https://github.com/Sitecore/jss/blob/8b3cd364a/packages/sitecore-jss/src/utils/env.ts#L7)
