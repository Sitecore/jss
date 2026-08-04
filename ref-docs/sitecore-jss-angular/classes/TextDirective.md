[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / TextDirective

# Class: TextDirective

Defined in: [packages/sitecore-jss-angular/src/components/text.directive.ts:8](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/text.directive.ts#L8)

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new TextDirective**(): `TextDirective`

#### Returns

`TextDirective`

#### Inherited from

`BaseFieldDirective.constructor`

## Properties

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/text.directive.ts:9](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/text.directive.ts#L9)

#### Overrides

`BaseFieldDirective.editable`

***

### encode

> **encode**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/text.directive.ts:11](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/text.directive.ts#L11)

***

### field

> **field**: [`TextField`](../interfaces/TextField.md)

Defined in: [packages/sitecore-jss-angular/src/components/text.directive.ts:13](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/text.directive.ts#L13)

#### Overrides

`BaseFieldDirective.field`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:11](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L11)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/text.directive.ts:17](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/text.directive.ts#L17)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
