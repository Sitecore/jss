---
name: layoutservicecontext
routeTemplate: ./data/component-templates/article.yml
title: layoutservicecontext
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / LayoutServiceContext

# Interface: LayoutServiceContext

[index](/docs/nextjs/ref/modules/index).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](/docs/nextjs/ref/interfaces/index/layoutservicecontext#language)
- [pageEditing](/docs/nextjs/ref/interfaces/index/layoutservicecontext#pageediting)
- [pageState](/docs/nextjs/ref/interfaces/index/layoutservicecontext#pagestate)
- [site](/docs/nextjs/ref/interfaces/index/layoutservicecontext#site)
- [visitorIdentificationTimestamp](/docs/nextjs/ref/interfaces/index/layoutservicecontext#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

___

### pageState

• `Optional` **pageState**: [`Preview`](/docs/nextjs/ref/enums/index/layoutservicepagestate#preview) \| [`Edit`](/docs/nextjs/ref/enums/index/layoutservicepagestate#edit) \| [`Normal`](/docs/nextjs/ref/enums/index/layoutservicepagestate#normal)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`
