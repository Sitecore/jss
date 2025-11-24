[@sitecore-jss/sitecore-jss-angular](../README.md) / DateDirective

# Class: DateDirective

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](DateDirective.md#constructor)

### Properties

- [datePipe](DateDirective.md#datepipe)
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
- [updateView](DateDirective.md#updateview)

## Constructors

### constructor

• **new DateDirective**()

## Properties

### datePipe

• `Private` **datePipe**: `DatePipe`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:33](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L33)

___

### editable

• **editable**: `boolean` = `true`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:24](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L24)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:31](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L31)

___

### field

• **field**: `DateField`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:26](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L26)

___

### format

• `Optional` **format**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:18](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L18)

___

### locale

• `Optional` **locale**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:22](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L22)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:32](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L32)

___

### timezone

• `Optional` **timezone**: `string`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:20](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L20)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:35](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L35)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:34](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L34)

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

[packages/sitecore-jss-angular/src/components/date.directive.ts:37](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L37)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/date.directive.ts:48](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/date.directive.ts#L48)
