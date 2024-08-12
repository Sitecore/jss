[@sitecore-jss/sitecore-jss-react](../README.md) / RichTextProps

# Interface: RichTextProps

## Hierarchy

- `EditableFieldProps`

  ↳ **`RichTextProps`**

## Indexable

▪ [htmlAttributes: `string`]: `unknown`

## Table of contents

### Properties

- [editable](RichTextProps.md#editable)
- [emptyFieldEditingComponent](RichTextProps.md#emptyfieldeditingcomponent)
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

#### Inherited from

EditableFieldProps.editable

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/c77daf026/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

___

### emptyFieldEditingComponent

• `Optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

EditableFieldProps.emptyFieldEditingComponent

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/c77daf026/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

___

### field

• `Optional` **field**: [`RichTextField`](RichTextField.md)

The rich text field data.

#### Defined in

[packages/sitecore-jss-react/src/components/RichText.tsx:17](https://github.com/Sitecore/jss/blob/c77daf026/packages/sitecore-jss-react/src/components/RichText.tsx#L17)

___

### tag

• `Optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

**`Default`**

```ts
<div />
```

#### Defined in

[packages/sitecore-jss-react/src/components/RichText.tsx:22](https://github.com/Sitecore/jss/blob/c77daf026/packages/sitecore-jss-react/src/components/RichText.tsx#L22)
