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

• **new GenericLinkDirective**(`viewContainer`, `templateRef`, `renderer`, `elementRef`, `router`)

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

[sitecore-jss-angular/src/components/generic-link.directive.ts:24](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L24)

## Properties

### attrs

• **attrs**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `string`

#### Overrides

[LinkDirective](LinkDirective.md).[attrs](LinkDirective.md#attrs)

#### Defined in

[sitecore-jss-angular/src/components/generic-link.directive.ts:18](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L18)

___

### editable

• **editable**: `boolean` = `true`

#### Overrides

[LinkDirective](LinkDirective.md).[editable](LinkDirective.md#editable)

#### Defined in

[sitecore-jss-angular/src/components/generic-link.directive.ts:16](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L16)

___

### extras

• `Optional` **extras**: `NavigationExtras`

#### Defined in

[sitecore-jss-angular/src/components/generic-link.directive.ts:22](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L22)

___

### field

• **field**: [`LinkField`](../interfaces/LinkField.md)

#### Overrides

[LinkDirective](LinkDirective.md).[field](LinkDirective.md#field)

#### Defined in

[sitecore-jss-angular/src/components/generic-link.directive.ts:20](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L20)

___

### renderer

• `Protected` **renderer**: `Renderer2`

#### Inherited from

[LinkDirective](LinkDirective.md).[renderer](LinkDirective.md#renderer)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:26](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/link.directive.ts#L26)

___

### router

• `Private` **router**: `Router`

#### Defined in

[sitecore-jss-angular/src/components/generic-link.directive.ts:29](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L29)

___

### templateRef

• `Protected` **templateRef**: `TemplateRef`<`unknown`\>

#### Inherited from

[LinkDirective](LinkDirective.md).[templateRef](LinkDirective.md#templateref)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:25](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/link.directive.ts#L25)

___

### viewContainer

• `Protected` **viewContainer**: `ViewContainerRef`

#### Inherited from

[LinkDirective](LinkDirective.md).[viewContainer](LinkDirective.md#viewcontainer)

#### Defined in

[sitecore-jss-angular/src/components/link.directive.ts:24](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/link.directive.ts#L24)

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

[sitecore-jss-angular/src/components/link.directive.ts:30](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/link.directive.ts#L30)

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

[sitecore-jss-angular/src/components/generic-link.directive.ts:34](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/generic-link.directive.ts#L34)

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

[sitecore-jss-angular/src/components/link.directive.ts:56](https://github.com/Sitecore/jss/blob/46e924ec9/packages/sitecore-jss-angular/src/components/link.directive.ts#L56)
