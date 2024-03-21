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
- [failed](PlaceholderComponent.md#failed)
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

| Name                        | Type                         |
| :-------------------------- | :--------------------------- |
| `differs`                   | `KeyValueDiffers`            |
| `componentFactory`          | `JssComponentFactoryService` |
| `changeDetectorRef`         | `ChangeDetectorRef`          |
| `elementRef`                | `ElementRef`\<`any`\>        |
| `renderer`                  | `Renderer2`                  |
| `router`                    | `Router`                     |
| `missingComponentComponent` | `Type`\<`unknown`\>          |
| `hiddenRenderingComponent`  | `Type`\<`unknown`\>          |
| `guardResolver`             | `GuardResolver`              |
| `dataResolver`              | `DataResolver`               |
| `platformId`                | `Object`                     |

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:99](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L99)

## Properties

### \_componentInstances

• `Private` **\_componentInstances**: \{ `[prop: string]`: `unknown`; }[] = `[]`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:95](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L95)

---

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`\<`string`, `unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:94](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L94)

---

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:93](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L93)

---

### changeDetectorRef

• `Private` **changeDetectorRef**: `ChangeDetectorRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:102](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L102)

---

### clientOnly

• **clientOnly**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:79](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L79)

---

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:101](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L101)

---

### dataResolver

• `Private` **dataResolver**: `DataResolver`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:110](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L110)

---

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:96](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L96)

---

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:100](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L100)

---

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:103](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L103)

---

### failed

• **failed**: `EventEmitter`\<`Error`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:82](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L82)

---

### guardResolver

• `Private` **guardResolver**: `GuardResolver`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:109](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L109)

---

### hiddenRenderingComponent

• `Private` **hiddenRenderingComponent**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:108](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L108)

---

### isLoading

• **isLoading**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:91](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L91)

---

### loaded

• **loaded**: `EventEmitter`\<`undefined` \| `string`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:81](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L81)

---

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:107](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L107)

---

### name

• `Optional` **name**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:75](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L75)

---

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:78](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L78)

---

### parentStyleAttribute

• `Private` **parentStyleAttribute**: `string` = `''`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:97](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L97)

---

### placeholderLoading

• `Optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:87](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L87)

---

### platformId

• `Private` **platformId**: `Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:112](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L112)

---

### renderEachTemplate

• **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:84](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L84)

---

### renderEmptyTemplate

• **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:85](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L85)

---

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:104](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L104)

---

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:76](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L76)

---

### renderings

• `Optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:77](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L77)

---

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:105](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L105)

---

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:89](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L89)

## Accessors

### inputs

• `set` **inputs**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:115](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L115)

## Methods

### \_render

▸ `Private` **\_render**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:191](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L191)

---

### \_renderEmbeddedComponent

▸ `Private` **\_renderEmbeddedComponent**(`rendering`, `data`, `index`): `void`

#### Parameters

| Name        | Type                     |
| :---------- | :----------------------- |
| `rendering` | `ComponentFactoryResult` |
| `data`      | `Data`                   |
| `index`     | `number`                 |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:287](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L287)

---

### \_renderTemplatedComponent

▸ `Private` **\_renderTemplatedComponent**(`rendering`, `index`): `void`

#### Parameters

| Name        | Type                                                                                                                           |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `rendering` | [`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) |
| `index`     | `number`                                                                                                                       |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:274](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L274)

---

### \_setComponentInputs

▸ `Private` **\_setComponentInputs**(`componentInstance`, `inputs`): `void`

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `componentInstance` | `Object` |
| `inputs`            | `Object` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:167](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L167)

---

### \_subscribeComponentOutputs

▸ `Private` **\_subscribeComponentOutputs**(`componentInstance`, `outputs`): `void`

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `componentInstance` | `Object` |
| `outputs`           | `Object` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:176](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L176)

---

### ngDoCheck

▸ **ngDoCheck**(): `void`

#### Returns

`void`

#### Implementation of

DoCheck.ngDoCheck

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:149](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L149)

---

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:143](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L143)

---

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:138](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L138)

---

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:123](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L123)
