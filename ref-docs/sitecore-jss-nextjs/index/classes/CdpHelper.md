[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / CdpHelper

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

• **pageId**: `string`

the page id

• **componentId**: `string`

the component id

• **language**: `string`

the language

• **scope?**: `string`

the scope value

#### Returns

`string`

the friendly id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:61

***

### getPageFriendlyId()

> `static` **getPageFriendlyId**(`pageId`, `language`, `scope`?): `string`

Gets the friendly id for (page-level) Embedded Personalization in the required format `embedded_[<scope>_]<id>_<lang>`

#### Parameters

• **pageId**: `string`

the page id

• **language**: `string`

the language

• **scope?**: `string`

the scope value

#### Returns

`string`

the friendly id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:52

***

### getPageVariantId()

> `static` **getPageVariantId**(`pageId`, `language`, `variantId`, `scope`?): `string`

Gets the page variant id for CDP in the required format

#### Parameters

• **pageId**: `string`

the page id

• **language**: `string`

the language

• **variantId**: `string`

the variant id

• **scope?**: `string`

the scope value

#### Returns

`string`

the formatted page variant id

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:44

***

### normalizeScope()

> `static` **normalizeScope**(`scope`?): `string`

Normalizes the scope from the given string value
Removes all non-alphanumeric characters

#### Parameters

• **scope?**: `string`

the scope value

#### Returns

`string`

normalized scope value

#### Defined in

sitecore-jss/types/personalize/utils.d.ts:68
