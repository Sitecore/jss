[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

## Indexable

▪ [attributeName: `string`]: `unknown`

## Table of contents

### Properties

- [editable](ImageProps.md#editable)
- [field](ImageProps.md#field)
- [imageParams](ImageProps.md#imageparams)
- [mediaUrlPrefix](ImageProps.md#mediaurlprefix)
- [srcSet](ImageProps.md#srcset)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `media.editable` has a value, then `media.editable` will be processed
and rendered as component output. If false, `media.editable` value will be ignored and not rendered.

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:47](https://github.com/Sitecore/jss/blob/5a3dd9c8e/packages/sitecore-jss-react/src/components/Image.tsx#L47)

___

### field

• `Optional` **field**: `Object`

Image field data (consistent with other field types)

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:40](https://github.com/Sitecore/jss/blob/5a3dd9c8e/packages/sitecore-jss-react/src/components/Image.tsx#L40)

___

### imageParams

• `Optional` **imageParams**: `Object`

Parameters that will be attached to Sitecore media URLs

#### Index signature

▪ [paramName: `string`]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:52](https://github.com/Sitecore/jss/blob/5a3dd9c8e/packages/sitecore-jss-react/src/components/Image.tsx#L52)

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

[packages/sitecore-jss-react/src/components/Image.tsx:65](https://github.com/Sitecore/jss/blob/5a3dd9c8e/packages/sitecore-jss-react/src/components/Image.tsx#L65)

___

### srcSet

• `Optional` **srcSet**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:56](https://github.com/Sitecore/jss/blob/5a3dd9c8e/packages/sitecore-jss-react/src/components/Image.tsx#L56)
