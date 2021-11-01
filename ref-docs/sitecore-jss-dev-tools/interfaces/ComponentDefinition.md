[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ComponentDefinition

# Interface: ComponentDefinition

## Table of contents

### Properties

- [allowedPlaceholders](ComponentDefinition.md#allowedplaceholders)
- [defaultWorkflow](ComponentDefinition.md#defaultworkflow)
- [displayFieldEditorButton](ComponentDefinition.md#displayfieldeditorbutton)
- [displayName](ComponentDefinition.md#displayname)
- [fieldEditorFields](ComponentDefinition.md#fieldeditorfields)
- [fields](ComponentDefinition.md#fields)
- [graphQLQuery](ComponentDefinition.md#graphqlquery)
- [icon](ComponentDefinition.md#icon)
- [inherits](ComponentDefinition.md#inherits)
- [insertOptions](ComponentDefinition.md#insertoptions)
- [name](ComponentDefinition.md#name)
- [params](ComponentDefinition.md#params)
- [placeholders](ComponentDefinition.md#placeholders)
- [renderingId](ComponentDefinition.md#renderingid)
- [templateId](ComponentDefinition.md#templateid)
- [templateName](ComponentDefinition.md#templatename)

## Properties

### allowedPlaceholders

• `Optional` **allowedPlaceholders**: `string`[]

Explicit names of Sitecore placeholders that this component is allowed
to be placed into. Normally this is automatically inferred based on
route data definitions (it will be allowed in any placeholders it is placed in
in disconnected definitions automatically), however at times explicit definition
is preferable, i.e. if not defining routes but only defining components.
NOTE: Setting an allowed placeholder name does not register it with the manifest; use `manifest.addPlaceholder()` to register it

#### Defined in

[manifest/generator/manifest.types.ts:228](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L228)

___

### defaultWorkflow

• `Optional` **defaultWorkflow**: `string`

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:274](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L274)

___

### displayFieldEditorButton

• `Optional` **displayFieldEditorButton**: `boolean`

Whether to show a button in Sitecore that allows editing all fields on the component at once.
Default: true

#### Defined in

[manifest/generator/manifest.types.ts:247](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L247)

___

### displayName

• `Optional` **displayName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:210](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L210)

___

### fieldEditorFields

• `Optional` **fieldEditorFields**: `string`[]

Explicitly specify the names of fields that the displayFieldEditorButton button will show.
If displayFieldEditorButton is false, has no effect.

#### Defined in

[manifest/generator/manifest.types.ts:252](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L252)

___

### fields

• `Optional` **fields**: [`FieldDefinition`](FieldDefinition.md)[]

The data fields that provide content data to the component

#### Defined in

[manifest/generator/manifest.types.ts:214](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L214)

___

### graphQLQuery

• `Optional` **graphQLQuery**: `string`

A GraphQL query that will be executed against the JSS app's configured Sitecore GraphQL endpoint
(in-process) to activate _Integrated GraphQL_. iGQL will replace the `fields` collection in the LS response
with the results of this GraphQL query, instead of the default datasource serialization.

#### Defined in

[manifest/generator/manifest.types.ts:280](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L280)

___

### icon

• `Optional` **icon**: `string`

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

#### Defined in

[manifest/generator/manifest.types.ts:238](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L238)

___

### inherits

• `Optional` **inherits**: `string`[]

Names of other templates or components to inherit from. Inheritance inherits fields, but not other component data.

#### Defined in

[manifest/generator/manifest.types.ts:242](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L242)

___

### insertOptions

• `Optional` **insertOptions**: `string`[]

Template names to allow as insert options under this template

#### Defined in

[manifest/generator/manifest.types.ts:282](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L282)

___

### name

• `Optional` **name**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:209](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L209)

___

### params

• `Optional` **params**: `string`[] \| [`FieldDefinition`](FieldDefinition.md)[]

Defines non-content parameters.
Parameters are more developer-focused options than fields, such as configurable CSS classes.

#### Defined in

[manifest/generator/manifest.types.ts:233](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L233)

___

### placeholders

• `Optional` **placeholders**: `string`[] \| [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

The names of JSS placeholders that this component exposes
(keys of any placeholder components added to this component's JS view)

#### Defined in

[manifest/generator/manifest.types.ts:219](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L219)

___

### renderingId

• `Optional` **renderingId**: `string`

Optionally specify an ID used when importing the rendering item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:258](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L258)

___

### templateId

• `Optional` **templateId**: `string`

Optionally specify an ID used when importing the datasource template item for this component.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:264](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L264)

___

### templateName

• `Optional` **templateName**: `string`

Optionally specify a name used when importing the datasource template item for this component.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:269](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L269)
