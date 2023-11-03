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
- [changeDetectorRef](PlaceholderComponent.md#changedetectorref)
- [clientOnly](PlaceholderComponent.md#clientonly)
- [componentFactory](PlaceholderComponent.md#componentfactory)
- [dataResolver](PlaceholderComponent.md#dataresolver)
- [destroyed](PlaceholderComponent.md#destroyed)
- [differs](PlaceholderComponent.md#differs)
- [elementRef](PlaceholderComponent.md#elementref)
- [guardResolver](PlaceholderComponent.md#guardresolver)
- [hiddenRenderingComponent](PlaceholderComponent.md#hiddenrenderingcomponent)
- [isLoading](PlaceholderComponent.md#isloading)
- [loaded](PlaceholderComponent.md#loaded)
- [missingComponentComponent](PlaceholderComponent.md#missingcomponentcomponent)
- [name](PlaceholderComponent.md#name)
- [outputs](PlaceholderComponent.md#outputs)
- [parentStyleAttribute](PlaceholderComponent.md#parentstyleattribute)
- [placeholderLoading](PlaceholderComponent.md#placeholderloading)
- [platformId](PlaceholderComponent.md#platformid)
- [renderEachTemplate](PlaceholderComponent.md#rendereachtemplate)
- [renderEmptyTemplate](PlaceholderComponent.md#renderemptytemplate)
- [renderer](PlaceholderComponent.md#renderer)
- [rendering](PlaceholderComponent.md#rendering)
- [renderings](PlaceholderComponent.md#renderings)
- [router](PlaceholderComponent.md#router)
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

• **new PlaceholderComponent**(`differs`, `componentFactory`, `changeDetectorRef`, `elementRef`, `renderer`, `router`, `missingComponentComponent`, `hiddenRenderingComponent`, `guardResolver`, `dataResolver`, `platformId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `changeDetectorRef` | `ChangeDetectorRef` |
| `elementRef` | `ElementRef`<`any`\> |
| `renderer` | `Renderer2` |
| `router` | `Router` |
| `missingComponentComponent` | `Type`<`unknown`\> |
| `hiddenRenderingComponent` | `Type`<`unknown`\> |
| `guardResolver` | `GuardResolver` |
| `dataResolver` | `DataResolver` |
| `platformId` | `Object` |

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:97](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L97)

## Properties

### \_componentInstances

• `Private` **\_componentInstances**: { `[prop: string]`: `unknown`;  }[] = `[]`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:93](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L93)

___

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`<`string`, `unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:92](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L92)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:91](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L91)

___

### changeDetectorRef

• `Private` **changeDetectorRef**: `ChangeDetectorRef`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:100](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L100)

___

### clientOnly

• **clientOnly**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:78](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L78)

___

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:99](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L99)

___

### dataResolver

• `Private` **dataResolver**: `DataResolver`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:108](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L108)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:94](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L94)

___

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:98](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L98)

___

### elementRef

• `Private` **elementRef**: `ElementRef`<`any`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:101](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L101)

___

### guardResolver

• `Private` **guardResolver**: `GuardResolver`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:107](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L107)

___

### hiddenRenderingComponent

• `Private` **hiddenRenderingComponent**: `Type`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:106](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L106)

___

### isLoading

• **isLoading**: `boolean` = `true`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:89](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L89)

___

### loaded

• **loaded**: `EventEmitter`<`undefined` \| `string`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:80](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L80)

___

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:105](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L105)

___

### name

• `Optional` **name**: `string`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:74](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L74)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:77](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L77)

___

### parentStyleAttribute

• `Private` **parentStyleAttribute**: `string` = `''`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:95](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L95)

___

### placeholderLoading

• `Optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:85](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L85)

___

### platformId

• `Private` **platformId**: `Object`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:110](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L110)

___

### renderEachTemplate

• **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:82](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L82)

___

### renderEmptyTemplate

• **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:83](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L83)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:102](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L102)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:75](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L75)

___

### renderings

• `Optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:76](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L76)

___

### router

• `Private` **router**: `Router`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:103](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L103)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:87](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L87)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:113](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L113)

## Methods

### \_render

▸ `Private` **_render**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:189](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L189)

___

### \_renderEmbeddedComponent

▸ `Private` **_renderEmbeddedComponent**(`rendering`, `data`, `index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | `ComponentFactoryResult` |
| `data` | `Data` |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:276](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L276)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:263](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L263)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:165](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L165)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:174](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L174)

___

### ngDoCheck

▸ **ngDoCheck**(): `void`

#### Returns

`void`

#### Implementation of

DoCheck.ngDoCheck

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:147](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L147)

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

[sitecore-jss-angular/src/components/placeholder.component.ts:141](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L141)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:136](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L136)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[sitecore-jss-angular/src/components/placeholder.component.ts:121](https://github.com/Sitecore/jss/blob/5558288f0/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L121)
