[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FileDirective

# Class: FileDirective

File fields cannot be managed via the EE. We never output "editable."

## Implements

- `OnChanges`

## Constructors

### new FileDirective()

> **new FileDirective**(`viewContainer`, `templateRef`): [`FileDirective`](FileDirective.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |

#### Returns

[`FileDirective`](FileDirective.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

## Properties

### field

> **field**: [`FileField`](../interfaces/FileField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:17](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/file.directive.ts#L17)

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

[packages/sitecore-jss-angular/src/components/file.directive.ts:23](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/file.directive.ts#L23)
