[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / FieldDefinition

# Interface: FieldDefinition

Represents a field on a JSS component or template

## Properties

### displayName?

> `optional` **displayName**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:112](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L112)

***

### id?

> `optional` **id**: `string`

Optionally specify an ID used when importing. Can be either a GUID, or a string. ID values must be unique app-wide if specified.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:116](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L116)

***

### name

> **name**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:107](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L107)

***

### required?

> `optional` **required**: `boolean`

Whether the field needs required validation in Sitecore. Note: required fields may still not have a value when previewing.
Default: false

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:133](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L133)

***

### section?

> `optional` **section**: `string`

Template section name used in Sitecore. Defaults to 'Data'

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:128](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L128)

***

### sortOrder?

> `optional` **sortOrder**: `number`

Specify a sort order for the field to be used when importing. Defaults to the order defined in the manifest.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:120](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L120)

***

### source?

> `optional` **source**: `string`

Sets the field source in Sitecore.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:146](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L146)

***

### standardValue?

> `optional` **standardValue**: `string`

The value this field will contain when a new item is created with this field on it in Sitecore. '$name' is the name of the item.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:124](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L124)

***

### storage?

> `optional` **storage**: [`FieldStorage`](../enumerations/FieldStorage.md)

Sets how the field value is stored in Sitecore. For advanced Sitecore developers only.
Versioned (default) is almost always what you want. Do not change after importing unless using full wipe.
Content data loss could occur if altered after import.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:152](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L152)

***

### type

> **type**: `string`

The data type of the field used when importing. Either a CommonFieldTypes enum value, or a string of a Sitecore field type name.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:111](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L111)

***

### validationMessage?

> `optional` **validationMessage**: `string`

When used with validationPattern, the message shown when the field fails regex validation in Sitecore.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:142](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L142)

***

### validationPattern?

> `optional` **validationPattern**: `string`

A regular expression (evaluated in .NET) to validate the field value in Sitecore.
Example: '^[A-Za-z ]+$'

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:138](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L138)
