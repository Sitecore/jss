[@sitecore-jss/sitecore-jss-angular](../README.md) / PlaceholderComponent

# Class: PlaceholderComponent

## Implements

- `OnInit`
- `OnChanges`
- `DoCheck`
- `OnDestroy`

## Table of contents

### Constructors

- [constructor](PlaceholderComponent.md#constructor)

### Properties

- [\_componentInstances](PlaceholderComponent.md#_componentinstances)
- [\_differ](PlaceholderComponent.md#_differ)
- [\_inputs](PlaceholderComponent.md#_inputs)
- [destroyed](PlaceholderComponent.md#destroyed)
- [isLoading](PlaceholderComponent.md#isloading)
- [loaded](PlaceholderComponent.md#loaded)
- [name](PlaceholderComponent.md#name)
- [outputs](PlaceholderComponent.md#outputs)
- [parentStyleAttribute](PlaceholderComponent.md#parentstyleattribute)
- [placeholderLoading](PlaceholderComponent.md#placeholderloading)
- [renderEachTemplate](PlaceholderComponent.md#rendereachtemplate)
- [renderEmptyTemplate](PlaceholderComponent.md#renderemptytemplate)
- [rendering](PlaceholderComponent.md#rendering)
- [renderings](PlaceholderComponent.md#renderings)
- [view](PlaceholderComponent.md#view)

### Accessors

- [inputs](PlaceholderComponent.md#inputs)

### Methods

- [\_render](PlaceholderComponent.md#_render)
- [\_renderEmbeddedComponent](PlaceholderComponent.md#_renderembeddedcomponent)
- [\_renderTemplatedComponent](PlaceholderComponent.md#_rendertemplatedcomponent)
- [\_setComponentInputs](PlaceholderComponent.md#_setcomponentinputs)
- [\_subscribeComponentOutputs](PlaceholderComponent.md#_subscribecomponentoutputs)
- [ngDoCheck](PlaceholderComponent.md#ngdocheck)
- [ngOnChanges](PlaceholderComponent.md#ngonchanges)
- [ngOnDestroy](PlaceholderComponent.md#ngondestroy)
- [ngOnInit](PlaceholderComponent.md#ngoninit)

## Constructors

### constructor

• **new PlaceholderComponent**(`componentFactoryResolver`, `differs`, `componentFactory`, `changeDetectorRef`, `elementRef`, `renderer`, `missingComponentComponent`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentFactoryResolver` | `ComponentFactoryResolver` |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `changeDetectorRef` | `ChangeDetectorRef` |
| `elementRef` | `ElementRef`<`any`\> |
| `renderer` | `Renderer2` |
| `missingComponentComponent` | `Type`<`unknown`\> |

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:88](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L88)

## Properties

### \_componentInstances

• `Private` **\_componentInstances**: { [prop: string]: `unknown`;  }[] = `[]`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:61](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L61)

___

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`<`string`, `unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:60](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L60)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:59](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L59)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:62](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L62)

___

### isLoading

• **isLoading**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:64](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L64)

___

### loaded

• **loaded**: `EventEmitter`<`undefined` \| `string`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:72](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L72)

___

### name

• `Optional` **name**: `string`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:66](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L66)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:69](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L69)

___

### parentStyleAttribute

• `Private` **parentStyleAttribute**: `string` = `''`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:63](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L63)

___

### placeholderLoading

• `Optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:78](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L78)

___

### renderEachTemplate

• **renderEachTemplate**: `RenderEachDirective`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:75](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L75)

___

### renderEmptyTemplate

• **renderEmptyTemplate**: `RenderEmptyDirective`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:76](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L76)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:67](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L67)

___

### renderings

• `Optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:68](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L68)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:74](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L74)

## Accessors

### inputs

• `set` **inputs**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:81](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L81)

## Methods

### \_render

▸ `Private` **_render**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:167](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L167)

___

### \_renderEmbeddedComponent

▸ `Private` **_renderEmbeddedComponent**(`rendering`, `index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | `ComponentFactoryResult` |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:237](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L237)

___

### \_renderTemplatedComponent

▸ `Private` **_renderTemplatedComponent**(`rendering`, `index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:224](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L224)

___

### \_setComponentInputs

▸ `Private` **_setComponentInputs**(`componentInstance`, `inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentInstance` | `Object` |
| `inputs` | `Object` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:143](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L143)

___

### \_subscribeComponentOutputs

▸ `Private` **_subscribeComponentOutputs**(`componentInstance`, `outputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentInstance` | `Object` |
| `outputs` | `Object` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:152](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L152)

___

### ngDoCheck

▸ **ngDoCheck**(): `void`

#### Returns

`void`

#### Implementation of

DoCheck.ngDoCheck

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:125](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L125)

___

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:119](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L119)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:114](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L114)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:99](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L99)
