[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / Field

# Interface: Field\<T\>

Defined in: [packages/sitecore-jss/src/layout/models.ts:131](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/layout/models.ts#L131)

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

Defined in: [packages/sitecore-jss/src/layout/models.ts:133](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/layout/models.ts#L133)

***

### metadata?

> `optional` **metadata**: `object`

Defined in: [packages/sitecore-jss/src/layout/models.ts:140](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/layout/models.ts#L140)

#### Index Signature

\[`key`: `string`\]: `unknown`

#### Inherited from

[`FieldMetadata`](FieldMetadata.md).[`metadata`](FieldMetadata.md#metadata)

***

### value

> **value**: `T`

Defined in: [packages/sitecore-jss/src/layout/models.ts:132](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/layout/models.ts#L132)
