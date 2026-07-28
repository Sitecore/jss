[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / Field

# Interface: Field\<T\>

Defined in: [packages/sitecore-jss/src/layout/models.ts:130](https://github.com/Sitecore/jss/blob/a3875474f0467d1f797f9f2665ed814a1c0c85c5/packages/sitecore-jss/src/layout/models.ts#L130)

represents the field metadata provided by layout service in editMode 'metadata'

## Extends

- [`FieldMetadata`](FieldMetadata.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | [`GenericFieldValue`](../type-aliases/GenericFieldValue.md) |

## Properties

### editable?

> `optional` **editable?**: `string`

Defined in: [packages/sitecore-jss/src/layout/models.ts:132](https://github.com/Sitecore/jss/blob/a3875474f0467d1f797f9f2665ed814a1c0c85c5/packages/sitecore-jss/src/layout/models.ts#L132)

***

### metadata?

> `optional` **metadata?**: `object`

Defined in: [packages/sitecore-jss/src/layout/models.ts:139](https://github.com/Sitecore/jss/blob/a3875474f0467d1f797f9f2665ed814a1c0c85c5/packages/sitecore-jss/src/layout/models.ts#L139)

#### Index Signature

\[`key`: `string`\]: `unknown`

#### Inherited from

[`FieldMetadata`](FieldMetadata.md).[`metadata`](FieldMetadata.md#metadata)

***

### value

> **value**: `T`

Defined in: [packages/sitecore-jss/src/layout/models.ts:131](https://github.com/Sitecore/jss/blob/a3875474f0467d1f797f9f2665ed814a1c0c85c5/packages/sitecore-jss/src/layout/models.ts#L131)
