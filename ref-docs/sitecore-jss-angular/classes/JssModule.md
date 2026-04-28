[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssModule

# Class: JssModule

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:82](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/lib.module.ts#L82)
=======
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:82](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/lib.module.ts#L82)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Constructors

### Constructor

> **new JssModule**(): `JssModule`

#### Returns

`JssModule`

## Methods

### forChild()

> `static` **forChild**(`value`): `ModuleWithProviders`\<`JssModule`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:114](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/lib.module.ts#L114)
=======
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:114](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/lib.module.ts#L114)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Instantiates a module for a lazy-loaded JSS component(s)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `Type`\<`unknown`\> \| \{\[`key`: `string`\]: `Type`\<`unknown`\>; \} | component or map of components |

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module

***

### forRoot()

> `static` **forRoot**(): `ModuleWithProviders`\<`JssModule`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:88](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/lib.module.ts#L88)
=======
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:88](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/lib.module.ts#L88)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Instantiates the JSS module with no component factory.
Useful for using it from libraries. Most of the time you'd want withComponents()

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module

***

### withComponents()

> `static` **withComponents**(`components`, `lazyComponents?`): `ModuleWithProviders`\<`JssModule`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:133](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/lib.module.ts#L133)
=======
Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:133](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/lib.module.ts#L133)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Instantiates the JSS module and specifies the mapping from component name to component implementation.
Appropriate when defining the set of JSS components that your app is aware of.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `components` | [`ComponentNameAndType`](ComponentNameAndType.md)[] |  |
| `lazyComponents?` | [`ComponentNameAndModule`](../interfaces/ComponentNameAndModule.md)[] |  |

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module
