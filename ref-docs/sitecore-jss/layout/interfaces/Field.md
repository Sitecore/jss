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

[packages/sitecore-jss/src/layout/models.ts:133](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss/src/layout/models.ts#L133)

***

### metadata?

> `optional` **metadata**: `object`

#### Index Signature

 \[`key`: `string`\]: `unknown`

#### Inherited from

[`FieldMetadata`](FieldMetadata.md).[`metadata`](FieldMetadata.md#metadata)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:140](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss/src/layout/models.ts#L140)

***

### value

> **value**: `T`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:132](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss/src/layout/models.ts#L132)
