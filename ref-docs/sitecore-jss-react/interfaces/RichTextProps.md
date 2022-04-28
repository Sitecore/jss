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

**`default`** true

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:23](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/RichText.tsx#L23)

___

### field

• `Optional` **field**: [`RichTextField`](RichTextField.md)

The rich text field data.

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:12](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/RichText.tsx#L12)

___

### tag

• `Optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

**`default`** <div />

#### Defined in

[sitecore-jss-react/src/components/RichText.tsx:17](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/RichText.tsx#L17)
