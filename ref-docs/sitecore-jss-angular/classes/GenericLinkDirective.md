[@sitecore-jss/sitecore-jss-angular](../README.md) / GenericLinkDirective

# Class: GenericLinkDirective

## Hierarchy

- [`LinkDirective`](LinkDirective.md)

  ↳ **`GenericLinkDirective`**

## Table of contents

### Constructors

- [constructor](GenericLinkDirective.md#constructor)

### Properties

- [attrs](GenericLinkDirective.md#attrs)
- [editable](GenericLinkDirective.md#editable)
- [emptyFieldEditingTemplate](GenericLinkDirective.md#emptyfieldeditingtemplate)
- [extras](GenericLinkDirective.md#extras)
- [field](GenericLinkDirective.md#field)
- [renderer](GenericLinkDirective.md#renderer)
- [router](GenericLinkDirective.md#router)
- [templateRef](GenericLinkDirective.md#templateref)
- [viewContainer](GenericLinkDirective.md#viewcontainer)

### Methods

- [ngOnChanges](GenericLinkDirective.md#ngonchanges)
- [renderTemplate](GenericLinkDirective.md#rendertemplate)
- [updateAttribute](GenericLinkDirective.md#updateattribute)

## Constructors

### constructor

• **new GenericLinkDirective**()

#### Inherited from

[LinkDirective](LinkDirective.md).[constructor](LinkDirective.md#constructor)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:11](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L11)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:9](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L9)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Overrides

[LinkDirective](LinkDirective.md).[emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:20](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L20)

___

### extras

• `Optional` **extras**: `NavigationExtras`

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:15](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L15)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:13](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L13)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:29](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L29)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:24](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L24)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`\<`any`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:28](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L28)

___

### viewContainer

• **viewContainer**: `ViewContainerRef`

#### Overrides

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:23](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L23)

## Methods

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Inherited from

[LinkDirective](LinkDirective.md).[ngOnChanges](LinkDirective.md#ngonchanges)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:34](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L34)

___

### renderTemplate

▸ `Protected` **renderTemplate**(`props`, `linkText`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `linkText` | `string` |

#### Returns

`void`

#### Overrides

[LinkDirective](LinkDirective.md).[renderTemplate](LinkDirective.md#rendertemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/generic-link.directive.ts:26](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L26)

___

### updateAttribute

▸ `Protected` **updateAttribute**(`node`, `key`, `propValue?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `HTMLElement` |
| `key` | `string` |
| `propValue?` | `unknown` |

#### Returns

`void`

#### Inherited from

[LinkDirective](LinkDirective.md).[updateAttribute](LinkDirective.md#updateattribute)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:60](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L60)
