[@sitecore-jss/sitecore-jss-angular](../README.md) / EditFrameComponent

# Class: EditFrameComponent

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](EditFrameComponent.md#constructor)

### Properties

- [buttons](EditFrameComponent.md#buttons)
- [chromeData](EditFrameComponent.md#chromedata)
- [cssClass](EditFrameComponent.md#cssclass)
- [dataSource](EditFrameComponent.md#datasource)
- [frameProps](EditFrameComponent.md#frameprops)
- [isEditing](EditFrameComponent.md#isediting)
- [parameters](EditFrameComponent.md#parameters)
- [sitecore](EditFrameComponent.md#sitecore)
- [title](EditFrameComponent.md#title)
- [tooltip](EditFrameComponent.md#tooltip)

### Methods

- [buildChromeData](EditFrameComponent.md#buildchromedata)
- [ngOnChanges](EditFrameComponent.md#ngonchanges)

## Constructors

### constructor

• **new EditFrameComponent**()

## Properties

### buttons

• **buttons**: `EditButtonTypes`[]

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:32](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L32)

___

### chromeData

• **chromeData**: `string` = `''`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:48](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L48)

___

### cssClass

• **cssClass**: `string`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:38](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L38)

___

### dataSource

• **dataSource**: [`EditFrameDataSource`](../README.md#editframedatasource)

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:30](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L30)

___

### frameProps

• **frameProps**: `Record`\<`string`, `unknown`\> = `{}`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:47](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L47)

___

### isEditing

• **isEditing**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:46](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L46)

___

### parameters

• **parameters**: `Record`\<`string`, `undefined` \| ``null`` \| `string` \| `number` \| `boolean`\>

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:40](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L40)

___

### sitecore

• **sitecore**: [`LayoutServiceContextData`](../interfaces/LayoutServiceContextData.md) & \{ `route`: ``null`` \| [`RouteData`](../interfaces/RouteData.md)\<`unknown`\>  }

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:42](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L42)

___

### title

• **title**: `string`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:34](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L34)

___

### tooltip

• **tooltip**: `string`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:36](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L36)

## Methods

### buildChromeData

▸ **buildChromeData**(): `string`

#### Returns

`string`

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:72](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L72)

___

### ngOnChanges

▸ **ngOnChanges**(): `void`

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[sitecore-jss-angular/src/components/editframe.component.ts:50](https://github.com/Sitecore/jss/blob/437fa9a86/packages/sitecore-jss-angular/src/components/editframe.component.ts#L50)
