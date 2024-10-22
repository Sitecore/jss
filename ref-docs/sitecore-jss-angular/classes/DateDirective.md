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
- [renderMetadata](DateDirective.md#rendermetadata)
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

[packages/sitecore-jss-angular/src/components/date.directive.ts:40](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L40)

## Properties

### datePipe

• `Private` **datePipe**: `DatePipe`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:43](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L43)

___

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:38](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L38)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:26](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L26)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:33](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L33)

___

### field

• **field**: `DateField`

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:28](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L28)

___

### format

• `Optional` **format**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:20](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L20)

___

### locale

• `Optional` **locale**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:24](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L24)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:42](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L42)

___

### timezone

• `Optional` **timezone**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:22](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L22)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/date.directive.ts:49](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L49)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

___

### renderMetadata

▸ `Protected` **renderMetadata**(`kind`): `void`

Renders a metadata chrome marker for the field. Required by Pages in editMode 'metadata'.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `MetadataKind` | 'open' or 'close' to indicate the start or end of the metadata chrome |

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderMetadata

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:56](https://github.com/Sitecore/jss/blob/a0d83f1b9/packages/sitecore-jss-angular/src/components/date.directive.ts#L56)
