[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / CdpHelper

# Class: CdpHelper

[index](../modules/index.md).CdpHelper

Static utility class for Sitecore CDP

## Table of contents

### Constructors

- [constructor](index.CdpHelper.md#constructor)

### Methods

- [getComponentFriendlyId](index.CdpHelper.md#getcomponentfriendlyid)
- [getPageFriendlyId](index.CdpHelper.md#getpagefriendlyid)
- [getPageVariantId](index.CdpHelper.md#getpagevariantid)
- [normalizeScope](index.CdpHelper.md#normalizescope)

## Constructors

### constructor

• **new CdpHelper**()

## Methods

### getComponentFriendlyId

▸ `Static` **getComponentFriendlyId**(`pageId`, `componentId`, `language`, `scope?`): `string`

Gets the friendly id for Component A/B Testing in the required format `component_[<scope>_]<pageId>_<componentId>_<language>*`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `componentId` | `string` | the component id |
| `language` | `string` | the language |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the friendly id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:61

___

### getPageFriendlyId

▸ `Static` **getPageFriendlyId**(`pageId`, `language`, `scope?`): `string`

Gets the friendly id for (page-level) Embedded Personalization in the required format `embedded_[<scope>_]<id>_<lang>`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the friendly id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:52

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

sitecore-jss/types/personalize/utils.d.ts:44

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

sitecore-jss/types/personalize/utils.d.ts:68
