[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / DateDirective

# Class: DateDirective

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:9](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L9)

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new DateDirective**(): `DateDirective`

#### Returns

`DateDirective`

#### Inherited from

`BaseFieldDirective.constructor`

## Properties

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:16](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L16)

#### Overrides

`BaseFieldDirective.editable`

***

### field

> **field**: `DateField`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:18](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L18)

#### Overrides

`BaseFieldDirective.field`

***

### format?

> `optional` **format?**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:10](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L10)

***

### locale?

> `optional` **locale?**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:14](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L14)

***

### timezone?

> `optional` **timezone?**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:12](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L12)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:23](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/date.directive.ts#L23)

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

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
