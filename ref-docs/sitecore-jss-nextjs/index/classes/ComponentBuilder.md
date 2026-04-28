[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / ComponentBuilder

# Class: ComponentBuilder

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L37)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Nextjs implementation of component builder class for building components based on the configuration.

## Constructors

### Constructor

> **new ComponentBuilder**(`config`): `ComponentBuilder`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`Component`\> |

#### Returns

`ComponentBuilder`

## Properties

### components

> `protected` **components**: `Map`\<`string`, `Component`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L41)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

List of components to be stored

***

### config

> `protected` **config**: [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`Component`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### DEFAULT\_EXPORT\_NAME

> `protected` **DEFAULT\_EXPORT\_NAME**: `string` = `'Default'`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:46](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L46)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:46](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L46)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

SXA uses custom default export name

## Methods

### getComponentFactory()

> **getComponentFactory**(`config?`): [`ComponentFactory`](../type-aliases/ComponentFactory.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:80](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L80)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:80](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L80)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Creates a new instance of component factory
Component can be imported dynamically or statically.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | `ComponentFactoryConfig` | Component factory configuration |

#### Returns

[`ComponentFactory`](../type-aliases/ComponentFactory.md)

Component factory implementation

***

### getModuleFactory()

> **getModuleFactory**(): [`ModuleFactory`](../type-aliases/ModuleFactory.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:58](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L58)
=======
Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:58](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L58)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Creates a new instance of module factory
Module factory provides a module (file) including all exports.
Module can be imported dynamically or statically.

#### Returns

[`ModuleFactory`](../type-aliases/ModuleFactory.md)

Module factory implementation
