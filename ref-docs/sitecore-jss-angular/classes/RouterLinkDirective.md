[@sitecore-jss/sitecore-jss-angular](../README.md) / RouterLinkDirective

# Class: RouterLinkDirective

## Hierarchy

- [`LinkDirective`](LinkDirective.md)

  ↳ **`RouterLinkDirective`**

## Table of contents

### Constructors

- [constructor](RouterLinkDirective.md#constructor)

### Properties

- [attrs](RouterLinkDirective.md#attrs)
- [editable](RouterLinkDirective.md#editable)
- [emptyFieldEditingTemplate](RouterLinkDirective.md#emptyfieldeditingtemplate)
- [field](RouterLinkDirective.md#field)
- [renderer](RouterLinkDirective.md#renderer)
- [router](RouterLinkDirective.md#router)
- [templateRef](RouterLinkDirective.md#templateref)
- [viewContainer](RouterLinkDirective.md#viewcontainer)

### Methods

- [ngOnChanges](RouterLinkDirective.md#ngonchanges)
- [renderTemplate](RouterLinkDirective.md#rendertemplate)
- [updateAttribute](RouterLinkDirective.md#updateattribute)

## Constructors

### constructor

• **new RouterLinkDirective**()

#### Inherited from

[LinkDirective](LinkDirective.md).[constructor](LinkDirective.md#constructor)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:10](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L10)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:8](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L8)

___

### emptyFieldEditingTemplate

• **emptyFieldEditingTemplate**: `TemplateRef`\<`unknown`\>

Custom template to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

[LinkDirective](LinkDirective.md).[emptyFieldEditingTemplate](LinkDirective.md#emptyfieldeditingtemplate)

#### Defined in

[packages/sitecore-jss-angular/src/components/link.directive.ts:25](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/link.directive.ts#L25)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:12](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L12)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Overrides

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:16](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L16)

___

### router

• `Private` **router**: `Router`

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:17](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L17)

___

### templateRef

• **templateRef**: `TemplateRef`\<`any`\>

#### Overrides

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:15](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L15)

___

### viewContainer

• **viewContainer**: `ViewContainerRef`

#### Overrides

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:14](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L14)

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

[packages/sitecore-jss-angular/src/components/router-link.directive.ts:19](https://github.com/Sitecore/jss/blob/0eb01d0886/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L19)

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
