[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / RichTextDirective

# Class: RichTextDirective

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:18](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L18)

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new RichTextDirective**(): `RichTextDirective`

#### Returns

`RichTextDirective`

#### Inherited from

`BaseFieldDirective.constructor`

## Properties

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:19](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L19)

#### Overrides

`BaseFieldDirective.editable`

***

### field

> **field**: [`RichTextField`](../interfaces/RichTextField.md)

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:21](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L21)

#### Overrides

`BaseFieldDirective.field`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:27](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L27)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/75441f02edb56a08f3874c8d79ee4a154b198232/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
