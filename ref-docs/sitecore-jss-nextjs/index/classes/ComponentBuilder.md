[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / ComponentBuilder

# Class: ComponentBuilder

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:37](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L37)

Nextjs implementation of component builder class for building components based on the configuration.

## Constructors

### Constructor

> **new ComponentBuilder**(`config`): `ComponentBuilder`

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`Component`\> |

#### Returns

`ComponentBuilder`

## Properties

### components

> `protected` **components**: `Map`\<`string`, `Component`\>

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:41](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L41)

List of components to be stored

***

### config

> `protected` **config**: [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`Component`\>

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)

***

### DEFAULT\_EXPORT\_NAME

> `protected` **DEFAULT\_EXPORT\_NAME**: `string` = `'Default'`

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:46](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L46)

SXA uses custom default export name

## Methods

### getComponentFactory()

> **getComponentFactory**(`config?`): [`ComponentFactory`](../type-aliases/ComponentFactory.md)

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:80](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L80)

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

Defined in: [sitecore-jss-nextjs/src/ComponentBuilder.ts:58](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L58)

Creates a new instance of module factory
Module factory provides a module (file) including all exports.
Module can be imported dynamically or statically.

#### Returns

[`ModuleFactory`](../type-aliases/ModuleFactory.md)

Module factory implementation
