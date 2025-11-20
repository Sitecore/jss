[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / PlaceholderComponent

# Class: PlaceholderComponent

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:102](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L102)

## Implements

- `OnInit`
- `OnChanges`
- `DoCheck`
- `OnDestroy`

## Constructors

### Constructor

> **new PlaceholderComponent**(): `PlaceholderComponent`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:142](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L142)

#### Returns

`PlaceholderComponent`

## Properties

### chromeType

> **chromeType**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:119](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L119)

***

### clientOnly

> **clientOnly**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:107](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L107)

***

### failed

> **failed**: `EventEmitter`\<`Error`\>

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:110](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L110)

***

### isLoading

> **isLoading**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:117](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L117)

***

### loaded

> **loaded**: `EventEmitter`\<`undefined` \| `string`\>

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:109](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L109)

***

### metadataMode

> **metadataMode**: `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:118](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L118)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:103](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L103)

***

### outputs

> **outputs**: `object`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:106](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L106)

#### Index Signature

\[`k`: `string`\]: (`eventType`) => `void`

***

### placeholderLoading?

> `optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:114](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L114)

***

### renderEachTemplate

> **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:111](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L111)

***

### renderEmptyTemplate

> **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:112](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L112)

***

### rendering

> **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:104](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L104)

***

### renderings?

> `optional` **renderings**: ([`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>)[]

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:105](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L105)

## Accessors

### inputs

#### Set Signature

> **set** **inputs**(`value`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:149](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L149)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | \{\[`key`: `string`\]: `unknown`; \} |

##### Returns

`void`

## Methods

### getCodeBlockId()

> **getCodeBlockId**(`kind`, `renderingId?`): `undefined` \| `string`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:215](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L215)

Gets id for Metadata code blocks, in specific format
Metadata code blocks will wrap be added around placeholder content and each rendering component
to allow for editing integration in Pages.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `string` | code block type ("open" or "close"). "open" is added before an element, and "close" added after one. |
| `renderingId?` | `string` | rendering uid to apply as id to code block |

#### Returns

`undefined` \| `string`

formatted id value for code HTML node

***

### ngDoCheck()

> **ngDoCheck**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:189](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L189)

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

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:181](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L181)

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

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:173](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L173)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/placeholder.component.ts:156](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L156)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
