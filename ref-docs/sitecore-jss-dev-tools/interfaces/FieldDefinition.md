[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / FieldDefinition

# Interface: FieldDefinition

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:106](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L106)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:106](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L106)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Represents a field on a JSS component or template

## Properties

### displayName?

> `optional` **displayName?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:112](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L112)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:112](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L112)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### id?

> `optional` **id?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:116](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L116)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:116](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L116)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally specify an ID used when importing. Can be either a GUID, or a string. ID values must be unique app-wide if specified.

***

### name

> **name**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:107](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L107)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:107](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L107)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### required?

> `optional` **required?**: `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:133](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L133)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:133](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L133)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Whether the field needs required validation in Sitecore. Note: required fields may still not have a value when previewing.
Default: false

***

### section?

> `optional` **section?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:128](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L128)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:128](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L128)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Template section name used in Sitecore. Defaults to 'Data'

***

### sortOrder?

> `optional` **sortOrder?**: `number`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:120](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L120)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:120](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L120)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Specify a sort order for the field to be used when importing. Defaults to the order defined in the manifest.

***

### source?

> `optional` **source?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:146](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L146)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:146](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L146)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Sets the field source in Sitecore.

***

### standardValue?

> `optional` **standardValue?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:124](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L124)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:124](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L124)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The value this field will contain when a new item is created with this field on it in Sitecore. '$name' is the name of the item.

***

### storage?

> `optional` **storage?**: [`FieldStorage`](../enumerations/FieldStorage.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:152](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L152)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:152](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L152)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Sets how the field value is stored in Sitecore. For advanced Sitecore developers only.
Versioned (default) is almost always what you want. Do not change after importing unless using full wipe.
Content data loss could occur if altered after import.

***

### type

> **type**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:111](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L111)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:111](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L111)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The data type of the field used when importing. Either a CommonFieldTypes enum value, or a string of a Sitecore field type name.

***

### validationMessage?

> `optional` **validationMessage?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:142](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L142)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:142](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L142)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

When used with validationPattern, the message shown when the field fails regex validation in Sitecore.

***

### validationPattern?

> `optional` **validationPattern?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:138](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L138)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:138](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L138)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A regular expression (evaluated in .NET) to validate the field value in Sitecore.
Example: '^[A-Za-z ]+$'
