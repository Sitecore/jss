[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssModule

# Class: JssModule

## Constructors

### new JssModule()

> **new JssModule**(): [`JssModule`](JssModule.md)

#### Returns

[`JssModule`](JssModule.md)

## Methods

### forChild()

> `static` **forChild**(`value`): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates a module for a lazy-loaded JSS component(s)

#### Parameters

• **value**: `Type`\<`unknown`\> \| `object`

component or map of components

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:114](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-angular/src/lib.module.ts#L114)

***

### forRoot()

> `static` **forRoot**(): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates the JSS module with no component factory.
Useful for using it from libraries. Most of the time you'd want withComponents()

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:88](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-angular/src/lib.module.ts#L88)

***

### withComponents()

> `static` **withComponents**(`components`, `lazyComponents`?): `ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

Instantiates the JSS module and specifies the mapping from component name to component implementation.
Appropriate when defining the set of JSS components that your app is aware of.

#### Parameters

• **components**: [`ComponentNameAndType`](ComponentNameAndType.md)[]

• **lazyComponents?**: [`ComponentNameAndModule`](../interfaces/ComponentNameAndModule.md)[]

#### Returns

`ModuleWithProviders`\<[`JssModule`](JssModule.md)\>

module

#### Defined in

[packages/sitecore-jss-angular/src/lib.module.ts:133](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-angular/src/lib.module.ts#L133)
