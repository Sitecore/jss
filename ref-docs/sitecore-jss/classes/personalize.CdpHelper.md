[@sitecore-jss/sitecore-jss](../README.md) / [personalize](../modules/personalize.md) / CdpHelper

# Class: CdpHelper

[personalize](../modules/personalize.md).CdpHelper

Static utility class for Sitecore CDP

## Table of contents

### Constructors

- [constructor](personalize.CdpHelper.md#constructor)

### Methods

- [getContentId](personalize.CdpHelper.md#getcontentid)
- [getPageVariantId](personalize.CdpHelper.md#getpagevariantid)
- [normalizeScope](personalize.CdpHelper.md#normalizescope)

## Constructors

### constructor

• **new CdpHelper**()

## Methods

### getContentId

▸ `Static` **getContentId**(`pageId`, `language`, `scope?`): `string`

Gets the content id for CDP in the required format `embedded_[<scope>_]<id>_<lang>`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the content id

#### Defined in

[src/personalize/utils.ts:84](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss/src/personalize/utils.ts#L84)

___

### getPageVariantId

▸ `Static` **getPageVariantId**(`pageId`, `language`, `variantId`, `scope?`): `string`

Gets the page variant id for CDP in the required format

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `variantId` | `string` | the variant id |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the formatted page variant id

#### Defined in

[src/personalize/utils.ts:61](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss/src/personalize/utils.ts#L61)

___

### normalizeScope

▸ `Static` **normalizeScope**(`scope?`): `string`

Normalizes the scope from the given string value
Removes all non-alphanumeric characters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope?` | `string` | the scope value |

#### Returns

`string`

normalized scope value

#### Defined in

[src/personalize/utils.ts:97](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss/src/personalize/utils.ts#L97)
