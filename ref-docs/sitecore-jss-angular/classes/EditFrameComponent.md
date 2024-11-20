[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / EditFrameComponent

# Class: EditFrameComponent

## Implements

- `OnChanges`

## Constructors

### new EditFrameComponent()

> **new EditFrameComponent**(): [`EditFrameComponent`](EditFrameComponent.md)

#### Returns

[`EditFrameComponent`](EditFrameComponent.md)

## Properties

### buttons

> **buttons**: `EditButtonTypes`[]

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:32](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L32)

***

### chromeData

> **chromeData**: `string` = `''`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:48](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L48)

***

### cssClass

> **cssClass**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:38](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L38)

***

### dataSource

> **dataSource**: [`EditFrameDataSource`](../type-aliases/EditFrameDataSource.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:30](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L30)

***

### frameProps

> **frameProps**: `Record`\<`string`, `unknown`\> = `{}`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:47](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L47)

***

### isEditing

> **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:46](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L46)

***

### parameters

> **parameters**: `Record`\<`string`, `undefined` \| `null` \| `string` \| `number` \| `boolean`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:40](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L40)

***

### sitecore

> **sitecore**: [`LayoutServiceContextData`](../interfaces/LayoutServiceContextData.md) & `object`

#### Type declaration

##### route

> **route**: `null` \| [`RouteData`](../interfaces/RouteData.md)\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:42](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L42)

***

### title

> **title**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:34](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L34)

***

### tooltip

> **tooltip**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:36](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L36)

## Methods

### buildChromeData()

> **buildChromeData**(): `string`

#### Returns

`string`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:72](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L72)

***

### ngOnChanges()

> **ngOnChanges**(): `void`

A callback method that is invoked immediately after the
default change detector has checked data-bound properties
if at least one has changed, and before the view and content
children are checked.

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`

#### Defined in

[packages/sitecore-jss-angular/src/components/editframe.component.ts:50](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-angular/src/components/editframe.component.ts#L50)
