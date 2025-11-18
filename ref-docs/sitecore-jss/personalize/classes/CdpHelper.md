[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / CdpHelper

# Class: CdpHelper

Defined in: [packages/sitecore-jss/src/personalize/utils.ts:83](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss/src/personalize/utils.ts#L83)

Static utility class for Sitecore CDP

## Constructors

### Constructor

> **new CdpHelper**(): `CdpHelper`

#### Returns

`CdpHelper`

## Methods

### getComponentFriendlyId()

> `static` **getComponentFriendlyId**(`pageId`, `componentId`, `language`, `scope?`): `string`

Defined in: [packages/sitecore-jss/src/personalize/utils.ts:130](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss/src/personalize/utils.ts#L130)

Gets the friendly id for Component A/B Testing in the required format `component_[<scope>_]<pageId>_<componentId>_<language>*`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `componentId` | `string` | the component id |
| `language` | `string` | the language |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the friendly id

***

### getPageFriendlyId()

> `static` **getPageFriendlyId**(`pageId`, `language`, `scope?`): `string`

Defined in: [packages/sitecore-jss/src/personalize/utils.ts:115](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss/src/personalize/utils.ts#L115)

Gets the friendly id for (page-level) Embedded Personalization in the required format `embedded_[<scope>_]<id>_<lang>`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the friendly id

***

### getPageVariantId()

> `static` **getPageVariantId**(`pageId`, `language`, `variantId`, `scope?`): `string`

Defined in: [packages/sitecore-jss/src/personalize/utils.ts:92](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss/src/personalize/utils.ts#L92)

Gets the page variant id for CDP in the required format

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `variantId` | `string` | the variant id |
| `scope?` | `string` | the scope value |

#### Returns

`string`

the formatted page variant id

***

### normalizeScope()

> `static` **normalizeScope**(`scope?`): `string`

Defined in: [packages/sitecore-jss/src/personalize/utils.ts:149](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss/src/personalize/utils.ts#L149)

Normalizes the scope from the given string value
Removes all non-alphanumeric characters

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `scope?` | `string` | the scope value |

#### Returns

`string`

normalized scope value
