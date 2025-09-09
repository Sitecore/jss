[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / ComponentBuilder

# Class: ComponentBuilder

Defined in: [packages/sitecore-jss-react/src/ComponentBuilder.ts:17](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react/src/ComponentBuilder.ts#L17)

React implementation of component builder class for building components based on the configuration.

## Constructors

### Constructor

> **new ComponentBuilder**(`config`): `ComponentBuilder`

Defined in: [packages/sitecore-jss-react/src/ComponentBuilder.ts:23](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react/src/ComponentBuilder.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`ComponentType`\> |

#### Returns

`ComponentBuilder`

## Properties

### components

> `protected` **components**: `Map`\<`string`, `ComponentType`\>

Defined in: [packages/sitecore-jss-react/src/ComponentBuilder.ts:21](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react/src/ComponentBuilder.ts#L21)

List of components to be stored

***

### config

> `protected` **config**: [`ComponentBuilderConfig`](../type-aliases/ComponentBuilderConfig.md)\<`ComponentType`\>

Defined in: [packages/sitecore-jss-react/src/ComponentBuilder.ts:23](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react/src/ComponentBuilder.ts#L23)

## Methods

### getComponentFactory()

> **getComponentFactory**(): [`ComponentFactory`](../type-aliases/ComponentFactory.md)

Defined in: [packages/sitecore-jss-react/src/ComponentBuilder.ts:31](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-react/src/ComponentBuilder.ts#L31)

Creates a new instance of component factory

#### Returns

[`ComponentFactory`](../type-aliases/ComponentFactory.md)

Component factory implementation
