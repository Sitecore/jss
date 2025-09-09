[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FileDirective

# Class: FileDirective

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:16](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-angular/src/components/file.directive.ts#L16)

File fields cannot be managed via the EE. We never output "editable."

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new FileDirective**(`viewContainer`, `templateRef`): `FileDirective`

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |

#### Returns

`FileDirective`

## Properties

### field

> **field**: [`FileField`](../interfaces/FileField.md)

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:17](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-angular/src/components/file.directive.ts#L17)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:23](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-angular/src/components/file.directive.ts#L23)

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
