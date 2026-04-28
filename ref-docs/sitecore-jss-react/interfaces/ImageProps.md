[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/Image.tsx#L41)
=======
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/Image.tsx#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extends

- `EditableFieldProps`\<`ImageProps`\>

## Indexable

> \[`attributeName`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable?**: `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)
=======
Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **emptyFieldEditingComponent?**: `ComponentClass`\<`ImageProps`, `any`\> \| `FC`\<`ImageProps`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)
=======
Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

***

### field?

> `optional` **field?**: [`ImageFieldValue`](ImageFieldValue.md) \| [`ImageField`](ImageField.md) & `FieldMetadata`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/Image.tsx#L44)
=======
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/Image.tsx#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Image field data (consistent with other field types)

***

### imageParams?

> `optional` **imageParams?**: `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:49](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/Image.tsx#L49)
=======
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:49](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/Image.tsx#L49)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Parameters that will be attached to Sitecore media URLs

#### Index Signature

\[`paramName`: `string`\]: `string` \| `number`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix?**: `RegExp`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:62](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/Image.tsx#L62)
=======
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:62](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/Image.tsx#L62)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

***

### srcSet?

> `optional` **srcSet?**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:53](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/Image.tsx#L53)
=======
Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:53](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/Image.tsx#L53)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028
