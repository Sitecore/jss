[@sitecore-jss/sitecore-jss-react](../README.md) / ComponentBuilder

# Class: ComponentBuilder

React implementation of component builder class for building components based on the configuration.

## Table of contents

### Constructors

- [constructor](ComponentBuilder.md#constructor)

### Properties

- [components](ComponentBuilder.md#components)
- [config](ComponentBuilder.md#config)

### Methods

- [getComponentFactory](ComponentBuilder.md#getcomponentfactory)

## Constructors

### constructor

• **new ComponentBuilder**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ComponentBuilderConfig`](../README.md#componentbuilderconfig)<`ComponentType`<{}\>\> |

#### Defined in

[sitecore-jss-react/src/ComponentBuilder.ts:23](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/ComponentBuilder.ts#L23)

## Properties

### components

• `Protected` **components**: `Map`<`string`, `ComponentType`<{}\>\>

List of components to be stored

#### Defined in

[sitecore-jss-react/src/ComponentBuilder.ts:21](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/ComponentBuilder.ts#L21)

___

### config

• `Protected` **config**: [`ComponentBuilderConfig`](../README.md#componentbuilderconfig)<`ComponentType`<{}\>\>

#### Defined in

[sitecore-jss-react/src/ComponentBuilder.ts:23](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/ComponentBuilder.ts#L23)

## Methods

### getComponentFactory

▸ **getComponentFactory**(): [`ComponentFactory`](../README.md#componentfactory)

Creates a new instance of component factory

#### Returns

[`ComponentFactory`](../README.md#componentfactory)

Component factory implementation

#### Defined in

[sitecore-jss-react/src/ComponentBuilder.ts:31](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/ComponentBuilder.ts#L31)
