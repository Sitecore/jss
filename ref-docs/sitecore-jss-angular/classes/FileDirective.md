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

• **new FileDirective**(`viewContainer`, `templateRef`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

## Properties

### field

• **field**: [`FileField`](../interfaces/FileField.md)

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:17](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L17)

___

### templateRef

• `Private` **templateRef**: `TemplateRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

___

### viewContainer

• `Private` **viewContainer**: `ViewContainerRef`

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:21](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L21)

___

### viewRef

• `Private` **viewRef**: `EmbeddedViewRef`<`unknown`\>

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:19](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L19)

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

[sitecore-jss-angular/src/components/file.directive.ts:23](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L23)

___

### updateView

▸ `Private` **updateView**(): `void`

#### Returns

`void`

#### Defined in

[sitecore-jss-angular/src/components/file.directive.ts:34](https://github.com/Sitecore/jss/blob/240fbaafc/packages/sitecore-jss-angular/src/components/file.directive.ts#L34)
