[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / ImageProps

# Interface: ImageProps

[index](../modules/index.md).ImageProps

## Hierarchy

- `EditableFieldProps`

  ↳ **`ImageProps`**

## Indexable

▪ [attributeName: `string`]: `unknown`

## Table of contents

### Properties

- [editable](index.ImageProps.md#editable)
- [emptyFieldEditingComponent](index.ImageProps.md#emptyfieldeditingcomponent)
- [field](index.ImageProps.md#field)
- [imageParams](index.ImageProps.md#imageparams)
- [mediaUrlPrefix](index.ImageProps.md#mediaurlprefix)
- [srcSet](index.ImageProps.md#srcset)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

**`Default`**

```ts
true
```

#### Inherited from

EditableFieldProps.editable

#### Defined in

sitecore-jss-react/types/components/sharedTypes.d.ts:25

___

### emptyFieldEditingComponent

• `Optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

EditableFieldProps.emptyFieldEditingComponent

#### Defined in

sitecore-jss-react/types/components/sharedTypes.d.ts:31

___

### field

• `Optional` **field**: `Object`

Image field data (consistent with other field types)

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:33

___

### imageParams

• `Optional` **imageParams**: `Object`

Parameters that will be attached to Sitecore media URLs

#### Index signature

▪ [paramName: `string`]: `string` \| `number`

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:37

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

sitecore-jss-react/types/components/Image.d.ts:48

___

### srcSet

• `Optional` **srcSet**: [`ImageSizeParameters`](index.ImageSizeParameters.md)[]

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:40
