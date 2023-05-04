[@sitecore-jss/sitecore-jss-react](../README.md) / mediaApi

# Namespace: mediaApi

## Table of contents

### Functions

- [findEditorImageTag](mediaApi.md#findeditorimagetag)
- [getRequiredParams](mediaApi.md#getrequiredparams)
- [getSrcSet](mediaApi.md#getsrcset)
- [replaceMediaUrlPrefix](mediaApi.md#replacemediaurlprefix)
- [updateImageUrl](mediaApi.md#updateimageurl)

## Functions

### findEditorImageTag

▸ **findEditorImageTag**(`editorMarkup`): `Object`

Makes a request to Sitecore Content Service for the specified item path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editorMarkup` | `string` | the markup to parse |

#### Returns

`Object`

found image tag; null in case if not found

| Name | Type |
| :------ | :------ |
| `attrs` | { `[key: string]`: `string`;  } |
| `imgTag` | `string` |

#### Defined in

sitecore-jss/types/media/media-api.d.ts:6

___

### getRequiredParams

▸ **getRequiredParams**(`qs`): `Object`

Get required query string params which should be merged with user params

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `qs` | `Object` | layout service parsed query string |

#### Returns

`Object`

requiredParams

| Name | Type |
| :------ | :------ |
| `db` | `string` |
| `la` | `string` |
| `rev` | `string` |
| `ts` | `string` |
| `vs` | `string` |

#### Defined in

sitecore-jss/types/media/media-api.d.ts:17

___

### getSrcSet

▸ **getSrcSet**(`url`, `srcSet`, `imageParams?`, `mediaUrlPrefix?`): `string`

Receives an array of `srcSet` parameters that are iterated and used as parameters to generate
a corresponding set of updated Sitecore media URLs via

**`See`**

updateImageUrl. The result is a comma-delimited
list of media URLs with respective dimension parameters.

**`Example`**

// returns '/ipsum.jpg?h=1000&w=1000 1000w, /ipsum.jpg?mh=250&mw=250 250w'
getSrcSet('/ipsum.jpg', [{ h: 1000, w: 1000 }, { mh: 250, mw: 250 } ])

More information about `srcSet`: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to prepare |
| `srcSet` | { `[key: string]`: `string` \| `number` \| `undefined`;  }[] | The array of parameters to use |
| `imageParams?` | `Object` | The querystring parameters to use |
| `mediaUrlPrefix?` | `RegExp` | The regex to match the media URL prefix |

#### Returns

`string`

The prepared URL

#### Defined in

sitecore-jss/types/media/media-api.d.ts:65

___

### replaceMediaUrlPrefix

▸ **replaceMediaUrlPrefix**(`url`, `mediaUrlPrefix?`): `string`

Replace `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Can use `mediaUrlPrefix` in order to use a custom prefix.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to replace the media URL prefix in |
| `mediaUrlPrefix?` | `RegExp` | The regex to match the media URL prefix |

#### Returns

`string`

The URL with the media URL prefix replaced

#### Defined in

sitecore-jss/types/media/media-api.d.ts:33

___

### updateImageUrl

▸ **updateImageUrl**(`url`, `params?`, `mediaUrlPrefix?`): `string`

Prepares a Sitecore media URL with `params` for use by the JSS media handler.
This is done by replacing `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Provided `params` are used as the querystring parameters for the media URL.
Can use `mediaUrlPrefix` in order to use a custom prefix.
If no `params` are sent, the original media URL is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to prepare |
| `params?` | `Object` | The querystring parameters to use |
| `mediaUrlPrefix?` | `RegExp` | The regex to match the media URL prefix |

#### Returns

`string`

The prepared URL

#### Defined in

sitecore-jss/types/media/media-api.d.ts:45
