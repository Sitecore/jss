[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / LayoutServiceContext

# Interface: LayoutServiceContext

[layout](../modules/layout.md).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [language](layout.LayoutServiceContext.md#language)
- [pageEditing](layout.LayoutServiceContext.md#pageediting)
- [pageState](layout.LayoutServiceContext.md#pagestate)
- [renderingType](layout.LayoutServiceContext.md#renderingtype)
- [site](layout.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](layout.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### language

• `Optional` **language**: `string`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:43](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L43)

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:42](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L42)

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/layout.LayoutServicePageState.md)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:44](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L44)

___

### renderingType

• `Optional` **renderingType**: [`Component`](../enums/layout.RenderingType.md#component)

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:41](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L41)

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:46](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L46)

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

[packages/sitecore-jss/src/layout/models.ts:45](https://github.com/Sitecore/jss/blob/d9175e07c/packages/sitecore-jss/src/layout/models.ts#L45)
