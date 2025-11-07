[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / TemplateDefinition

# Interface: TemplateDefinition

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:177](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L177)

## Properties

### defaultWorkflow?

> `optional` **defaultWorkflow**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:203](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L203)

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

***

### displayName?

> `optional` **displayName**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:179](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L179)

***

### fields

> **fields**: [`FieldDefinition`](FieldDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:183](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L183)

The data fields that provide content data to the component

***

### icon?

> `optional` **icon**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:188](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L188)

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

***

### id?

> `optional` **id**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:198](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L198)

Optionally specify an ID used when importing the template item.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### inherits?

> `optional` **inherits**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:192](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L192)

Names of other templates to inherit from. Inheritance inherits fields, but not other component data.

***

### insertOptions?

> `optional` **insertOptions**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:205](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L205)

Template names to allow as insert options under this template

***

### name

> **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:178](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L178)
