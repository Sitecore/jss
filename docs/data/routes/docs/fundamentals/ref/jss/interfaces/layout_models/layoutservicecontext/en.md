---
name: layoutservicecontext
routeTemplate: ./data/component-templates/article.yml
title: layoutservicecontext
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/models](/docs/fundamentals/ref/jss/modules/layout_models) / LayoutServiceContext

# Interface: LayoutServiceContext

[layout/models](/docs/fundamentals/ref/jss/modules/layout_models).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext#language)
- [pageEditing](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext#pageediting)
- [pageState](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext#pagestate)
- [site](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext#site)
- [visitorIdentificationTimestamp](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicecontext#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

___

### pageState

• `Optional` **pageState**: [`Preview`](/docs/fundamentals/ref/jss/enums/layout_models/layoutservicepagestate#preview) \| [`Edit`](/docs/fundamentals/ref/jss/enums/layout_models/layoutservicepagestate#edit) \| [`Normal`](/docs/fundamentals/ref/jss/enums/layout_models/layoutservicepagestate#normal)

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
