[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / CdpHelper

# Class: CdpHelper

[index](../modules/index.md).CdpHelper

Static utility class for Sitecore CDP

## Table of contents

### Constructors

- [constructor](index.CdpHelper.md#constructor)

### Methods

- [getContentId](index.CdpHelper.md#getcontentid)
- [getPageVariantId](index.CdpHelper.md#getpagevariantid)
- [normalizeScope](index.CdpHelper.md#normalizescope)

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

packages/sitecore-jss/types/personalize/utils.d.ts:45

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

packages/sitecore-jss/types/personalize/utils.d.ts:37

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

packages/sitecore-jss/types/personalize/utils.d.ts:52
