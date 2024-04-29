[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / ImageProps

# Interface: ImageProps

[index](../modules/index.md).ImageProps

## Indexable

▪ [attributeName: `string`]: `unknown`

## Table of contents

### Properties

- [editable](index.ImageProps.md#editable)
- [field](index.ImageProps.md#field)
- [imageParams](index.ImageProps.md#imageparams)
- [mediaUrlPrefix](index.ImageProps.md#mediaurlprefix)
- [srcSet](index.ImageProps.md#srcset)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `media.editable` has a value, then `media.editable` will be processed
and rendered as component output. If false, `media.editable` value will be ignored and not rendered.

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:37

___

### field

• `Optional` **field**: [`ImageField`](index.ImageField.md) \| [`ImageFieldValue`](index.ImageFieldValue.md)

Image field data (consistent with other field types)

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:31

___

### imageParams

• `Optional` **imageParams**: `Object`

Parameters that will be attached to Sitecore media URLs

#### Index signature

▪ [paramName: `string`]: `string` \| `number`

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:41

___

### mediaUrlPrefix

• `Optional` **mediaUrlPrefix**: `RegExp`

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

**`Example`**

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:52

___

### srcSet

• `Optional` **srcSet**: [`ImageSizeParameters`](index.ImageSizeParameters.md)[]

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:44
