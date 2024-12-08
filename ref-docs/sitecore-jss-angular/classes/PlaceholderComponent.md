[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / PlaceholderComponent

# Class: PlaceholderComponent

## Implements

- `OnInit`
- `OnChanges`
- `DoCheck`
- `OnDestroy`

## Constructors

### new PlaceholderComponent()

> **new PlaceholderComponent**(`differs`, `componentFactory`, `changeDetectorRef`, `elementRef`, `renderer`, `router`, `missingComponentComponent`, `hiddenRenderingComponent`, `guardResolver`, `dataResolver`, `platformId`, `jssState`): [`PlaceholderComponent`](PlaceholderComponent.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `changeDetectorRef` | `ChangeDetectorRef` |
| `elementRef` | `ElementRef`\<`any`\> |
| `renderer` | `Renderer2` |
| `router` | `Router` |
| `missingComponentComponent` | `Type`\<`unknown`\> |
| `hiddenRenderingComponent` | `Type`\<`unknown`\> |
| `guardResolver` | `GuardResolver` |
| `dataResolver` | `DataResolver` |
| `platformId` | `object` |
| `jssState` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |

#### Returns

[`PlaceholderComponent`](PlaceholderComponent.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:132](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L132)

## Properties

### chromeType

> **chromeType**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:123](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L123)

***

### clientOnly

> **clientOnly**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:111](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L111)

***

### failed

> **failed**: `EventEmitter`\<`Error`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:114](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L114)

***

### isLoading

> **isLoading**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:121](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L121)

***

### loaded

> **loaded**: `EventEmitter`\<`undefined` \| `string`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:113](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L113)

***

### metadataMode

> **metadataMode**: `boolean`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:122](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L122)

***

### name?

> `optional` **name**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:107](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L107)

***

### outputs

> **outputs**: `object`

#### Index Signature

 \[`k`: `string`\]: (`eventType`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:110](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L110)

***

### placeholderLoading?

> `optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:118](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L118)

***

### renderEachTemplate

> **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:115](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L115)

***

### renderEmptyTemplate

> **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:116](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L116)

***

### rendering

> **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:108](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L108)

***

### renderings?

> `optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:109](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L109)

## Accessors

### inputs

#### Set Signature

> **set** **inputs**(`value`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `object` |

##### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:153](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L153)

## Methods

### getCodeBlockId()

> **getCodeBlockId**(`kind`, `renderingId`?): `undefined` \| `string`

Gets id for Metadata code blocks, in specific format
Metadata code blocks will wrap be added around placeholder content and each rendering component
to allow for editing integration in Pages.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `string` | code block type ("open" or "close"). "open" is added before an element, and "close" added after one. |
| `renderingId`? | `string` | rendering uid to apply as id to code block |

#### Returns

`undefined` \| `string`

formatted id value for code HTML node

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:219](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L219)

***

### ngDoCheck()

> **ngDoCheck**(): `void`

A callback method that performs change-detection, invoked
after the default change-detector runs.
See `KeyValueDiffers` and `IterableDiffers` for implementing
custom change checking for collections.

#### Returns

`void`

#### Implementation of

`DoCheck.ngDoCheck`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:193](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L193)

***

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

A callback method that is invoked immediately after the
default change detector has checked data-bound properties
if at least one has changed, and before the view and content
children are checked.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `changes` | `SimpleChanges` | The changed properties. |

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:185](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L185)

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:177](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L177)

***

### ngOnInit()

> **ngOnInit**(): `void`

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:160](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L160)
