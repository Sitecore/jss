[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RichTextProps

# Interface: RichTextProps

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:13](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/RichText.tsx#L13)
=======
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:13](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/RichText.tsx#L13)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extends

- `EditableFieldProps`\<`RichTextProps`\>

## Indexable

> \[`htmlAttributes`: `string`\]: `unknown`

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

> `optional` **emptyFieldEditingComponent?**: `ComponentClass`\<`RichTextProps`, `any`\> \| `FC`\<`RichTextProps`\>

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

> `optional` **field?**: [`RichTextField`](RichTextField.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:16](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/RichText.tsx#L16)
=======
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:16](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/RichText.tsx#L16)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The rich text field data.

***

### tag?

> `optional` **tag?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/RichText.tsx#L21)
=======
Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/RichText.tsx#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The HTML element that will wrap the contents of the field.

#### Default

```ts
<div />
```
