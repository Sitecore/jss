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
- [itemPath](index.LayoutServiceContext.md#itempath)
- [language](index.LayoutServiceContext.md#language)
- [pageEditing](index.LayoutServiceContext.md#pageediting)
- [pageState](index.LayoutServiceContext.md#pagestate)
- [site](index.LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](index.LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

sitecore-jss/types/layout/models.d.ts:41

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

sitecore-jss/types/layout/models.d.ts:40

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/index.EditMode.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:39

___

### itemPath

• `Optional` **itemPath**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:33

___

### language

• `Optional` **language**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:32

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

sitecore-jss/types/layout/models.d.ts:31

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/index.LayoutServicePageState.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:34

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

sitecore-jss/types/layout/models.d.ts:36

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

sitecore-jss/types/layout/models.d.ts:35
