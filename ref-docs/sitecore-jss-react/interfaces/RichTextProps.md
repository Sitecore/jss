[@sitecore-jss/sitecore-jss-react](../README.md) / RichTextProps

# Interface: RichTextProps

## Indexable

▪ [htmlAttributes: `string`]: `unknown`

## Table of contents

### Properties

- [editable](RichTextProps.md#editable)
- [field](RichTextProps.md#field)
- [tag](RichTextProps.md#tag)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

**`Default`**

```ts
true
```

#### Defined in

[packages/sitecore-jss-react/src/components/RichText.tsx:25](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss-react/src/components/RichText.tsx#L25)

___

### field

• `Optional` **field**: [`RichTextField`](RichTextField.md)

The rich text field data.

#### Defined in

[packages/sitecore-jss-react/src/components/RichText.tsx:14](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss-react/src/components/RichText.tsx#L14)

___

### tag

• `Optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

**`Default`**

```ts
<div />
```

#### Defined in

[packages/sitecore-jss-react/src/components/RichText.tsx:19](https://github.com/Sitecore/jss/blob/f24581e16/packages/sitecore-jss-react/src/components/RichText.tsx#L19)
