[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ComponentInstanceDefinition

# Interface: ComponentInstanceDefinition

## Hierarchy

- [`ItemDefinition`](ItemDefinition.md)

  ↳ **`ComponentInstanceDefinition`**

## Table of contents

### Properties

- [children](ComponentInstanceDefinition.md#children)
- [componentName](ComponentInstanceDefinition.md#componentname)
- [displayName](ComponentInstanceDefinition.md#displayname)
- [fields](ComponentInstanceDefinition.md#fields)
- [id](ComponentInstanceDefinition.md#id)
- [insertOptions](ComponentInstanceDefinition.md#insertoptions)
- [layout](ComponentInstanceDefinition.md#layout)
- [name](ComponentInstanceDefinition.md#name)
- [path](ComponentInstanceDefinition.md#path)
- [placeholders](ComponentInstanceDefinition.md#placeholders)
- [template](ComponentInstanceDefinition.md#template)

## Properties

### children

• `Optional` **children**: ([`ItemDefinition`](ItemDefinition.md) \| [`ItemReference`](ItemReference.md))[]

#### Inherited from

[ItemDefinition](ItemDefinition.md).[children](ItemDefinition.md#children)

#### Defined in

[manifest/generator/manifest.types.ts:354](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L354)

___

### componentName

• **componentName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:378](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L378)

___

### displayName

• `Optional` **displayName**: `string`

#### Inherited from

[ItemDefinition](ItemDefinition.md).[displayName](ItemDefinition.md#displayname)

#### Defined in

[manifest/generator/manifest.types.ts:351](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L351)

___

### fields

• `Optional` **fields**: `Object`

#### Index signature

▪ [key: `string`]: [`ContentFieldValue`](ContentFieldValue.md)

#### Inherited from

[ItemDefinition](ItemDefinition.md).[fields](ItemDefinition.md#fields)

#### Defined in

[manifest/generator/manifest.types.ts:353](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L353)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[ItemDefinition](ItemDefinition.md).[id](ItemDefinition.md#id)

#### Defined in

[manifest/generator/manifest.types.ts:352](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L352)

___

### insertOptions

• `Optional` **insertOptions**: `string`[]

#### Inherited from

[ItemDefinition](ItemDefinition.md).[insertOptions](ItemDefinition.md#insertoptions)

#### Defined in

[manifest/generator/manifest.types.ts:359](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L359)

___

### layout

• `Optional` **layout**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `renderings` | `Object` |

#### Inherited from

[ItemDefinition](ItemDefinition.md).[layout](ItemDefinition.md#layout)

#### Defined in

[manifest/generator/manifest.types.ts:355](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L355)

___

### name

• **name**: `string`

#### Inherited from

[ItemDefinition](ItemDefinition.md).[name](ItemDefinition.md#name)

#### Defined in

[manifest/generator/manifest.types.ts:349](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L349)

___

### path

• `Optional` **path**: `string`

#### Inherited from

[ItemDefinition](ItemDefinition.md).[path](ItemDefinition.md#path)

#### Defined in

[manifest/generator/manifest.types.ts:358](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L358)

___

### placeholders

• `Optional` **placeholders**: `Object`

#### Index signature

▪ [key: `string`]: [`ComponentInstanceDefinition`](ComponentInstanceDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:379](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L379)

___

### template

• **template**: `string`

#### Inherited from

[ItemDefinition](ItemDefinition.md).[template](ItemDefinition.md#template)

#### Defined in

[manifest/generator/manifest.types.ts:350](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L350)
