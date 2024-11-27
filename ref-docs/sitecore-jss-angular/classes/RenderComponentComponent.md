[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / RenderComponentComponent

# Class: RenderComponentComponent

Renders a single JSS component given a rendering definition.
Useful inside templated placeholders.

## Implements

- `OnChanges`

## Constructors

### new RenderComponentComponent()

> **new RenderComponentComponent**(`differs`, `componentFactory`, `missingComponentComponent`): [`RenderComponentComponent`](RenderComponentComponent.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `differs` | `KeyValueDiffers` |
| `componentFactory` | `JssComponentFactoryService` |
| `missingComponentComponent` | `Type`\<`object`\> |

#### Returns

[`RenderComponentComponent`](RenderComponentComponent.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:43](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-angular/src/components/render-component.component.ts#L43)

## Properties

### outputs

> **outputs**: `object`

#### Index Signature

 \[`k`: `string`\]: (`eventType`) => `void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:36](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-angular/src/components/render-component.component.ts#L36)

***

### rendering

> **rendering**: [`ComponentRendering`](../interfaces/ComponentRendering.md)\<[`ComponentFields`](../interfaces/ComponentFields.md)\> \| [`HtmlElementRendering`](../interfaces/HtmlElementRendering.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:35](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-angular/src/components/render-component.component.ts#L35)

## Accessors

### inputs

#### Set Signature

> **set** **inputs**(`value`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `object` |

##### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:51](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-angular/src/components/render-component.component.ts#L51)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

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

#### Defined in

[packages/sitecore-jss-angular/src/components/render-component.component.ts:58](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-angular/src/components/render-component.component.ts#L58)
