[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PluginDefinition

# Interface: PluginDefinition

Definition to be used for plugin registration during bootstrap

## Table of contents

### Properties

- [distPath](PluginDefinition.md#distpath)
- [moduleType](PluginDefinition.md#moduletype)
- [relative](PluginDefinition.md#relative)
- [rootPath](PluginDefinition.md#rootpath)
- [silent](PluginDefinition.md#silent)

## Properties

### distPath

• **distPath**: `string`

destination path to compile plugins to

#### Defined in

[templating/plugins.ts:28](https://github.com/Sitecore/jss/blob/c2a083733/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L28)

___

### moduleType

• **moduleType**: [`ModuleType`](../enums/ModuleType.md)

CJS or ESM - which type to compile plugins to

#### Defined in

[templating/plugins.ts:36](https://github.com/Sitecore/jss/blob/c2a083733/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L36)

___

### relative

• `Optional` **relative**: `boolean`

whether to use relative or absolute paths in the generated file. By default, absolute paths are used.

#### Defined in

[templating/plugins.ts:40](https://github.com/Sitecore/jss/blob/c2a083733/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L40)

___

### rootPath

• **rootPath**: `string`

source path for where the plugins are defined

#### Defined in

[templating/plugins.ts:32](https://github.com/Sitecore/jss/blob/c2a083733/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L32)

___

### silent

• `Optional` **silent**: `boolean`

whether to suppress console output

#### Defined in

[templating/plugins.ts:44](https://github.com/Sitecore/jss/blob/c2a083733/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L44)
