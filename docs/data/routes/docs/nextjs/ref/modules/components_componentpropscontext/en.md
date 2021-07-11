---
name: components_componentpropscontext
routeTemplate: ./data/component-templates/article.yml
title: components_componentpropscontext
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / components/ComponentPropsContext

# Module: components/ComponentPropsContext

## Table of contents

### Type aliases

- [ComponentPropsContextProps](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropscontextprops)

### Variables

- [ComponentPropsReactContext](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropsreactcontext)

### Functions

- [ComponentPropsContext](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropscontext)
- [useComponentProps](/docs/nextjs/ref/modules/components_componentpropscontext#usecomponentprops)

## Type aliases

### ComponentPropsContextProps

Ƭ **ComponentPropsContextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `value` | [`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection) |

## Variables

### ComponentPropsReactContext

• `Const` **ComponentPropsReactContext**: `Context`<[`ComponentPropsCollection`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)\>

Component props context which we are using in order to store data fetched on components level (getStaticProps/getServerSideProps)

## Functions

### ComponentPropsContext

▸ `Const` **ComponentPropsContext**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ComponentPropsContextProps`](/docs/nextjs/ref/modules/components_componentpropscontext#componentpropscontextprops) |

#### Returns

`Element`

___

### useComponentProps

▸ **useComponentProps**<`ComponentData`\>(`componentUid`): `ComponentData`

Hook in order to get access to props related to specific component. Data comes from ComponentPropsContext.

**`see`** ComponentPropsContext

#### Type parameters

| Name |
| :------ |
| `ComponentData` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentUid` | `string` | component uId |

#### Returns

`ComponentData`

component props
