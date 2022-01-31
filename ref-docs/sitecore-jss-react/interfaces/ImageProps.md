[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

## Indexable

▪ [attributeName: `string`]: `unknown`

## Table of contents

### Properties

- [editable](ImageProps.md#editable)
- [field](ImageProps.md#field)
- [imageParams](ImageProps.md#imageparams)
- [media](ImageProps.md#media)
- [mediaUrlPrefix](ImageProps.md#mediaurlprefix)
- [srcSet](ImageProps.md#srcset)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `media.editable` has a value, then `media.editable` will be processed
and rendered as component output. If false, `media.editable` value will be ignored and not rendered.

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:52](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L52)

___

### field

• `Optional` **field**: [`ImageField`](ImageField.md) \| [`ImageFieldValue`](ImageFieldValue.md)

Image field data (consistent with other field types)

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:45](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L45)

___

### imageParams

• `Optional` **imageParams**: `Object`

Parameters that will be attached to Sitecore media URLs

#### Index signature

▪ [paramName: `string`]: `string` \| `number`

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:57](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L57)

___

### media

• `Optional` **media**: [`ImageField`](ImageField.md) \| [`ImageFieldValue`](ImageFieldValue.md)

The image field data.

**`deprecated`** use field property instead

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:42](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L42)

___

### mediaUrlPrefix

• `Optional` **mediaUrlPrefix**: `RegExp`

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

**`example`**
/\/([-~]{1})assets\//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:70](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L70)

___

### srcSet

• `Optional` **srcSet**: `ImageSizeParameters`[]

#### Defined in

[sitecore-jss-react/src/components/Image.tsx:61](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Image.tsx#L61)
