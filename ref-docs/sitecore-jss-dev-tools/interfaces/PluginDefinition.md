[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PluginDefinition

# Interface: PluginDefinition

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:24](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L24)

Definition to be used for plugin registration during bootstrap

## Properties

### distPath

> **distPath**: `string`

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:28](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L28)

destination path to compile plugins to

***

### moduleType

> **moduleType**: [`ModuleType`](../enumerations/ModuleType.md)

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:36](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L36)

CJS or ESM - which type to compile plugins to

***

### relative?

> `optional` **relative**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:40](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L40)

whether to use relative or absolute paths in the generated file. By default, absolute paths are used.

***

### rootPath

> **rootPath**: `string`

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:32](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L32)

source path for where the plugins are defined

***

### silent?

> `optional` **silent**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/templating/plugins.ts:44](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L44)

whether to suppress console output
