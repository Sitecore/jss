[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / FieldDefinition

# Interface: FieldDefinition

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:106](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L106)

Represents a field on a JSS component or template

## Properties

### displayName?

> `optional` **displayName**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:112](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L112)

***

### id?

> `optional` **id**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:116](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L116)

Optionally specify an ID used when importing. Can be either a GUID, or a string. ID values must be unique app-wide if specified.

***

### name

> **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:107](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L107)

***

### required?

> `optional` **required**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:133](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L133)

Whether the field needs required validation in Sitecore. Note: required fields may still not have a value when previewing.
Default: false

***

### section?

> `optional` **section**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:128](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L128)

Template section name used in Sitecore. Defaults to 'Data'

***

### sortOrder?

> `optional` **sortOrder**: `number`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:120](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L120)

Specify a sort order for the field to be used when importing. Defaults to the order defined in the manifest.

***

### source?

> `optional` **source**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:146](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L146)

Sets the field source in Sitecore.

***

### standardValue?

> `optional` **standardValue**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:124](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L124)

The value this field will contain when a new item is created with this field on it in Sitecore. '$name' is the name of the item.

***

### storage?

> `optional` **storage**: [`FieldStorage`](../enumerations/FieldStorage.md)

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:152](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L152)

Sets how the field value is stored in Sitecore. For advanced Sitecore developers only.
Versioned (default) is almost always what you want. Do not change after importing unless using full wipe.
Content data loss could occur if altered after import.

***

### type

> **type**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:111](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L111)

The data type of the field used when importing. Either a CommonFieldTypes enum value, or a string of a Sitecore field type name.

***

### validationMessage?

> `optional` **validationMessage**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:142](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L142)

When used with validationPattern, the message shown when the field fails regex validation in Sitecore.

***

### validationPattern?

> `optional` **validationPattern**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:138](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L138)

A regular expression (evaluated in .NET) to validate the field value in Sitecore.
Example: '^[A-Za-z ]+$'
