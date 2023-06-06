[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PluginDefinition

# Interface: PluginDefinition

Definition to be used for plugin registration during bootstrap

## Table of contents

### Properties

- [distPath](PluginDefinition.md#distpath)
- [moduleType](PluginDefinition.md#moduletype)
- [relative](PluginDefinition.md#relative)
- [rootPath](PluginDefinition.md#rootpath)

## Properties

### distPath

• **distPath**: `string`

destination path to compile plugins to

#### Defined in

[templating/plugins.ts:28](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L28)

___

### moduleType

• **moduleType**: [`ModuleType`](../enums/ModuleType.md)

CJS or ESM - which type to compile plugins to

#### Defined in

[templating/plugins.ts:36](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L36)

___

### relative

• `Optional` **relative**: `boolean`

whether to use relative or absolute paths in the generated file. By default, relative paths are used.

#### Defined in

[templating/plugins.ts:40](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L40)

___

### rootPath

• **rootPath**: `string`

source path for where the plugins are defined

#### Defined in

[templating/plugins.ts:32](https://github.com/Sitecore/jss/blob/5fd343a40/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L32)
