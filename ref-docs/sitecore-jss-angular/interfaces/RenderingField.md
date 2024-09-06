[@sitecore-jss/sitecore-jss-angular](../README.md) / RenderingField

# Interface: RenderingField\<V\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `GenericFieldValue` |

## Hierarchy

- `FieldMetadata`

  ↳ **`RenderingField`**

  ↳↳ [`FileField`](FileField.md)

  ↳↳ [`ImageField`](ImageField.md)

  ↳↳ [`LinkField`](LinkField.md)

  ↳↳ [`RichTextField`](RichTextField.md)

  ↳↳ [`TextField`](TextField.md)

## Table of contents

### Properties

- [editable](RenderingField.md#editable)
- [metadata](RenderingField.md#metadata)
- [value](RenderingField.md#value)

## Properties

### editable

• `Optional` **editable**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/rendering-field.ts:6](https://github.com/Sitecore/jss/blob/971602e81/packages/sitecore-jss-angular/src/components/rendering-field.ts#L6)

___

### metadata

• `Optional` **metadata**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Inherited from

FieldMetadata.metadata

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:122

___

### value

• `Optional` **value**: `V`

#### Defined in

[packages/sitecore-jss-angular/src/components/rendering-field.ts:5](https://github.com/Sitecore/jss/blob/971602e81/packages/sitecore-jss-angular/src/components/rendering-field.ts#L5)
