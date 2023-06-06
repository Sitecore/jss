[@sitecore-jss/sitecore-jss-angular](../README.md) / RenderComponentComponent

# Class: RenderComponentComponent

Renders a single JSS component given a rendering definition.
Useful inside templated placeholders.

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](RenderComponentComponent.md#constructor)

### Properties

- [\_differ](RenderComponentComponent.md#_differ)
- [\_inputs](RenderComponentComponent.md#_inputs)
- [componentFactory](RenderComponentComponent.md#componentfactory)
- [destroyed](RenderComponentComponent.md#destroyed)
- [differs](RenderComponentComponent.md#differs)
- [missingComponentComponent](RenderComponentComponent.md#missingcomponentcomponent)
- [outputs](RenderComponentComponent.md#outputs)
- [rendering](RenderComponentComponent.md#rendering)
- [view](RenderComponentComponent.md#view)

### Accessors

- [inputs](RenderComponentComponent.md#inputs)

### Methods

- [\_render](RenderComponentComponent.md#_render)
- [\_setComponentInputs](RenderComponentComponent.md#_setcomponentinputs)
- [\_subscribeComponentOutputs](RenderComponentComponent.md#_subscribecomponentoutputs)
- [ngOnChanges](RenderComponentComponent.md#ngonchanges)

## Constructors

### constructor

• **new RenderComponentComponent**(`differs`, `componentFactory`, `missingComponentComponent`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `missingComponentComponent` | `Type`<{ `[key: string]`: `unknown`;  }\> |

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:51](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L51)

## Properties

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`<`string`, `unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:40](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L40)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:39](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L39)

___

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:53](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L53)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:41](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L41)

___

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:52](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L52)

___

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`<{ `[key: string]`: `unknown`;  }\>

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:55](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L55)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:36](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L36)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md)

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:35](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L35)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:37](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L37)

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

[sitecore-jss-angular/src/components/render-component.component.ts:43](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L43)

## Methods

### \_render

▸ `Private` **_render**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/render-component.component.ts:89](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L89)

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

[sitecore-jss-angular/src/components/render-component.component.ts:64](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L64)

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

[sitecore-jss-angular/src/components/render-component.component.ts:74](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L74)

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

[sitecore-jss-angular/src/components/render-component.component.ts:58](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-angular/src/components/render-component.component.ts#L58)
