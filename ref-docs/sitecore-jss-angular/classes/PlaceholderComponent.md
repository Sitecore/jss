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
- [chromeType](PlaceholderComponent.md#chrometype)
- [clientOnly](PlaceholderComponent.md#clientonly)
- [componentFactory](PlaceholderComponent.md#componentfactory)
- [contextSubscription](PlaceholderComponent.md#contextsubscription)
- [dataResolver](PlaceholderComponent.md#dataresolver)
- [destroyed](PlaceholderComponent.md#destroyed)
- [differs](PlaceholderComponent.md#differs)
- [elementRef](PlaceholderComponent.md#elementref)
- [failed](PlaceholderComponent.md#failed)
- [guardResolver](PlaceholderComponent.md#guardresolver)
- [hiddenRenderingComponent](PlaceholderComponent.md#hiddenrenderingcomponent)
- [isLoading](PlaceholderComponent.md#isloading)
- [jssState](PlaceholderComponent.md#jssstate)
- [loaded](PlaceholderComponent.md#loaded)
- [metadataMode](PlaceholderComponent.md#metadatamode)
- [metadataNode](PlaceholderComponent.md#metadatanode)
- [missingComponentComponent](PlaceholderComponent.md#missingcomponentcomponent)
- [name](PlaceholderComponent.md#name)
- [outputs](PlaceholderComponent.md#outputs)
- [parentStyleAttribute](PlaceholderComponent.md#parentstyleattribute)
- [placeholderData](PlaceholderComponent.md#placeholderdata)
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
- [getCodeBlockId](PlaceholderComponent.md#getcodeblockid)
- [getPlaceholder](PlaceholderComponent.md#getplaceholder)
- [ngDoCheck](PlaceholderComponent.md#ngdocheck)
- [ngOnChanges](PlaceholderComponent.md#ngonchanges)
- [ngOnDestroy](PlaceholderComponent.md#ngondestroy)
- [ngOnInit](PlaceholderComponent.md#ngoninit)

## Constructors

### constructor

• **new PlaceholderComponent**(`differs`, `componentFactory`, `changeDetectorRef`, `elementRef`, `renderer`, `router`, `missingComponentComponent`, `hiddenRenderingComponent`, `guardResolver`, `dataResolver`, `platformId`, `jssState`)

#### Parameters

| Name | Type |
| :------ | :------ |
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
| `platformId` | `Object` |
| `jssState` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:132](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L132)

## Properties

### \_componentInstances

• `Private` **\_componentInstances**: \{ `[prop: string]`: `unknown`;  }[] = `[]`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:126](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L126)

___

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`\<`string`, `unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:125](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L125)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:124](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L124)

___

### changeDetectorRef

• `Private` **changeDetectorRef**: `ChangeDetectorRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:135](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L135)

___

### chromeType

• **chromeType**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:123](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L123)

___

### clientOnly

• **clientOnly**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:111](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L111)

___

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:134](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L134)

___

### contextSubscription

• `Private` **contextSubscription**: `Subscription`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:130](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L130)

___

### dataResolver

• `Private` **dataResolver**: `DataResolver`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:143](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L143)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:128](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L128)

___

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:133](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L133)

___

### elementRef

• `Private` **elementRef**: `ElementRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:136](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L136)

___

### failed

• **failed**: `EventEmitter`\<`Error`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:114](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L114)

___

### guardResolver

• `Private` **guardResolver**: `GuardResolver`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:142](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L142)

___

### hiddenRenderingComponent

• `Private` **hiddenRenderingComponent**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:141](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L141)

___

### isLoading

• **isLoading**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:121](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L121)

___

### jssState

• `Private` **jssState**: [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:146](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L146)

___

### loaded

• **loaded**: `EventEmitter`\<`undefined` \| `string`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:113](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L113)

___

### metadataMode

• **metadataMode**: `boolean`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:122](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L122)

___

### metadataNode

• `Private` **metadataNode**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:120](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L120)

___

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:140](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L140)

___

### name

• `Optional` **name**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:107](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L107)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:110](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L110)

___

### parentStyleAttribute

• `Private` **parentStyleAttribute**: `string` = `''`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:129](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L129)

___

### placeholderData

• `Private` `Optional` **placeholderData**: ([`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:127](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L127)

___

### placeholderLoading

• `Optional` **placeholderLoading**: [`PlaceholderLoadingDirective`](PlaceholderLoadingDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:118](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L118)

___

### platformId

• `Private` **platformId**: `Object`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:145](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L145)

___

### renderEachTemplate

• **renderEachTemplate**: [`RenderEachDirective`](RenderEachDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:115](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L115)

___

### renderEmptyTemplate

• **renderEmptyTemplate**: [`RenderEmptyDirective`](RenderEmptyDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:116](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L116)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:137](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L137)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:108](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L108)

___

### renderings

• `Optional` **renderings**: ([`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:109](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L109)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:138](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L138)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:119](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L119)

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

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:153](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L153)

## Methods

### \_render

▸ `Private` **_render**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:312](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L312)

___

### \_renderEmbeddedComponent

▸ `Private` **_renderEmbeddedComponent**(`rendering`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | `ComponentFactoryResult` |
| `data` | `Data` |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:416](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L416)

___

### \_renderTemplatedComponent

▸ `Private` **_renderTemplatedComponent**(`rendering`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:407](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L407)

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

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:288](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L288)

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

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:297](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L297)

___

### getCodeBlockId

▸ **getCodeBlockId**(`kind`, `renderingId?`): `undefined` \| `string`

Gets id for Metadata code blocks, in specific format
Metadata code blocks will wrap be added around placeholder content and each rendering component
to allow for editing integration in Pages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | code block type ("open" or "close"). "open" is added before an element, and "close" added after one. |
| `renderingId?` | `string` | rendering uid to apply as id to code block |

#### Returns

`undefined` \| `string`

formatted id value for code HTML node

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:220](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L220)

___

### getPlaceholder

▸ `Private` **getPlaceholder**(): ``null`` \| ([`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

Get renderings/components to be rendered for current placeholder name
Can modify the inner placeholders collection to adjust to using SXA dynamic placeholders

#### Returns

``null`` \| ([`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md))[]

List of renderings to be rendered

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:256](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L256)

___

### ngDoCheck

▸ **ngDoCheck**(): `void`

#### Returns

`void`

#### Implementation of

DoCheck.ngDoCheck

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:194](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L194)

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

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:186](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L186)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:178](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L178)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[packages/sitecore-jss-angular/src/components/placeholder.component.ts:161](https://github.com/Sitecore/jss/blob/f4f5c58a8/packages/sitecore-jss-angular/src/components/placeholder.component.ts#L161)
