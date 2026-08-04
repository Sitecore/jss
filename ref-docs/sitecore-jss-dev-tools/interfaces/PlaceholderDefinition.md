[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PlaceholderDefinition

# Interface: PlaceholderDefinition

Defined in: [manifest/generator/manifest.types.ts:166](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L166)

Explicitly defines a placeholder name, and allows setting the display name.
NOTE: placeholders defined on routes that are not explicitly defined are automatically added.
Explicit definition is only needed when you wish to specify a display name.

## Properties

### displayName?

> `optional` **displayName?**: `string`

Defined in: [manifest/generator/manifest.types.ts:168](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L168)

***

### id?

> `optional` **id?**: `string`

Defined in: [manifest/generator/manifest.types.ts:174](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L174)

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### name

> **name**: `string`

Defined in: [manifest/generator/manifest.types.ts:167](https://github.com/Sitecore/jss/blob/8c8c2fd3ea11ac4977b4c586a483fa5005d4096d/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L167)
