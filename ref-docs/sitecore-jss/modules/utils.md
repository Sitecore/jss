[@sitecore-jss/sitecore-jss](../README.md) / utils

# Module: utils

## Table of contents

### Classes

- [ExperienceEditor](../classes/utils.ExperienceEditor.md)
- [HorizonEditor](../classes/utils.HorizonEditor.md)

### Functions

- [isEditorActive](utils.md#iseditoractive)
- [isExperienceEditorActive](utils.md#isexperienceeditoractive)
- [isServer](utils.md#isserver)
- [resetEditorChromes](utils.md#reseteditorchromes)
- [resetExperienceEditorChromes](utils.md#resetexperienceeditorchromes)
- [resolveUrl](utils.md#resolveurl)

## Functions

### isEditorActive

▸ `Const` **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

[utils/editing.ts:67](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/editing.ts#L67)

___

### isExperienceEditorActive

▸ `Const` **isExperienceEditorActive**(): `boolean`

Determines whether the current execution context is within the Sitecore Experience Editor

**`deprecated`** Will be removed in a future release. Please use isEditorActive instead.

#### Returns

`boolean`

true if executing within the Sitecore Experience Editor

#### Defined in

[utils/editing.ts:87](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/editing.ts#L87)

___

### isServer

▸ **isServer**(): `boolean`

Determines whether the current execution context is server-side

#### Returns

`boolean`

true if executing server-side

#### Defined in

[utils/is-server.ts:5](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/is-server.ts#L5)

___

### resetEditorChromes

▸ `Const` **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

[utils/editing.ts:74](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/editing.ts#L74)

___

### resetExperienceEditorChromes

▸ `Const` **resetExperienceEditorChromes**(): `void`

Resets Sitecore Experience Editor "chromes"

**`deprecated`** Will be removed in a future release. Please use resetEditorChromes instead.

#### Returns

`void`

#### Defined in

[utils/editing.ts:93](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/editing.ts#L93)

___

### resolveUrl

▸ **resolveUrl**(`urlBase`, `params?`): `string`

Resolves a base URL that may contain query string parameters and an additional set of query
string parameters into a unified string representation.

**`throws`** {RangeError} if the provided url is an empty string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlBase` | `string` | the base URL that may contain query string parameters |
| `params` | `ParsedUrlQueryInput` | query string parameters |

#### Returns

`string`

a URL string

#### Defined in

[utils/resolve-url.ts:24](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss/src/utils/resolve-url.ts#L24)
