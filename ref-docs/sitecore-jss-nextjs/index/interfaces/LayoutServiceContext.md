[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / LayoutServiceContext

# Interface: LayoutServiceContext

Shape of context data from the Sitecore Layout Service

## Indexable

 \[`key`: `string`\]: `unknown`

## Properties

### clientData?

> `optional` **clientData**: `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

#### Defined in

sitecore-jss/types/layout/models.d.ts:43

***

### clientScripts?

> `optional` **clientScripts**: `string`[]

#### Defined in

sitecore-jss/types/layout/models.d.ts:42

***

### editMode?

> `optional` **editMode**: [`EditMode`](../enumerations/EditMode.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:41

***

### itemPath?

> `optional` **itemPath**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:34

***

### language?

> `optional` **language**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:33

***

### pageEditing?

> `optional` **pageEditing**: `boolean`

#### Defined in

sitecore-jss/types/layout/models.d.ts:32

***

### pageState?

> `optional` **pageState**: [`LayoutServicePageState`](../enumerations/LayoutServicePageState.md)

#### Defined in

sitecore-jss/types/layout/models.d.ts:35

***

### renderingType?

> `optional` **renderingType**: [`Component`](../../editing/enumerations/RenderingType.md#component)

#### Defined in

sitecore-jss/types/layout/models.d.ts:40

***

### site?

> `optional` **site**: `object`

#### name?

> `optional` **name**: `string`

#### Defined in

sitecore-jss/types/layout/models.d.ts:37

***

### visitorIdentificationTimestamp?

> `optional` **visitorIdentificationTimestamp**: `number`

#### Defined in

sitecore-jss/types/layout/models.d.ts:36
