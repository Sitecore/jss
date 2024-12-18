[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PluginDefinition

# Interface: PluginDefinition

Definition to be used for plugin registration during bootstrap

## Properties

### distPath

> **distPath**: `string`

destination path to compile plugins to

#### Defined in

[sitecore-jss-dev-tools/src/templating/plugins.ts:28](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L28)

***

### moduleType

> **moduleType**: [`ModuleType`](../enumerations/ModuleType.md)

CJS or ESM - which type to compile plugins to

#### Defined in

[sitecore-jss-dev-tools/src/templating/plugins.ts:36](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L36)

***

### relative?

> `optional` **relative**: `boolean`

whether to use relative or absolute paths in the generated file. By default, absolute paths are used.

#### Defined in

[sitecore-jss-dev-tools/src/templating/plugins.ts:40](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L40)

***

### rootPath

> **rootPath**: `string`

source path for where the plugins are defined

#### Defined in

[sitecore-jss-dev-tools/src/templating/plugins.ts:32](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L32)

***

### silent?

> `optional` **silent**: `boolean`

whether to suppress console output

#### Defined in

[sitecore-jss-dev-tools/src/templating/plugins.ts:44](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L44)
