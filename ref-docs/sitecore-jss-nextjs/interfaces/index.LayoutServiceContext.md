[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / LayoutServiceContext

# Interface: LayoutServiceContext

[index](../modules/index.md).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](index.LayoutServiceContext.md#language)
- [pageEditing](index.LayoutServiceContext.md#pageediting)
- [pageState](index.LayoutServiceContext.md#pagestate)
- [renderingType](index.LayoutServiceContext.md#renderingtype)
- [site](index.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](index.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:38

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:37

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/index.LayoutServicePageState.md)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:39

___

### renderingType

• `Optional` **renderingType**: [`Component`](../enums/index.RenderingType.md#component)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:36

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:41

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:40
