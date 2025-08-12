[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / RenderComponentComponent

# Class: RenderComponentComponent

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:34](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L34)

Renders a single JSS component given a rendering definition.
Useful inside templated placeholders.

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new RenderComponentComponent**(`differs`, `componentFactory`, `missingComponentComponent`): `RenderComponentComponent`

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:43](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `missingComponentComponent` | `Type`\<\{\[`key`: `string`\]: `unknown`; \}\> |

#### Returns

`RenderComponentComponent`

## Properties

### outputs

> **outputs**: `object`

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:36](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L36)

#### Index Signature

\[`k`: `string`\]: (`eventType`) => `void`

***

### rendering

> **rendering**: [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md) \| [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\>

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:35](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L35)

## Accessors

### inputs

#### Set Signature

> **set** **inputs**(`value`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:51](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L51)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | \{\[`key`: `string`\]: `unknown`; \} |

##### Returns

`void`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/render-component.component.ts:58](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-angular/src/components/render-component.component.ts#L58)

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
