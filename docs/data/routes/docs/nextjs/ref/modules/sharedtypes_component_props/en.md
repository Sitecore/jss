---
name: sharedtypes_component_props
routeTemplate: ./data/component-templates/article.yml
title: sharedtypes_component_props
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / sharedTypes/component-props

# Module: sharedTypes/component-props

## Table of contents

### Type aliases

- [ComponentPropsCollection](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropscollection)
- [ComponentPropsFetchFunction](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropsfetchfunction)
- [GetServerSideComponentProps](/docs/nextjs/ref/modules/sharedtypes_component_props#getserversidecomponentprops)
- [GetStaticComponentProps](/docs/nextjs/ref/modules/sharedtypes_component_props#getstaticcomponentprops)

## Type aliases

### ComponentPropsCollection

Ƭ **ComponentPropsCollection**: `Object`

Shape of component props storage

#### Index signature

▪ [componentUid: `string`]: `unknown`

___

### ComponentPropsFetchFunction

Ƭ **ComponentPropsFetchFunction**<`NextContext`, `FetchedProps`\>: (`rendering`: [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering), `layoutData`: [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata), `context`: `NextContext`) => `Promise`<`FetchedProps`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NextContext` | `NextContext` |
| `FetchedProps` | `unknown` |

#### Type declaration

▸ (`rendering`, `layoutData`, `context`): `Promise`<`FetchedProps`\>

Type of side effect function which could be invoked on component level (getStaticProps/getServerSideProps)

##### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](/docs/nextjs/ref/interfaces/index/componentrendering) |
| `layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) |
| `context` | `NextContext` |

##### Returns

`Promise`<`FetchedProps`\>

___

### GetServerSideComponentProps

Ƭ **GetServerSideComponentProps**: [`ComponentPropsFetchFunction`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropsfetchfunction)<`GetServerSidePropsContext`\>

Shape of getServerSideProps function on component level

___

### GetStaticComponentProps

Ƭ **GetStaticComponentProps**: [`ComponentPropsFetchFunction`](/docs/nextjs/ref/modules/sharedtypes_component_props#componentpropsfetchfunction)<`GetStaticPropsContext`\>

Shape of getStaticProps function on component level
