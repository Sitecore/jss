[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssModule

# Class: JssModule

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:79](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-angular/src/lib.module.ts#L79)

## Constructors

### Constructor

> **new JssModule**(): `JssModule`

#### Returns

`JssModule`

## Methods

### forChild()

> `static` **forChild**(`value`): `ModuleWithProviders`\<`JssModule`\>

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:111](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-angular/src/lib.module.ts#L111)

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

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:85](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-angular/src/lib.module.ts#L85)

Instantiates the JSS module with no component factory.
Useful for using it from libraries. Most of the time you'd want withComponents()

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module

***

### withComponents()

> `static` **withComponents**(`components`, `lazyComponents?`): `ModuleWithProviders`\<`JssModule`\>

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:130](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-angular/src/lib.module.ts#L130)

Instantiates the JSS module and specifies the mapping from component name to component implementation.
Appropriate when defining the set of JSS components that your app is aware of.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `components` | [`ComponentNameAndType`](ComponentNameAndType.md)[] | - |
| `lazyComponents?` | [`ComponentNameAndModule`](../interfaces/ComponentNameAndModule.md)[] | - |

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module
