[@sitecore-jss/sitecore-jss-angular](../README.md) / LayoutServiceContext

# Interface: LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [clientData](LayoutServiceContext.md#clientdata)
- [clientScripts](LayoutServiceContext.md#clientscripts)
- [editMode](LayoutServiceContext.md#editmode)
- [itemPath](LayoutServiceContext.md#itempath)
- [language](LayoutServiceContext.md#language)
- [pageEditing](LayoutServiceContext.md#pageediting)
- [pageState](LayoutServiceContext.md#pagestate)
- [site](LayoutServiceContext.md#site)
- [visitorIdentificationTimestamp](LayoutServiceContext.md#visitoridentificationtimestamp)

## Properties

### clientData

• `Optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:41

___

### clientScripts

• `Optional` **clientScripts**: `string`[]

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:40

___

### editMode

• `Optional` **editMode**: [`EditMode`](../enums/EditMode.md)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:39

___

### itemPath

• `Optional` **itemPath**: `string`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:33

___

### language

• `Optional` **language**: `string`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:32

___

### pageEditing

• `Optional` **pageEditing**: `boolean`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:31

___

### pageState

• `Optional` **pageState**: [`LayoutServicePageState`](../enums/LayoutServicePageState.md)

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:34

___

### site

• `Optional` **site**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:36

___

### visitorIdentificationTimestamp

• `Optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

packages/sitecore-jss/types/layout/models.d.ts:35
