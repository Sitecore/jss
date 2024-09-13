[@sitecore-jss/sitecore-jss-angular](../README.md) / TextDirective

# Class: TextDirective

## Hierarchy

- `BaseFieldDirective`

  ↳ **`TextDirective`**

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](TextDirective.md#constructor)

### Properties

- [defaultFieldEditingComponent](TextDirective.md#defaultfieldeditingcomponent)
- [editable](TextDirective.md#editable)
- [emptyFieldEditingTemplate](TextDirective.md#emptyfieldeditingtemplate)
- [encode](TextDirective.md#encode)
- [field](TextDirective.md#field)
- [templateRef](TextDirective.md#templateref)
- [viewContainer](TextDirective.md#viewcontainer)
- [viewRef](TextDirective.md#viewref)

### Methods

- [ngOnChanges](TextDirective.md#ngonchanges)
- [renderEmpty](TextDirective.md#renderempty)
- [shouldRender](TextDirective.md#shouldrender)
- [updateView](TextDirective.md#updateview)

## Constructors

### constructor

• **new TextDirective**(`viewContainer`, `templateRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |

#### Overrides

BaseFieldDirective.constructor

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:34](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L34)

## Properties

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:32](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L32)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:18](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L18)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:27](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L27)

___

### encode

• **encode**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:20](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L20)

___

### field

• **field**: [`TextField`](../interfaces/TextField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:22](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L22)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:34](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L34)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:22](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L22)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:10](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L10)

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

[packages/sitecore-jss-angular/src/components/text.directive.ts:39](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L39)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:35](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L35)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:28](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L28)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:50](https://github.com/Sitecore/jss/blob/d93e3b5a7/packages/sitecore-jss-angular/src/components/text.directive.ts#L50)
