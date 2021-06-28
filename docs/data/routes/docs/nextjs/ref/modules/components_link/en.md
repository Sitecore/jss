---
name: components_link
routeTemplate: ./data/component-templates/article.yml
title: components_link
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / components/Link

# Module: components/Link

## Table of contents

### Namespaces

- [Link](/docs/nextjs/ref/modules/components_link/link)

### Type aliases

- [LinkProps](/docs/nextjs/ref/modules/components_link#linkprops)

### Variables

- [Link](/docs/nextjs/ref/modules/components_link#link)

## Type aliases

### LinkProps

Ƭ **LinkProps**: `ReactLinkProps` & { `internalLinkMatcher?`: `RegExp`  }

## Variables

### Link

• `Const` **Link**: `Object`

#### Call signature

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LinkProps`](/docs/nextjs/ref/modules/components_link#linkprops) |

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
