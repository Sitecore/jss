[@sitecore-jss/sitecore-jss](../README.md) / editing

# Module: editing

## Table of contents

### References

- [ChromeCommand](editing.md#chromecommand)
- [DefaultEditFrameButton](editing.md#defaulteditframebutton)
- [DefaultEditFrameButtonIds](editing.md#defaulteditframebuttonids)
- [DefaultEditFrameButtons](editing.md#defaulteditframebuttons)
- [EditButtonTypes](editing.md#editbuttontypes)
- [EditFrameDataSource](editing.md#editframedatasource)
- [ExperienceEditor](editing.md#experienceeditor)
- [FieldEditButton](editing.md#fieldeditbutton)
- [HorizonEditor](editing.md#horizoneditor)
- [Metadata](editing.md#metadata)
- [WebEditButton](editing.md#webeditbutton)
- [handleEditorAnchors](editing.md#handleeditoranchors)
- [isEditorActive](editing.md#iseditoractive)
- [mapButtonToCommand](editing.md#mapbuttontocommand)
- [resetEditorChromes](editing.md#reseteditorchromes)

### Enumerations

- [LayoutKind](../enums/editing.LayoutKind.md)
- [MetadataKind](../enums/editing.MetadataKind.md)

### Classes

- [GraphQLEditingService](../classes/editing.GraphQLEditingService.md)

### Interfaces

- [RenderMetadataQueryParams](../interfaces/editing.RenderMetadataQueryParams.md)

### Variables

- [DEFAULT\_PLACEHOLDER\_UID](editing.md#default_placeholder_uid)
- [EDITING\_ALLOWED\_ORIGINS](editing.md#editing_allowed_origins)
- [PAGES\_EDITING\_MARKER](editing.md#pages_editing_marker)
- [QUERY\_PARAM\_EDITING\_SECRET](editing.md#query_param_editing_secret)

### Functions

- [getJssPagesClientData](editing.md#getjsspagesclientdata)

## References

### ChromeCommand

Re-exports [ChromeCommand](utils.md#chromecommand)

___

### DefaultEditFrameButton

Re-exports [DefaultEditFrameButton](utils.md#defaulteditframebutton)

___

### DefaultEditFrameButtonIds

Re-exports [DefaultEditFrameButtonIds](utils.md#defaulteditframebuttonids)

___

### DefaultEditFrameButtons

Re-exports [DefaultEditFrameButtons](utils.md#defaulteditframebuttons)

___

### EditButtonTypes

Re-exports [EditButtonTypes](utils.md#editbuttontypes)

___

### EditFrameDataSource

Re-exports [EditFrameDataSource](utils.md#editframedatasource)

___

### ExperienceEditor

Re-exports [ExperienceEditor](../classes/utils.ExperienceEditor.md)

___

### FieldEditButton

Re-exports [FieldEditButton](utils.md#fieldeditbutton)

___

### HorizonEditor

Re-exports [HorizonEditor](../classes/utils.HorizonEditor.md)

___

### Metadata

Re-exports [Metadata](../interfaces/utils.Metadata.md)

___

### WebEditButton

Re-exports [WebEditButton](utils.md#webeditbutton)

___

### handleEditorAnchors

Re-exports [handleEditorAnchors](utils.md#handleeditoranchors)

___

### isEditorActive

Re-exports [isEditorActive](utils.md#iseditoractive)

___

### mapButtonToCommand

Re-exports [mapButtonToCommand](utils.md#mapbuttontocommand)

___

### resetEditorChromes

Re-exports [resetEditorChromes](utils.md#reseteditorchromes)

## Variables

### DEFAULT\_PLACEHOLDER\_UID

• `Const` **DEFAULT\_PLACEHOLDER\_UID**: ``"00000000-0000-0000-0000-000000000000"``

Default value of uid for root placeholder when uid is not present.

#### Defined in

[packages/sitecore-jss/src/editing/utils.ts:6](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss/src/editing/utils.ts#L6)

___

### EDITING\_ALLOWED\_ORIGINS

• `Const` **EDITING\_ALLOWED\_ORIGINS**: `string`[]

Default allowed origins for editing requests. This is used to enforce CORS, CSP headers.

#### Defined in

[packages/sitecore-jss/src/editing/utils.ts:22](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss/src/editing/utils.ts#L22)

___

### PAGES\_EDITING\_MARKER

• `Const` **PAGES\_EDITING\_MARKER**: ``"jss-hrz-editing"``

ID to be used as a marker for a script rendered in XMC Pages
Should identify app is in XM Cloud Pages editing mode

#### Defined in

[packages/sitecore-jss/src/editing/utils.ts:17](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss/src/editing/utils.ts#L17)

___

### QUERY\_PARAM\_EDITING\_SECRET

• `Const` **QUERY\_PARAM\_EDITING\_SECRET**: ``"secret"``

Query parameter for editing secret

#### Defined in

[packages/sitecore-jss/src/editing/utils.ts:11](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss/src/editing/utils.ts#L11)

## Functions

### getJssPagesClientData

▸ **getJssPagesClientData**(): `Record`\<`string`, `Record`\<`string`, `unknown`\>\>

Gets extra JSS clientData scripts to render in XMC Pages in addition to clientData from Pages itself

#### Returns

`Record`\<`string`, `Record`\<`string`, `unknown`\>\>

collection of clientData

#### Defined in

[packages/sitecore-jss/src/editing/utils.ts:166](https://github.com/Sitecore/jss/blob/982e56b08/packages/sitecore-jss/src/editing/utils.ts#L166)
