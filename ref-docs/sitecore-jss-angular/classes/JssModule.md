[@sitecore-jss/sitecore-jss-angular](../README.md) / JssModule

# Class: JssModule

## Table of contents

### Constructors

- [constructor](JssModule.md#constructor)

### Methods

- [forChild](JssModule.md#forchild)
- [forRoot](JssModule.md#forroot)
- [withComponents](JssModule.md#withcomponents)

## Constructors

### constructor

• **new JssModule**()

## Methods

### forChild

▸ `Static` **forChild**(`value`): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates a module for a lazy-loaded JSS component(s)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Type`\<`unknown`\> \| \{ `[key: string]`: `Type`\<`unknown`\>;  } | component or map of components |

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:114](https://github.com/Sitecore/jss/blob/c27405f28/packages/sitecore-jss-angular/src/lib.module.ts#L114)

___

### forRoot

▸ `Static` **forRoot**(): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates the JSS module with no component factory.
Useful for using it from libraries. Most of the time you'd want withComponents()

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:88](https://github.com/Sitecore/jss/blob/c27405f28/packages/sitecore-jss-angular/src/lib.module.ts#L88)

___

### withComponents

▸ `Static` **withComponents**(`components`, `lazyComponents?`): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates the JSS module and specifies the mapping from component name to component implementation.
Appropriate when defining the set of JSS components that your app is aware of.

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | [`ComponentNameAndType`](ComponentNameAndType.md)[] |
| `lazyComponents?` | [`ComponentNameAndModule`](../interfaces/ComponentNameAndModule.md)[] |

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:133](https://github.com/Sitecore/jss/blob/c27405f28/packages/sitecore-jss-angular/src/lib.module.ts#L133)
