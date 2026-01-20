[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FileDirective

# Class: FileDirective

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:17](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/file.directive.ts#L17)

File fields cannot be managed via the EE. We never output "editable."

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new FileDirective**(): `FileDirective`

#### Returns

`FileDirective`

## Properties

### field

> **field**: [`FileField`](../interfaces/FileField.md)

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:18](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/file.directive.ts#L18)

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/file.directive.ts:24](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-angular/src/components/file.directive.ts#L24)

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
