[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RichTextProps

# Interface: RichTextProps

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:10](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-react/src/components/RichText.tsx#L10)

## Extends

- `EditableFieldProps`

## Indexable

> \[`htmlAttributes`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable?**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

***

### field?

> `optional` **field?**: [`RichTextField`](RichTextField.md)

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:13](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-react/src/components/RichText.tsx#L13)

The rich text field data.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [packages/sitecore-jss-react/src/components/RichText.tsx:18](https://github.com/Sitecore/jss/blob/bcf336c4dfb913d1e935ca844369444e7dac09d8/packages/sitecore-jss-react/src/components/RichText.tsx#L18)

The HTML element that will wrap the contents of the field.

#### Default

```ts
<div />
```
