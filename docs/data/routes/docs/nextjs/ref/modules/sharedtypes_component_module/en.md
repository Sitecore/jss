---
name: sharedtypes_component_module
routeTemplate: ./data/component-templates/article.yml
title: sharedtypes_component_module
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / sharedTypes/component-module

# Module: sharedTypes/component-module

## Table of contents

### Type aliases

- [ComponentModule](/docs/nextjs/ref/modules/sharedtypes_component_module#componentmodule)
- [Module](/docs/nextjs/ref/modules/sharedtypes_component_module#module)

## Type aliases

### ComponentModule

Ƭ **ComponentModule**: (`componentName`: `string`) => [`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module) \| `Promise`<[`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module)\> \| `undefined`

#### Type declaration

▸ (`componentName`): [`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module) \| `Promise`<[`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module)\> \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentName` | `string` |

##### Returns

[`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module) \| `Promise`<[`Module`](/docs/nextjs/ref/modules/sharedtypes_component_module#module)\> \| `undefined`

`undefined` module not found

___

### Module

Ƭ **Module**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `React.Component` |
| `getServerSideProps?` | [`GetServerSideComponentProps`](/docs/nextjs/ref/modules/sharedtypes_component_props#getserversidecomponentprops) |
| `getStaticProps?` | [`GetStaticComponentProps`](/docs/nextjs/ref/modules/sharedtypes_component_props#getstaticcomponentprops) |
