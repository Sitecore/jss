[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / TemplateDefinition

# Interface: TemplateDefinition

## Table of contents

### Properties

- [defaultWorkflow](TemplateDefinition.md#defaultworkflow)
- [displayName](TemplateDefinition.md#displayname)
- [fields](TemplateDefinition.md#fields)
- [icon](TemplateDefinition.md#icon)
- [id](TemplateDefinition.md#id)
- [inherits](TemplateDefinition.md#inherits)
- [insertOptions](TemplateDefinition.md#insertoptions)
- [name](TemplateDefinition.md#name)

## Properties

### defaultWorkflow

• `Optional` **defaultWorkflow**: `string`

The path or GUID of a Sitecore workflow to assign to the component's data.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:203](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L203)

___

### displayName

• `Optional` **displayName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:179](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L179)

___

### fields

• **fields**: [`FieldDefinition`](FieldDefinition.md)[]

The data fields that provide content data to the component

#### Defined in

[manifest/generator/manifest.types.ts:183](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L183)

___

### icon

• `Optional` **icon**: `string`

The path to a Sitecore icon to use when the component is imported.
Example: 'People/16x16/alarmclock.png'

#### Defined in

[manifest/generator/manifest.types.ts:188](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L188)

___

### id

• `Optional` **id**: `string`

Optionally specify an ID used when importing the template item.
Can be either a GUID, or a string. ID values must be unique app-wide if specified.
For Sitecore developers only.

#### Defined in

[manifest/generator/manifest.types.ts:198](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L198)

___

### inherits

• `Optional` **inherits**: `string`[]

Names of other templates to inherit from. Inheritance inherits fields, but not other component data.

#### Defined in

[manifest/generator/manifest.types.ts:192](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L192)

___

### insertOptions

• `Optional` **insertOptions**: `string`[]

Template names to allow as insert options under this template

#### Defined in

[manifest/generator/manifest.types.ts:205](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L205)

___

### name

• **name**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:178](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L178)
