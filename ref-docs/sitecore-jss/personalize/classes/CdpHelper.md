[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / CdpHelper

# Class: CdpHelper

Static utility class for Sitecore CDP

## Constructors

### new CdpHelper()

> **new CdpHelper**(): [`CdpHelper`](CdpHelper.md)

#### Returns

[`CdpHelper`](CdpHelper.md)

## Methods

### getComponentFriendlyId()

> `static` **getComponentFriendlyId**(`pageId`, `componentId`, `language`, `scope`?): `string`

Gets the friendly id for Component A/B Testing in the required format `component_[<scope>_]<pageId>_<componentId>_<language>*`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `componentId` | `string` | the component id |
| `language` | `string` | the language |
| `scope`? | `string` | the scope value |

#### Returns

`string`

the friendly id

#### Defined in

[packages/sitecore-jss/src/personalize/utils.ts:130](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/personalize/utils.ts#L130)

***

### getPageFriendlyId()

> `static` **getPageFriendlyId**(`pageId`, `language`, `scope`?): `string`

Gets the friendly id for (page-level) Embedded Personalization in the required format `embedded_[<scope>_]<id>_<lang>`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `scope`? | `string` | the scope value |

#### Returns

`string`

the friendly id

#### Defined in

[packages/sitecore-jss/src/personalize/utils.ts:115](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/personalize/utils.ts#L115)

***

### getPageVariantId()

> `static` **getPageVariantId**(`pageId`, `language`, `variantId`, `scope`?): `string`

Gets the page variant id for CDP in the required format

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pageId` | `string` | the page id |
| `language` | `string` | the language |
| `variantId` | `string` | the variant id |
| `scope`? | `string` | the scope value |

#### Returns

`string`

the formatted page variant id

#### Defined in

[packages/sitecore-jss/src/personalize/utils.ts:92](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/personalize/utils.ts#L92)

***

### normalizeScope()

> `static` **normalizeScope**(`scope`?): `string`

Normalizes the scope from the given string value
Removes all non-alphanumeric characters

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `scope`? | `string` | the scope value |

#### Returns

`string`

normalized scope value

#### Defined in

[packages/sitecore-jss/src/personalize/utils.ts:149](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/personalize/utils.ts#L149)
