[@sitecore-jss/sitecore-jss-nextjs](../README.md) / utils

# Module: utils

## Table of contents

### References

- [resolveUrl](utils.md#resolveurl)

### Functions

- [getPublicUrl](utils.md#getpublicurl)
- [handleEditorFastRefresh](utils.md#handleeditorfastrefresh)
- [isEditorActive](utils.md#iseditoractive)
- [resetEditorChromes](utils.md#reseteditorchromes)
- [tryParseEnvValue](utils.md#tryparseenvvalue)

## References

### resolveUrl

Re-exports [resolveUrl](undefined)

## Functions

### getPublicUrl

▸ **getPublicUrl**(): `string`

Get the publicUrl.
This is used primarily to enable compatibility with Sitecore editors.
This is set to http://localhost:3000 by default.
VERCEL_URL is provided by Vercel in case if we are in Preview deployment (deployment based on the custom branch),
preview deployment has unique url, we don't know exact url.
Similarly, DEPLOY_URL is provided by Netlify and would give us the deploy URL
In production non-editing environments it is desirable to use relative urls, so in that case set PUBLIC_URL = ''

#### Returns

`string`

#### Defined in

[packages/sitecore-jss-nextjs/src/utils/utils.ts:12](https://github.com/Sitecore/jss/blob/34b9884ba/packages/sitecore-jss-nextjs/src/utils/utils.ts#L12)

___

### handleEditorFastRefresh

▸ **handleEditorFastRefresh**(`forceReload?`): `void`

Since Sitecore editors do not support Fast Refresh:
1. Subscribe on events provided by webpack.
2. Reset editor chromes when build is finished

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `forceReload?` | `boolean` | `false` | force page reload instead of reset chromes |

#### Returns

`void`

**`Default`**

```ts
forceReload false
```

#### Defined in

[packages/sitecore-jss-nextjs/src/utils/utils.ts:33](https://github.com/Sitecore/jss/blob/34b9884ba/packages/sitecore-jss-nextjs/src/utils/utils.ts#L33)

___

### isEditorActive

▸ **isEditorActive**(): `boolean`

Determines whether the current execution context is within a Sitecore editor.
Sitecore Editor environment can be identified only in the browser

#### Returns

`boolean`

true if executing within a Sitecore editor

#### Defined in

packages/sitecore-jss/types/utils/editing.d.ts:44

___

### resetEditorChromes

▸ **resetEditorChromes**(): `void`

Resets Sitecore editor "chromes"

#### Returns

`void`

#### Defined in

packages/sitecore-jss/types/utils/editing.d.ts:48

___

### tryParseEnvValue

▸ **tryParseEnvValue**\<`T`\>(`envValue`, `defaultValue`): `T`

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

packages/sitecore-jss/types/utils/env.d.ts:7
