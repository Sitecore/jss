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
| `missingComponentComponent` | `Type`\<\{ `[key: string]`: `unknown`;  }\> |

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:43](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L43)

## Properties

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`\<`string`, `unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:40](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L40)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:39](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L39)

___

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:45](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L45)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:41](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L41)

___

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:44](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L44)

___

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`\<\{ `[key: string]`: `unknown`;  }\>

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:47](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L47)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:36](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L36)

___

### rendering

• **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md) \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:35](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L35)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:37](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L37)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:50](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L50)

## Methods

### \_render

▸ `Private` **_render**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:89](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L89)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:64](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L64)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:74](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L74)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:58](https://github.com/Sitecore/jss/blob/07fb39be2/packages/sitecore-jss-angular/src/components/render-component.component.ts#L58)
