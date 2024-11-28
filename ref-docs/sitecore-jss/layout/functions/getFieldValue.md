[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / getFieldValue

# Function: getFieldValue()

## Param

the rendering or fields object to extract the field from

## Param

the name of the field to extract

## Param

the default value to return if the field is not defined

## getFieldValue(renderingOrFields, fieldName)

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

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

`T` \| `undefined`

the field value or the default value if the field is not defined

the field value or null if the field is not defined

### Param

the rendering or fields object to extract the field from

### Param

the name of the field to extract

### Param

the default value to return if the field is not defined

### Defined in

[packages/sitecore-jss/src/layout/utils.ts:16](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss/src/layout/utils.ts#L16)

## getFieldValue(renderingOrFields, fieldName, defaultValue)

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `renderingOrFields` | [`ComponentFields`](../interfaces/ComponentFields.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> |
| `fieldName` | `string` |
| `defaultValue` | `T` |

### Returns

`T`

### Param

the rendering or fields object to extract the field from

### Param

the name of the field to extract

### Param

the default value to return if the field is not defined

### Defined in

[packages/sitecore-jss/src/layout/utils.ts:21](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss/src/layout/utils.ts#L21)
