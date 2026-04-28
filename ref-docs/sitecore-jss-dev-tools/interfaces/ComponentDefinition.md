[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ComponentDefinition

# Interface: ComponentDefinition

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:208](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L208)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:208](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L208)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### allowedPlaceholders?

> `optional` **allowedPlaceholders?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:228](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L228)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:228](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L228)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Explicit names of Sitecore placeholders that this component is allowed
to be placed into. Normally this is automatically inferred based on
route data definitions (it will be allowed in any placeholders it is placed in
in disconnected definitions automatically), however at times explicit definition
is preferable, i.e. if not defining routes but only defining components.
NOTE: Setting an allowed placeholder name does not register it with the manifest; use `manifest.addPlaceholder()` to register it

***

### defaultWorkflow?

> `optional` **defaultWorkflow?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:274](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L274)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:274](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L274)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

***

### displayFieldEditorButton?

> `optional` **displayFieldEditorButton?**: `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:247](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L247)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:247](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L247)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Whether to show a button in Sitecore that allows editing all fields on the component at once.
Default: true

***

### displayName?

> `optional` **displayName?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:210](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L210)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:210](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L210)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### fieldEditorFields?

> `optional` **fieldEditorFields?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:252](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L252)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:252](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L252)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Explicitly specify the names of fields that the displayFieldEditorButton button will show.
If displayFieldEditorButton is false, has no effect.

***

### fields?

> `optional` **fields?**: [`FieldDefinition`](FieldDefinition.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:214](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L214)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:214](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L214)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The data fields that provide content data to the component

***

### graphQLQuery?

> `optional` **graphQLQuery?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:280](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L280)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:280](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L280)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A GraphQL query that will be executed against the JSS app's configured Sitecore GraphQL endpoint
(in-process) to activate _Integrated GraphQL_. iGQL will replace the `fields` collection in the LS response
with the results of this GraphQL query, instead of the default datasource serialization.

***

### icon?

> `optional` **icon?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:238](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L238)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:238](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L238)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

***

### inherits?

> `optional` **inherits?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:242](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L242)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:242](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L242)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Names of other templates or components to inherit from. Inheritance inherits fields, but not other component data.

***

### insertOptions?

> `optional` **insertOptions?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:282](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L282)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:282](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L282)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Template names to allow as insert options under this template

***

### name?

> `optional` **name?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:209](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L209)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:209](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L209)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### params?

> `optional` **params?**: `string`[] \| [`FieldDefinition`](FieldDefinition.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:233](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L233)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:233](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L233)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Defines non-content parameters.
Parameters are more developer-focused options than fields, such as configurable CSS classes.

***

### placeholders?

> `optional` **placeholders?**: `string`[] \| [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:219](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L219)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:219](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L219)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The names of JSS placeholders that this component exposes
(keys of any placeholder components added to this component's JS view)

***

### renderingId?

> `optional` **renderingId?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:258](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L258)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:258](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L258)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### templateId?

> `optional` **templateId?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:264](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L264)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:264](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L264)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally specify an ID used when importing the datasource template item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### templateName?

> `optional` **templateName?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:269](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L269)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:269](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L269)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally specify a name used when importing the datasource template item for this component.
For Sitecore developers only.
