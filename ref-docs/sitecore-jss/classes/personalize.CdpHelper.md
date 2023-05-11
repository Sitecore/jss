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

[src/personalize/utils.ts:76](https://github.com/Sitecore/jss/blob/572ae3dbf/packages/sitecore-jss/src/personalize/utils.ts#L76)

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

[src/personalize/utils.ts:60](https://github.com/Sitecore/jss/blob/572ae3dbf/packages/sitecore-jss/src/personalize/utils.ts#L60)
