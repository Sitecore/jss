[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / isFieldValueEmpty

# Function: isFieldValueEmpty()

> **isFieldValueEmpty**(`field`): `boolean`

Determines if the passed in field object's value is empty.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `field` | [`GenericFieldValue`](../type-aliases/GenericFieldValue.md) \| `Partial`\<[`Field`](../interfaces/Field.md)\<[`GenericFieldValue`](../type-aliases/GenericFieldValue.md)\>\> | the field object. Partial<T> type is used here because _field.value_ could be required or optional for the different field types |

## Returns

`boolean`

## Defined in

[packages/sitecore-jss/src/layout/utils.ts:109](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/utils.ts#L109)
