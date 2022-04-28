[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / FieldDefinition

# Interface: FieldDefinition

Represents a field on a JSS component or template

## Table of contents

### Properties

- [displayName](FieldDefinition.md#displayname)
- [id](FieldDefinition.md#id)
- [name](FieldDefinition.md#name)
- [required](FieldDefinition.md#required)
- [section](FieldDefinition.md#section)
- [sortOrder](FieldDefinition.md#sortorder)
- [source](FieldDefinition.md#source)
- [standardValue](FieldDefinition.md#standardvalue)
- [storage](FieldDefinition.md#storage)
- [type](FieldDefinition.md#type)
- [validationMessage](FieldDefinition.md#validationmessage)
- [validationPattern](FieldDefinition.md#validationpattern)

## Properties

### displayName

• `Optional` **displayName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:112](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L112)

___

### id

• `Optional` **id**: `string`

Optionally specify an ID used when importing. Can be either a GUID, or a string. ID values must be unique app-wide if specified.

#### Defined in

[manifest/generator/manifest.types.ts:116](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L116)

___

### name

• **name**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:107](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L107)

___

### required

• `Optional` **required**: `boolean`

Whether the field needs required validation in Sitecore. Note: required fields may still not have a value when previewing.
Default: false

#### Defined in

[manifest/generator/manifest.types.ts:133](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L133)

___

### section

• `Optional` **section**: `string`

Template section name used in Sitecore. Defaults to 'Data'

#### Defined in

[manifest/generator/manifest.types.ts:128](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L128)

___

### sortOrder

• `Optional` **sortOrder**: `number`

Specify a sort order for the field to be used when importing. Defaults to the order defined in the manifest.

#### Defined in

[manifest/generator/manifest.types.ts:120](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L120)

___

### source

• `Optional` **source**: `string`

Sets the field source in Sitecore.

#### Defined in

[manifest/generator/manifest.types.ts:146](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L146)

___

### standardValue

• `Optional` **standardValue**: `string`

The value this field will contain when a new item is created with this field on it in Sitecore. '$name' is the name of the item.

#### Defined in

[manifest/generator/manifest.types.ts:124](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L124)

___

### storage

• `Optional` **storage**: [`FieldStorage`](../enums/FieldStorage.md)

Sets how the field value is stored in Sitecore. For advanced Sitecore developers only.
Versioned (default) is almost always what you want. Do not change after importing unless using full wipe.
Content data loss could occur if altered after import.

#### Defined in

[manifest/generator/manifest.types.ts:152](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L152)

___

### type

• **type**: `string`

The data type of the field used when importing. Either a CommonFieldTypes enum value, or a string of a Sitecore field type name.

#### Defined in

[manifest/generator/manifest.types.ts:111](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L111)

___

### validationMessage

• `Optional` **validationMessage**: `string`

When used with validationPattern, the message shown when the field fails regex validation in Sitecore.

#### Defined in

[manifest/generator/manifest.types.ts:142](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L142)

___

### validationPattern

• `Optional` **validationPattern**: `string`

A regular expression (evaluated in .NET) to validate the field value in Sitecore.
Example: '^[A-Za-z ]+$'

#### Defined in

[manifest/generator/manifest.types.ts:138](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L138)
