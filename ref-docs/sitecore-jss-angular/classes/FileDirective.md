[@sitecore-jss/sitecore-jss-angular](../README.md) / FileDirective

# Class: FileDirective

File fields cannot be managed via the EE. We never output "editable."

## Implements

- `OnChanges`

## Table of contents

### Constructors

- [constructor](FileDirective.md#constructor)

### Properties

- [field](FileDirective.md#field)
- [templateRef](FileDirective.md#templateref)
- [viewContainer](FileDirective.md#viewcontainer)
- [viewRef](FileDirective.md#viewref)

### Methods

- [ngOnChanges](FileDirective.md#ngonchanges)
- [updateView](FileDirective.md#updateview)

## Constructors

### constructor

• **new FileDirective**()

## Properties

### field

• **field**: [`FileField`](../interfaces/FileField.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:18](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L18)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`\<`any`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:22](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L22)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`\<`unknown`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:20](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L20)

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

[packages/sitecore-jss-angular/src/components/file.directive.ts:24](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L24)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/file.directive.ts:35](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/file.directive.ts#L35)
