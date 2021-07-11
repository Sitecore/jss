---
name: layout_utils
routeTemplate: ./data/component-templates/article.yml
title: layout_utils
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / layout/utils

# Module: layout/utils

## Table of contents

### Functions

- [getChildPlaceholder](/docs/fundamentals/ref/jss/modules/layout_utils#getchildplaceholder)
- [getFieldValue](/docs/fundamentals/ref/jss/modules/layout_utils#getfieldvalue)

## Functions

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering) \| [`HtmlElementRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/htmlelementrendering))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering) \| [`HtmlElementRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/htmlelementrendering))[]

child placeholder

___

### getFieldValue

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](/docs/fundamentals/ref/jss/interfaces/layout_models/componentrendering) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`
