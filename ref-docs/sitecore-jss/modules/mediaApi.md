[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / mediaApi

# Namespace: mediaApi

## Table of contents

### Functions

- [findEditorImageTag](mediaApi.md#findeditorimagetag)
- [getRequiredParams](mediaApi.md#getrequiredparams)
- [getSrcSet](mediaApi.md#getsrcset)
- [updateImageUrl](mediaApi.md#updateimageurl)

## Functions

### findEditorImageTag

▸ `Const` **findEditorImageTag**(`editorMarkup`): ``null`` \| { `attrs`: { [key: string]: `string`;  } ; `imgTag`: `string`  }

Makes a request to Sitecore Content Service for the specified item path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorMarkup` | `string` |

#### Returns

``null`` \| { `attrs`: { [key: string]: `string`;  } ; `imgTag`: `string`  }

found image tag

#### Defined in

[media-api.ts:18](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/media-api.ts#L18)

___

### getRequiredParams

▸ `Const` **getRequiredParams**(`qs`): `Object`

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
| `db` | `undefined` \| `string` |
| `la` | `undefined` \| `string` |
| `rev` | `undefined` \| `string` |
| `ts` | `undefined` \| `string` |
| `vs` | `undefined` \| `string` |

#### Defined in

[media-api.ts:44](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/media-api.ts#L44)

___

### getSrcSet

▸ `Const` **getSrcSet**(`url`, `srcSet`, `imageParams?`, `mediaUrlPrefix?`): `string`

Receives an array of `srcSet` parameters that are iterated and used as parameters to generate
a corresponding set of updated Sitecore media URLs via @see updateImageUrl. The result is a comma-delimited
list of media URLs with respective dimension parameters.

**`example`**
// returns '/ipsum.jpg?h=1000&w=1000 1000w, /ipsum.jpg?mh=250&mw=250 250w'
getSrcSet('/ipsum.jpg', [{ h: 1000, w: 1000 }, { mh: 250, mw: 250 } ])

More information about `srcSet`: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `srcSet` | { [key: string]: `string` \| `number` \| `undefined`;  }[] |
| `imageParams?` | `Object` |
| `mediaUrlPrefix?` | `RegExp` |

#### Returns

`string`

src set

#### Defined in

[media-api.ts:113](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/media-api.ts#L113)

___

### updateImageUrl

▸ `Const` **updateImageUrl**(`url`, `params?`, `mediaUrlPrefix?`): `string`

Prepares a Sitecore media URL with `params` for use by the JSS media handler.
This is done by replacing `/~/media` or `/-/media` with `/~/jssmedia` or `/-/jssmedia`, respectively.
Provided `params` are used as the querystring parameters for the media URL.
Can use `mediaUrlPrefix` in order to use a custom prefix.
If no `params` are sent, the original media URL is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `params?` | ``null`` \| { [key: string]: `string` \| `number` \| `undefined`;  } |
| `mediaUrlPrefix` | `RegExp` |

#### Returns

`string`

url

#### Defined in

[media-api.ts:61](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/media-api.ts#L61)
