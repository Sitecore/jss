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
- [renderMetadata](TextDirective.md#rendermetadata)
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

[packages/sitecore-jss-angular/src/components/text.directive.ts:35](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L35)

## Properties

### defaultFieldEditingComponent

• `Protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

BaseFieldDirective.defaultFieldEditingComponent

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:33](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L33)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

BaseFieldDirective.editable

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:19](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L19)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

BaseFieldDirective.emptyFieldEditingTemplate

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:28](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L28)

___

### encode

• **encode**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:21](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L21)

___

### field

• **field**: [`TextField`](../interfaces/TextField.md)

#### Overrides

BaseFieldDirective.field

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:23](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L23)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:35](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L35)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

BaseFieldDirective.viewContainer

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

___

### viewRef

• `Protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Inherited from

BaseFieldDirective.viewRef

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

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

[packages/sitecore-jss-angular/src/components/text.directive.ts:40](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L40)

___

### renderEmpty

▸ `Protected` **renderEmpty**(): `void`

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

BaseFieldDirective.renderEmpty

#### Defined in

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

[packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/text.directive.ts:48](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-angular/src/components/text.directive.ts#L48)
