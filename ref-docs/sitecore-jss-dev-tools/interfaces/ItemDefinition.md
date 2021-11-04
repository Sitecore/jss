[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ItemDefinition

# Interface: ItemDefinition

## Hierarchy

- **`ItemDefinition`**

  ↳ [`RouteDefinition`](RouteDefinition.md)

  ↳ [`ComponentInstanceDefinition`](ComponentInstanceDefinition.md)

## Table of contents

### Properties

- [children](ItemDefinition.md#children)
- [displayName](ItemDefinition.md#displayname)
- [fields](ItemDefinition.md#fields)
- [id](ItemDefinition.md#id)
- [insertOptions](ItemDefinition.md#insertoptions)
- [layout](ItemDefinition.md#layout)
- [name](ItemDefinition.md#name)
- [path](ItemDefinition.md#path)
- [template](ItemDefinition.md#template)

## Properties

### children

• `Optional` **children**: ([`ItemDefinition`](ItemDefinition.md) \| [`ItemReference`](ItemReference.md))[]

#### Defined in

[manifest/generator/manifest.types.ts:354](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L354)

___

### displayName

• `Optional` **displayName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:351](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L351)

___

### fields

• `Optional` **fields**: `Object`

#### Index signature

▪ [key: `string`]: [`ContentFieldValue`](ContentFieldValue.md)

#### Defined in

[manifest/generator/manifest.types.ts:353](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L353)

___

### id

• `Optional` **id**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:352](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L352)

___

### insertOptions

• `Optional` **insertOptions**: `string`[]

#### Defined in

[manifest/generator/manifest.types.ts:359](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L359)

___

### layout

• `Optional` **layout**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `renderings` | `Object` |

#### Defined in

[manifest/generator/manifest.types.ts:355](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L355)

___

### name

• **name**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:349](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L349)

___

### path

• `Optional` **path**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:358](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L358)

___

### template

• **template**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:350](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L350)
