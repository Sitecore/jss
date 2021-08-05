[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / components/Link

# Module: components/Link

## Table of contents

### Namespaces

- [Link](components_Link.Link.md)

### Type aliases

- [LinkProps](components_Link.md#linkprops)

### Variables

- [Link](components_Link.md#link)

## Type aliases

### LinkProps

Ƭ **LinkProps**: `ReactLinkProps` & { `internalLinkMatcher?`: `RegExp`  }

#### Defined in

[src/components/Link.tsx:12](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/components/Link.tsx#L12)

## Variables

### Link

• `Const` **Link**: `Object`

#### Call signature

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LinkProps`](components_Link.md#linkprops) |

##### Returns

`Element`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultProps` | `Object` |
| `defaultProps.editable` | `boolean` |
| `displayName` | `string` |
| `propTypes` | `Object` |
| `propTypes.children` | `Requireable`<`ReactNodeLike`\> |
| `propTypes.editable` | `Requireable`<`boolean`\> |
| `propTypes.field` | `Validator`<`InferProps`<`Object`\> \| `InferProps`<`Object`\>\> |
| `propTypes.internalLinkMatcher` | `Requireable`<`RegExp`\> |
| `propTypes.showLinkTextWithChildrenPresent` | `Requireable`<`boolean`\> |

#### Defined in

[src/components/Link.tsx:20](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/components/Link.tsx#L20)
