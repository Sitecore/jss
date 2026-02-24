[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:41](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L41)

## Extends

- `EditableFieldProps`\<`ImageProps`\>

## Indexable

\[`attributeName`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`ImageProps`, `any`\> \| `FC`\<`ImageProps`\>

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

***

### field?

> `optional` **field**: [`ImageFieldValue`](ImageFieldValue.md) \| [`ImageField`](ImageField.md) & `FieldMetadata`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:44](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L44)

Image field data (consistent with other field types)

***

### imageParams?

> `optional` **imageParams**: `object`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:49](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L49)

Parameters that will be attached to Sitecore media URLs

#### Index Signature

\[`paramName`: `string`\]: `string` \| `number`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix**: `RegExp`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:62](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L62)

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

***

### srcSet?

> `optional` **srcSet**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:53](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-react/src/components/Image.tsx#L53)
