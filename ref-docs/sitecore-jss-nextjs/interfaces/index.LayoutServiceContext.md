[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / LayoutServiceContext

# Interface: LayoutServiceContext

[index](../modules/index.md).LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [clientData](index.LayoutServiceContext.md#clientdata)
- [clientScripts](index.LayoutServiceContext.md#clientscripts)
- [editMode](index.LayoutServiceContext.md#editmode)
- [language](index.LayoutServiceContext.md#language)
- [pageEditing](index.LayoutServiceContext.md#pageediting)
- [pageState](index.LayoutServiceContext.md#pagestate)
- [renderingType](index.LayoutServiceContext.md#renderingtype)
- [site](index.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](index.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

sitecore-jss/types/layout/models.d.ts:55

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

sitecore-jss/types/layout/models.d.ts:54

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/index.EditMode.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:53

___

### language

• `Optional` **language**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:47

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

sitecore-jss/types/layout/models.d.ts:46

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/index.LayoutServicePageState.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:48

___

### renderingType

• `Optional` **renderingType**: [`Component`](../enums/index.RenderingType.md#component)

#### Defined in

sitecore-jss/types/layout/models.d.ts:45

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

sitecore-jss/types/layout/models.d.ts:50

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

sitecore-jss/types/layout/models.d.ts:49
