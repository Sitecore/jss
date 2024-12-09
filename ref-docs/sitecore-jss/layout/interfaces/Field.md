[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / Field

# Interface: Field\<T\>

represents the field metadata provided by layout service in editMode 'metadata'

## Extends

- [`FieldMetadata`](FieldMetadata.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | [`GenericFieldValue`](../type-aliases/GenericFieldValue.md) |

## Properties

### editable?

> `optional` **editable**: `string`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:131](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/models.ts#L131)

***

### metadata?

> `optional` **metadata**: `object`

#### Index Signature

 \[`key`: `string`\]: `unknown`

#### Inherited from

[`FieldMetadata`](FieldMetadata.md).[`metadata`](FieldMetadata.md#metadata)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:138](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/models.ts#L138)

***

### value

> **value**: `T`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:130](https://github.com/Sitecore/jss/blob/963da1fb491567dbff60ccc0ae009ad3bd83ae9b/packages/sitecore-jss/src/layout/models.ts#L130)
