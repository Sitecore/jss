[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssModule

# Class: JssModule

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:76](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/lib.module.ts#L76)

## Constructors

### Constructor

> **new JssModule**(): `JssModule`

#### Returns

`JssModule`

## Methods

### forChild()

> `static` **forChild**(`value`): `ModuleWithProviders`\<`JssModule`\>

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:108](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/lib.module.ts#L108)

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

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:82](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/lib.module.ts#L82)

Instantiates the JSS module with no component factory.
Useful for using it from libraries. Most of the time you'd want withComponents()

#### Returns

`ModuleWithProviders`\<`JssModule`\>

module

***

### withComponents()

> `static` **withComponents**(`components`, `lazyComponents?`): `ModuleWithProviders`\<`JssModule`\>

Defined in: [packages/sitecore-jss-angular/src/lib.module.ts:127](https://github.com/Sitecore/jss/blob/18d1835ceed2295614003c2a97b4bdf43ef246f7/packages/sitecore-jss-angular/src/lib.module.ts#L127)

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
