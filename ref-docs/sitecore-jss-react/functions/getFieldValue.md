[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / getFieldValue

# Function: getFieldValue()

## getFieldValue(renderingOrFields, fieldName)

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`): `T` \| `undefined`

Safely extracts a field value from a rendering or fields object.
Null will be returned if the field is not defined.

### Type Parameters

• **T**

### Parameters

• **renderingOrFields**: [`ComponentFields`](../interfaces/ComponentFields.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>

the rendering or fields object to extract the field from

• **fieldName**: `string`

the name of the field to extract

### Returns

`T` \| `undefined`

the field value or null if the field is not defined

### Defined in

packages/sitecore-jss/types/layout/utils.d.ts:9

## getFieldValue(renderingOrFields, fieldName, defaultValue)

> **getFieldValue**\<`T`\>(`renderingOrFields`, `fieldName`, `defaultValue`): `T`

### Type Parameters

• **T**

### Parameters

• **renderingOrFields**: [`ComponentFields`](../interfaces/ComponentFields.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>

• **fieldName**: `string`

• **defaultValue**: `T`

### Returns

`T`

### Defined in

packages/sitecore-jss/types/layout/utils.d.ts:10