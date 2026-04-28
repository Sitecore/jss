[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / TemplateDefinition

# Interface: TemplateDefinition

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:177](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L177)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:177](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L177)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### defaultWorkflow?

> `optional` **defaultWorkflow?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:203](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L203)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:203](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L203)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

***

### displayName?

> `optional` **displayName?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:179](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L179)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:179](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L179)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### fields

> **fields**: [`FieldDefinition`](FieldDefinition.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:183](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L183)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:183](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L183)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The data fields that provide content data to the component

***

### icon?

> `optional` **icon?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:188](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L188)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:188](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L188)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

***

### id?

> `optional` **id?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:198](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L198)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:198](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L198)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally specify an ID used when importing the template item.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### inherits?

> `optional` **inherits?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:192](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L192)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:192](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L192)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Names of other templates to inherit from. Inheritance inherits fields, but not other component data.

***

### insertOptions?

> `optional` **insertOptions?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:205](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L205)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:205](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L205)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Template names to allow as insert options under this template

***

### name

> **name**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:178](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L178)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:178](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L178)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028
