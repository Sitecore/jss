[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / components/RichText

# Module: components/RichText

## Table of contents

### Namespaces

- [RichText](components_RichText.RichText.md)

### Type aliases

- [RichTextProps](components_RichText.md#richtextprops)

### Variables

- [RichText](components_RichText.md#richtext)

## Type aliases

### RichTextProps

Ƭ **RichTextProps**: `ReactRichTextProps` & { `internalLinksSelector?`: `string`  }

#### Defined in

[src/components/RichText.tsx:10](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L10)

## Variables

### RichText

• `Const` **RichText**: `Object`

#### Call signature

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`RichTextProps`](components_RichText.md#richtextprops) |

##### Returns

`Element`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultProps` | `Object` |
| `defaultProps.editable` | `boolean` |
| `defaultProps.tag` | `string` |
| `displayName` | `string` |
| `propTypes` | `Object` |
| `propTypes.editable` | `Requireable`<`boolean`\> |
| `propTypes.field` | `Requireable`<`InferProps`<`Object`\>\> |
| `propTypes.internalLinksSelector` | `Requireable`<`string`\> |
| `propTypes.tag` | `Requireable`<`string`\> |

#### Defined in

[src/components/RichText.tsx:20](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L20)
