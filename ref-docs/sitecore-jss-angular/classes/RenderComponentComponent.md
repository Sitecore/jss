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

• **new RenderComponentComponent**()

## Properties

### \_differ

• `Private` **\_differ**: `KeyValueDiffer`\<`string`, `unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:40](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L40)

___

### \_inputs

• `Private` **\_inputs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:39](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L39)

___

### componentFactory

• `Private` **componentFactory**: `JssComponentFactoryService`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:43](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L43)

___

### destroyed

• `Private` **destroyed**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:41](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L41)

___

### differs

• `Private` **differs**: `KeyValueDiffers`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:42](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L42)

___

### missingComponentComponent

• `Private` **missingComponentComponent**: `Type`\<\{ `[key: string]`: `unknown`;  }\>

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:44](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L44)

___

### outputs

• **outputs**: `Object`

#### Index signature

▪ [k: `string`]: (`eventType`: `unknown`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:36](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L36)

___

### rendering

• **rendering**: [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:35](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L35)

___

### view

• `Private` **view**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:37](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L37)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:48](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L48)

## Methods

### \_render

▸ `Private` **_render**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:87](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L87)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:62](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L62)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:72](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L72)

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

[packages/sitecore-jss-angular/src/components/render-component.component.ts:56](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/render-component.component.ts#L56)
