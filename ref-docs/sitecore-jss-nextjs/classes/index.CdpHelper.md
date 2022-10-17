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

## Constructors

### constructor

• **new CdpHelper**()

## Methods

### getContentId

▸ `Static` **getContentId**(`pageId`, `language`): `string`

Gets the content id for CDP in the required format `embedded_<id>_<lang>`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |

#### Returns

`string`

the content id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:43

___

### getPageVariantId

▸ `Static` **getPageVariantId**(`pageId`, `language`, `variantId`): `string`

Gets the page variant id for CDP in the required format

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `variantId` | `string` | the variant id |

#### Returns

`string`

the formatted page variant id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:36
