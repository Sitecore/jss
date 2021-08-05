[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / layout/utils

# Module: layout/utils

## Table of contents

### Functions

- [getChildPlaceholder](layout_utils.md#getchildplaceholder)
- [getFieldValue](layout_utils.md#getfieldvalue)

## Functions

### getChildPlaceholder

▸ **getChildPlaceholder**(`rendering`, `placeholderName`): ([`ComponentRendering`](../interfaces/layout_models.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/layout_models.HtmlElementRendering.md))[]

Gets rendering definitions in a given child placeholder under a current rendering.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/layout_models.ComponentRendering.md) |
| `placeholderName` | `string` |

#### Returns

([`ComponentRendering`](../interfaces/layout_models.ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/layout_models.HtmlElementRendering.md))[]

child placeholder

#### Defined in

[layout/utils.ts:56](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/utils.ts#L56)

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
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout_models.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |

#### Returns

`T` \| `undefined`

#### Defined in

[layout/utils.ts:9](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/utils.ts#L9)

▸ **getFieldValue**<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderingOrFields` | [`ComponentRendering`](../interfaces/layout_models.ComponentRendering.md) \| `Fields` |
| `fieldName` | `string` |
| `defaultValue` | `T` |

#### Returns

`T`

#### Defined in

[layout/utils.ts:13](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/utils.ts#L13)
