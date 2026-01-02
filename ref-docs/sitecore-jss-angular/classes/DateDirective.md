[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / DateDirective

# Class: DateDirective

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:19](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L19)

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

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\> = `DefaultEmptyFieldEditingComponent`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:38](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L38)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:26](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L26)

#### Overrides

`BaseFieldDirective.editable`

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:33](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L33)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

***

### field

> **field**: `DateField`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:28](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L28)

#### Overrides

`BaseFieldDirective.field`

***

### format?

> `optional` **format**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:20](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L20)

***

### locale?

> `optional` **locale**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:24](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L24)

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:22](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L22)

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:19](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L19)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:20](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L20)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/date.directive.ts:42](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/date.directive.ts#L42)

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

### renderEmpty()

> `protected` **renderEmpty**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:43](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L43)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:59](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L59)

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderMetadata`

***

### shouldRender()

> `protected` **shouldRender**(): `boolean`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:36](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L36)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
