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

• **new PlaceholderComponent**(`componentFactoryResolver`, `differs`, `componentFactory`, `changeDetectorRef`, `elementRef`, `renderer`, `missingComponentComponent`, `hiddenRenderingComponent`)

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
| `hiddenRenderingComponent` | `Type`<`unknown`\> |

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:92](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L92)

## Properties

### \_componentInstances

• `Private` **\_componentInstances**: { [prop: string]: `unknown`;  }[] = `[]`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:65](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L65)

___

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`<`string`, `unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:64](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L64)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:63](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L63)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:66](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L66)

___

### isLoading

• **isLoading**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:68](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L68)

___

### loaded

• **loaded**: `EventEmitter`<`undefined` \| `string`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:76](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L76)

___

### name

• `Optional` **name**: `string`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:70](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L70)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:73](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L73)

___

### parentStyleAttribute

• `Private` **parentStyleAttribute**: `string` = `''`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:67](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L67)

___

### placeholderLoading

• `Optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:82](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L82)

___

### renderEachTemplate

• **renderEachTemplate**: `RenderEachDirective`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:79](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L79)

___

### renderEmptyTemplate

• **renderEmptyTemplate**: `RenderEmptyDirective`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:80](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L80)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:71](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L71)

___

### renderings

• `Optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:72](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L72)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:78](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L78)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:85](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L85)

## Methods

### \_render

▸ `Private` **_render**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:173](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L173)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:243](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L243)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:230](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L230)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:149](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L149)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:158](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L158)

___

### ngDoCheck

▸ **ngDoCheck**(): `void`

#### Returns

`void`

#### Implementation of

DoCheck.ngDoCheck

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:131](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L131)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:125](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L125)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:120](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L120)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:105](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L105)
