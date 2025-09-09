[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / CdpHelper

# Class: CdpHelper

Defined in: packages/sitecore-jss/types/personalize/utils.d.ts:35

Static utility class for Sitecore CDP

## Constructors

### Constructor

> **new CdpHelper**(): `CdpHelper`

#### Returns

`CdpHelper`

## Methods

### getComponentFriendlyId()

> `static` **getComponentFriendlyId**(`pageId`, `componentId`, `language`, `scope?`): `string`

Defined in: packages/sitecore-jss/types/personalize/utils.d.ts:61

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

Defined in: packages/sitecore-jss/types/personalize/utils.d.ts:52

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

Defined in: packages/sitecore-jss/types/personalize/utils.d.ts:44

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

Defined in: packages/sitecore-jss/types/personalize/utils.d.ts:68

Normalizes the scope from the given string value
Removes all non-alphanumeric characters

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `scope?` | `string` | the scope value |

#### Returns

`string`

normalized scope value
