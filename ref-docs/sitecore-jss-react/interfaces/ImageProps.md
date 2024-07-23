[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

## Hierarchy

- `EditableFieldProps`

  ↳ **`ImageProps`**

## Indexable

▪ [attributeName: `string`]: `unknown`

## Table of contents

### Properties

- [editable](ImageProps.md#editable)
- [emptyFieldEditingComponent](ImageProps.md#emptyfieldeditingcomponent)
- [field](ImageProps.md#field)
- [imageParams](ImageProps.md#imageparams)
- [mediaUrlPrefix](ImageProps.md#mediaurlprefix)
- [srcSet](ImageProps.md#srcset)

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

[packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

___

### emptyFieldEditingComponent

• `Optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

EditableFieldProps.emptyFieldEditingComponent

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

___

### field

• `Optional` **field**: `Object`

Image field data (consistent with other field types)

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:45](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/Image.tsx#L45)

___

### imageParams

• `Optional` **imageParams**: `Object`

Parameters that will be attached to Sitecore media URLs

#### Index signature

▪ [paramName: `string`]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:50](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/Image.tsx#L50)

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

[packages/sitecore-jss-react/src/components/Image.tsx:63](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/Image.tsx#L63)

___

### srcSet

• `Optional` **srcSet**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:54](https://github.com/Sitecore/jss/blob/ef15fcaf3/packages/sitecore-jss-react/src/components/Image.tsx#L54)
