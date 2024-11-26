[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / RenderingField

# Interface: RenderingField\<V\>

## Extends

- `FieldMetadata`

## Extended by

- [`FileField`](FileField.md)
- [`ImageField`](ImageField.md)
- [`LinkField`](LinkField.md)
- [`RichTextField`](RichTextField.md)
- [`TextField`](TextField.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `V` | `GenericFieldValue` |

## Properties

### editable?

> `optional` **editable**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/rendering-field.ts:7](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-angular/src/components/rendering-field.ts#L7)

***

### metadata?

> `optional` **metadata**: `object`

#### Index Signature

 \[`key`: `string`\]: `unknown`

#### Inherited from

`FieldMetadata.metadata`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:123

***

### value?

> `optional` **value**: `V`

#### Defined in

[packages/sitecore-jss-angular/src/components/rendering-field.ts:6](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-angular/src/components/rendering-field.ts#L6)
