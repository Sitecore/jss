---
name: utils
routeTemplate: ./data/component-templates/article.yml
title: utils
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / utils

# Module: utils

## Table of contents

### Functions

- [getJssEditingSecret](/docs/nextjs/ref/modules/utils#getjsseditingsecret)
- [getPublicUrl](/docs/nextjs/ref/modules/utils#getpublicurl)
- [handleExperienceEditorFastRefresh](/docs/nextjs/ref/modules/utils#handleexperienceeditorfastrefresh)

## Functions

### getJssEditingSecret

▸ `Const` **getJssEditingSecret**(): `string`

#### Returns

`string`

___

### getPublicUrl

▸ `Const` **getPublicUrl**(): `string`

Get the publicUrl.
This is used primarily to enable compatibility with the Sitecore Experience Editor.
This is set to http://localhost:3000 by default.
VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
preview deployment has unique url, we don't know exact url.

#### Returns

`string`

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
