[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / generatePlugins

# Function: generatePlugins()

> **generatePlugins**(`definition`): `void`

Defined in: [templating/plugins.ts:90](https://github.com/Sitecore/jss/blob/217ee09e2bb877a0daa2bea2caf7b49d38f600a5/packages/sitecore-jss-dev-tools/src/templating/plugins.ts#L90)

Generates the plugins file and saves it to the filesystem.
By convention, we expect to find plugins under {pluginName}/plugins/** (subfolders are searched recursively).
generated file will be saved to

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `definition` | [`PluginDefinition`](../interfaces/PluginDefinition.md) | plugin definition |

## Returns

`void`

## Var

and will contain a list of plugins in the following format:
CJS: exports.fooPlugin = require('{pluginPath}');
ESM: export { fooPlugin } from '{pluginPath}';

## Example

```ts
generatePlugins({ distPath: 'src/temp/foo-plugins.js', rootPath: 'src/foo/plugins', moduleType: ModuleType.CJS })
```
