[@sitecore-jss/sitecore-jss-angular](../README.md) / DateDirective

# Class: DateDirective

## Hierarchy

- `BaseFieldDirective`

  ↳ **`DateDirective`**

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](DateDirective.md#constructor)

### Properties

- [datePipe](DateDirective.md#datepipe)
- [defaultFieldEditingComponent](DateDirective.md#defaultfieldeditingcomponent)
- [editable](DateDirective.md#editable)
- [emptyFieldEditingTemplate](DateDirective.md#emptyfieldeditingtemplate)
- [field](DateDirective.md#field)
- [format](DateDirective.md#format)
- [locale](DateDirective.md#locale)
- [templateRef](DateDirective.md#templateref)
- [timezone](DateDirective.md#timezone)
- [viewContainer](DateDirective.md#viewcontainer)
- [viewRef](DateDirective.md#viewref)

### Methods

- [ngOnChanges](DateDirective.md#ngonchanges)
- [renderEmpty](DateDirective.md#renderempty)
- [shouldRender](DateDirective.md#shouldrender)
- [updateView](DateDirective.md#updateview)

## Constructors

### constructor

• **new DateDirective**(`viewContainer`, `templateRef`, `datePipe`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `datePipe` | `DatePipe` |

#### Overrides

BaseFieldDirective.constructor

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:39](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L39)

## Properties

### datePipe

• `Private` **datePipe**: `DatePipe`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:42](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L42)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:37](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L37)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:25](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L25)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:32](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L32)

___

### field

• **field**: `DateField`

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:27](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L27)

___

### format

• `Optional` **format**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:19](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L19)

___

### locale

• `Optional` **locale**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:23](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L23)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:41](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L41)

___

### timezone

• `Optional` **timezone**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:21](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L21)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

## Methods

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

[packages/sitecore-jss-angular/src/components/date.directive.ts:48](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L48)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

___

### shouldRender

▸ `Protected` **shouldRender**(): `boolean`

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

BaseFieldDirective.shouldRender

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:28](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L28)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:59](https://github.com/Sitecore/jss/blob/b9ecb63fb/packages/sitecore-jss-angular/src/components/date.directive.ts#L59)
