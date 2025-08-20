[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ComponentDefinition

# Interface: ComponentDefinition

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:208](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L208)

## Properties

### allowedPlaceholders?

> `optional` **allowedPlaceholders**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:228](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L228)

Explicit names of Sitecore placeholders that this component is allowed
to be placed into. Normally this is automatically inferred based on
route data definitions (it will be allowed in any placeholders it is placed in
in disconnected definitions automatically), however at times explicit definition
is preferable, i.e. if not defining routes but only defining components.
NOTE: Setting an allowed placeholder name does not register it with the manifest; use `manifest.addPlaceholder()` to register it

***

### defaultWorkflow?

> `optional` **defaultWorkflow**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:274](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L274)

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

***

### displayFieldEditorButton?

> `optional` **displayFieldEditorButton**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:247](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L247)

Whether to show a button in Sitecore that allows editing all fields on the component at once.
Default: true

***

### displayName?

> `optional` **displayName**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:210](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L210)

***

### fieldEditorFields?

> `optional` **fieldEditorFields**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:252](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L252)

Explicitly specify the names of fields that the displayFieldEditorButton button will show.
If displayFieldEditorButton is false, has no effect.

***

### fields?

> `optional` **fields**: [`FieldDefinition`](FieldDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:214](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L214)

The data fields that provide content data to the component

***

### graphQLQuery?

> `optional` **graphQLQuery**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:280](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L280)

A GraphQL query that will be executed against the JSS app's configured Sitecore GraphQL endpoint
(in-process) to activate _Integrated GraphQL_. iGQL will replace the `fields` collection in the LS response
with the results of this GraphQL query, instead of the default datasource serialization.

***

### icon?

> `optional` **icon**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:238](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L238)

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

***

### inherits?

> `optional` **inherits**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:242](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L242)

Names of other templates or components to inherit from. Inheritance inherits fields, but not other component data.

***

### insertOptions?

> `optional` **insertOptions**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:282](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L282)

Template names to allow as insert options under this template

***

### name?

> `optional` **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:209](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L209)

***

### params?

> `optional` **params**: `string`[] \| [`FieldDefinition`](FieldDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:233](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L233)

Defines non-content parameters.
Parameters are more developer-focused options than fields, such as configurable CSS classes.

***

### placeholders?

> `optional` **placeholders**: `string`[] \| [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:219](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L219)

The names of JSS placeholders that this component exposes
(keys of any placeholder components added to this component's JS view)

***

### renderingId?

> `optional` **renderingId**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:258](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L258)

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### templateId?

> `optional` **templateId**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:264](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L264)

Optionally specify an ID used when importing the datasource template item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

***

### templateName?

> `optional` **templateName**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:269](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L269)

Optionally specify a name used when importing the datasource template item for this component.
For Sitecore developers only.
