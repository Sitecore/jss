[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / ComponentBuilder

# Class: ComponentBuilder

[index](../modules/index.md).ComponentBuilder

Nextjs implementation of component builder class for building components based on the configuration.

## Table of contents

### Constructors

- [constructor](index.ComponentBuilder.md#constructor)

### Properties

- [DEFAULT\_EXPORT\_NAME](index.ComponentBuilder.md#default_export_name)
- [components](index.ComponentBuilder.md#components)
- [config](index.ComponentBuilder.md#config)

### Methods

- [getComponentFactory](index.ComponentBuilder.md#getcomponentfactory)
- [getModuleFactory](index.ComponentBuilder.md#getmodulefactory)

## Constructors

### constructor

• **new ComponentBuilder**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ComponentBuilderConfig`](../modules/index.md#componentbuilderconfig)\<`Component`\> |

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)

## Properties

### DEFAULT\_EXPORT\_NAME

• `Protected` **DEFAULT\_EXPORT\_NAME**: `string` = `'Default'`

SXA uses custom default export name

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:46](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L46)

___

### components

• `Protected` **components**: `Map`\<`string`, `Component`\>

List of components to be stored

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:41](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L41)

___

### config

• `Protected` **config**: [`ComponentBuilderConfig`](../modules/index.md#componentbuilderconfig)\<`Component`\>

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:48](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L48)

## Methods

### getComponentFactory

▸ **getComponentFactory**(`config?`): [`ComponentFactory`](../modules/index.md#componentfactory)

Creates a new instance of component factory
Component can be imported dynamically or statically.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | `ComponentFactoryConfig` | Component factory configuration |

#### Returns

[`ComponentFactory`](../modules/index.md#componentfactory)

Component factory implementation

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:80](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L80)

___

### getModuleFactory

▸ **getModuleFactory**(): [`ModuleFactory`](../modules/index.md#modulefactory)

Creates a new instance of module factory
Module factory provides a module (file) including all exports.
Module can be imported dynamically or statically.

#### Returns

[`ModuleFactory`](../modules/index.md#modulefactory)

Module factory implementation

#### Defined in

[sitecore-jss-nextjs/src/ComponentBuilder.ts:58](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-nextjs/src/ComponentBuilder.ts#L58)
