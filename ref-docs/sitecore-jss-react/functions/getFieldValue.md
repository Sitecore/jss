[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / getFieldValue

# Function: getFieldValue()

## Call Signature

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`): `T`

Defined in: packages/sitecore-jss/types/layout/utils.d.ts:9

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderingOrFields` | [`ComponentFields`](../interfaces/ComponentFields.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |

### Returns

`T`

the field value or null if the field is not defined

## Call Signature

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

Defined in: packages/sitecore-jss/types/layout/utils.d.ts:10

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderingOrFields` | [`ComponentFields`](../interfaces/ComponentFields.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> | the rendering or fields object to extract the field from |
| `fieldName` | `string` | the name of the field to extract |
| `defaultValue` | `T` | - |

### Returns

`T`

the field value or null if the field is not defined
