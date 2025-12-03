[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / EditFrameComponent

# Class: EditFrameComponent

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:28](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L28)

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new EditFrameComponent**(): `EditFrameComponent`

#### Returns

`EditFrameComponent`

## Properties

### buttons

> **buttons**: `EditButtonTypes`[]

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:31](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L31)

***

### chromeData

> **chromeData**: `string` = `''`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:47](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L47)

***

### cssClass

> **cssClass**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:37](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L37)

***

### dataSource

> **dataSource**: [`EditFrameDataSource`](../type-aliases/EditFrameDataSource.md)

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:29](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L29)

***

### frameProps

> **frameProps**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:46](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L46)

***

### isEditing

> **isEditing**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:45](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L45)

***

### parameters

> **parameters**: `Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined` \| `null`\>

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:39](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L39)

***

### sitecore

> **sitecore**: [`LayoutServiceContextData`](../interfaces/LayoutServiceContextData.md) & `object`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:41](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L41)

#### Type declaration

##### route

> **route**: `null` \| [`RouteData`](../interfaces/RouteData.md)\<`unknown`\>

***

### title

> **title**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:33](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L33)

***

### tooltip

> **tooltip**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:35](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L35)

## Methods

### buildChromeData()

> **buildChromeData**(): `string`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:71](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L71)

#### Returns

`string`

***

### ngOnChanges()

> **ngOnChanges**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/editframe.component.ts:49](https://github.com/Sitecore/jss/blob/272fe9df6e6ab51081665c3700cb5282951c7f08/packages/sitecore-jss-angular/src/components/editframe.component.ts#L49)

A callback method that is invoked immediately after the
default change detector has checked data-bound properties
if at least one has changed, and before the view and content
children are checked.

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`
