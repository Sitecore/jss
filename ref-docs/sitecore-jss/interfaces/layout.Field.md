[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / Field

# Interface: Field\<T\>

[layout](../modules/layout.md).Field

represents the field metadata provided by layout service in editMode 'metadata'

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`GenericFieldValue`](../modules/layout.md#genericfieldvalue) |

## Hierarchy

- [`FieldMetadata`](layout.FieldMetadata.md)

  ↳ **`Field`**

## Table of contents

### Properties

- [editable](layout.Field.md#editable)
- [metadata](layout.Field.md#metadata)
- [value](layout.Field.md#value)

## Properties

### editable

• `Optional` **editable**: `string`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:129](https://github.com/Sitecore/jss/blob/e00cdb008/packages/sitecore-jss/src/layout/models.ts#L129)

___

### metadata

• `Optional` **metadata**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Inherited from

[FieldMetadata](layout.FieldMetadata.md).[metadata](layout.FieldMetadata.md#metadata)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:136](https://github.com/Sitecore/jss/blob/e00cdb008/packages/sitecore-jss/src/layout/models.ts#L136)

___

### value

• **value**: `T`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:128](https://github.com/Sitecore/jss/blob/e00cdb008/packages/sitecore-jss/src/layout/models.ts#L128)
