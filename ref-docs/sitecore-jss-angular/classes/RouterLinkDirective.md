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

• **new RouterLinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`, `router`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewContainer` | `ViewContainerRef` |
| `templateRef` | `TemplateRef`<`unknown`\> |
| `renderer` | `Renderer2` |
| `elementRef` | `ElementRef`<`any`\> |
| `router` | `Router` |

#### Overrides

[LinkDirective](LinkDirective.md).[constructor](LinkDirective.md#constructor)

#### Defined in

[sitecore-jss-angular/src/components/router-link.directive.ts:21](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L21)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [attr: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[sitecore-jss-angular/src/components/router-link.directive.ts:17](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L17)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[sitecore-jss-angular/src/components/router-link.directive.ts:15](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L15)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[sitecore-jss-angular/src/components/router-link.directive.ts:19](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L19)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:26](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/link.directive.ts#L26)

___

### router

• `Private` **router**: `Router`

#### Defined in

[sitecore-jss-angular/src/components/router-link.directive.ts:26](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L26)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:25](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/link.directive.ts#L25)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:24](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/link.directive.ts#L24)

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

[sitecore-jss-angular/src/components/link.directive.ts:30](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/link.directive.ts#L30)

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

[sitecore-jss-angular/src/components/router-link.directive.ts:31](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/router-link.directive.ts#L31)

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

[sitecore-jss-angular/src/components/link.directive.ts:56](https://github.com/Sitecore/jss/blob/aebc39389/packages/sitecore-jss-angular/src/components/link.directive.ts#L56)
