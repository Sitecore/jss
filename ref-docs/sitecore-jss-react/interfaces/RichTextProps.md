[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RichTextProps

# Interface: RichTextProps

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:13](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/RichText.tsx#L13)

## Extends

- `EditableFieldProps`

## Indexable

\[`htmlAttributes`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

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

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

***

### field?

> `optional` **field**: [`RichTextField`](RichTextField.md)

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:16](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/RichText.tsx#L16)

The rich text field data.

***

### tag?

> `optional` **tag**: `string`

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:21](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/RichText.tsx#L21)

The HTML element that will wrap the contents of the field.

#### Default

```ts
<div />
```
