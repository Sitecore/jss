[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PlaceholderDefinition

# Interface: PlaceholderDefinition

Explicitly defines a placeholder name, and allows setting the display name.
NOTE: placeholders defined on routes that are not explicitly defined are automatically added.
Explicit definition is only needed when you wish to specify a display name.

## Properties

### displayName?

> `optional` **displayName**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:168](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L168)

***

### id?

> `optional` **id**: `string`

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:174](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L174)

***

### name

> **name**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:167](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L167)
