[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / TemplateDefinition

# Interface: TemplateDefinition

## Properties

### defaultWorkflow?

> `optional` **defaultWorkflow**: `string`

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:203](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L203)

***

### displayName?

> `optional` **displayName**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:179](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L179)

***

### fields

> **fields**: [`FieldDefinition`](FieldDefinition.md)[]

The data fields that provide content data to the component

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:183](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L183)

***

### icon?

> `optional` **icon**: `string`

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:188](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L188)

***

### id?

> `optional` **id**: `string`

Optionally specify an ID used when importing the template item.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:198](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L198)

***

### inherits?

> `optional` **inherits**: `string`[]

Names of other templates to inherit from. Inheritance inherits fields, but not other component data.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:192](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L192)

***

### insertOptions?

> `optional` **insertOptions**: `string`[]

Template names to allow as insert options under this template

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:205](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L205)

***

### name

> **name**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:178](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L178)
