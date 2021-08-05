[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / utils

# Module: utils

## Table of contents

### Functions

- [getJssEditingSecret](utils.md#getjsseditingsecret)
- [getPublicUrl](utils.md#getpublicurl)
- [handleExperienceEditorFastRefresh](utils.md#handleexperienceeditorfastrefresh)

## Functions

### getJssEditingSecret

▸ `Const` **getJssEditingSecret**(): `string`

#### Returns

`string`

#### Defined in

[src/utils.ts:64](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/utils.ts#L64)

___

### getPublicUrl

▸ `Const` **getPublicUrl**(): `string`

#### Returns

`string`

#### Defined in

[src/utils.ts:4](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/utils.ts#L4)

___

### handleExperienceEditorFastRefresh

▸ `Const` **handleExperienceEditorFastRefresh**(`forceReload?`): `void`

Since Experience Editor does not support Fast Refresh:
1. Subscribe on events provided by webpack.
2. Reset experience editor chromes when build is finished

**`default`** forceReload false

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceReload` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/utils.ts:31](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/utils.ts#L31)
