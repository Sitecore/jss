[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ManifestInstance

# Interface: ManifestInstance

## Table of contents

### Properties

- [appName](ManifestInstance.md#appname)
- [dictionary](ManifestInstance.md#dictionary)
- [items](ManifestInstance.md#items)
- [language](ManifestInstance.md#language)
- [media](ManifestInstance.md#media)
- [placeholders](ManifestInstance.md#placeholders)
- [rootPlaceholders](ManifestInstance.md#rootplaceholders)
- [templates](ManifestInstance.md#templates)
- [wipeExisting](ManifestInstance.md#wipeexisting)

## Properties

### appName

• **appName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:56](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L56)

___

### dictionary

• **dictionary**: [`DictionaryDefinition`](DictionaryDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:64](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L64)

___

### items

• **items**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nonRoutes` | [`ItemDefinition`](ItemDefinition.md)[] |
| `routes` | [`RouteDefinition`](RouteDefinition.md)[] |

#### Defined in

[manifest/generator/manifest.types.ts:58](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L58)

___

### language

• **language**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:65](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L65)

___

### media

• `Optional` **media**: `any`[]

#### Defined in

[manifest/generator/manifest.types.ts:63](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L63)

___

### placeholders

• **placeholders**: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:62](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L62)

___

### rootPlaceholders

• **rootPlaceholders**: `string`[]

#### Defined in

[manifest/generator/manifest.types.ts:67](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L67)

___

### templates

• **templates**: [`TemplateDefinition`](TemplateDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:57](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L57)

___

### wipeExisting

• **wipeExisting**: `boolean`

#### Defined in

[manifest/generator/manifest.types.ts:66](https://github.com/Sitecore/jss/blob/3d7cb1a8/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L66)
