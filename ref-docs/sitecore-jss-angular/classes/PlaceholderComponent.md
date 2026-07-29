[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / PlaceholderComponent

# Class: PlaceholderComponent

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:68](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L68)

## Implements

- `OnInit`
- `OnChanges`
- `DoCheck`
- `OnDestroy`

## Constructors

### Constructor

> **new PlaceholderComponent**(): `PlaceholderComponent`

#### Returns

`PlaceholderComponent`

## Properties

### chromeType

> **chromeType**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:83](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L83)

***

### clientOnly

> **clientOnly**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:73](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L73)

***

### failed

> **failed**: `EventEmitter`\<`Error`\>

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:76](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L76)

***

### isLoading

> **isLoading**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:82](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L82)

***

### loaded

> **loaded**: `EventEmitter`\<`string` \| `undefined`\>

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:75](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L75)

***

### name?

> `optional` **name?**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:69](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L69)

***

### outputs

> **outputs**: `object`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:72](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L72)

#### Index Signature

\[`k`: `string`\]: (`eventType`) => `void`

***

### placeholderLoading?

> `optional` **placeholderLoading?**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:80](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L80)

***

### renderEachTemplate

> **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:77](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L77)

***

### renderEmptyTemplate

> **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:78](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L78)

***

### rendering

> **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:70](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L70)

***

### renderings?

> `optional` **renderings?**: ([`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>)[]

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:71](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L71)

## Accessors

### inputs

#### Set Signature

> **set** **inputs**(`value`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:105](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L105)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | \{\[`key`: `string`\]: `unknown`; \} |

##### Returns

`void`

## Methods

### ngDoCheck()

> **ngDoCheck**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:142](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L142)

A callback method that performs change-detection, invoked
after the default change-detector runs.
See `KeyValueDiffers` and `IterableDiffers` for implementing
custom change checking for collections.

#### Returns

`void`

#### Implementation of

`DoCheck.ngDoCheck`

***

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:134](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L134)

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

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:129](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L129)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:112](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L112)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
