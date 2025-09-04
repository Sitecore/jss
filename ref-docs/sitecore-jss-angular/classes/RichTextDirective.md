[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / RichTextDirective

# Class: RichTextDirective

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:21](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L21)

## Extends

- `BaseFieldDirective`

## Implements

- `OnChanges`

## Constructors

### Constructor

> **new RichTextDirective**(`viewContainer`, `templateRef`, `renderer`, `router`): `RichTextDirective`

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:36](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L36)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`\<`unknown`\> |
| `renderer` | `Renderer2` |
| `router` | `Router` |

#### Returns

`RichTextDirective`

#### Overrides

`BaseFieldDirective.constructor`

## Properties

### defaultFieldEditingComponent

> `protected` **defaultFieldEditingComponent**: `Type`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:34](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L34)

Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided

#### Overrides

`BaseFieldDirective.defaultFieldEditingComponent`

***

### editable

> **editable**: `boolean` = `true`

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:22](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L22)

#### Overrides

`BaseFieldDirective.editable`

***

### emptyFieldEditingTemplate

> **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:29](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L29)

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

`BaseFieldDirective.emptyFieldEditingTemplate`

***

### field

> **field**: [`RichTextField`](../interfaces/RichTextField.md)

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:24](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L24)

#### Overrides

`BaseFieldDirective.field`

***

### viewContainer

> `protected` **viewContainer**: `ViewContainerRef`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:24](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L24)

#### Inherited from

`BaseFieldDirective.viewContainer`

***

### viewRef

> `protected` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:12](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L12)

#### Inherited from

`BaseFieldDirective.viewRef`

## Methods

### ngOnChanges()

> **ngOnChanges**(`changes`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/rich-text.directive.ts:46](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/rich-text.directive.ts#L46)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:37](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L37)

Renders the empty field markup which is required by Pages in editMode 'metadata' in case field is empty.

#### Returns

`void`

#### Inherited from

`BaseFieldDirective.renderEmpty`

***

### renderMetadata()

> `protected` **renderMetadata**(`kind`): `void`

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:53](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L53)

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

Defined in: [packages/sitecore-jss-angular/src/components/base-field.directive.ts:30](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-angular/src/components/base-field.directive.ts#L30)

Determines if directive should render the field as is
Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty

#### Returns

`boolean`

#### Inherited from

`BaseFieldDirective.shouldRender`
