[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PlaceholderDefinition

# Interface: PlaceholderDefinition

Explicitly defines a placeholder name, and allows setting the display name.
NOTE: placeholders defined on routes that are not explicitly defined are automatically added.
Explicit definition is only needed when you wish to specify a display name.

## Table of contents

### Properties

- [displayName](PlaceholderDefinition.md#displayname)
- [id](PlaceholderDefinition.md#id)
- [name](PlaceholderDefinition.md#name)

## Properties

### displayName

• `Optional` **displayName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:168](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L168)

___

### id

• `Optional` **id**: `string`

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:174](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L174)

___

### name

• **name**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:167](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L167)
