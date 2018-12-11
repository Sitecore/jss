---
name: import-process
routeTemplate: ./data/component-templates/article.yml
title: Code-First Import Process
---
# The JSS Code-First Import Process

The JSS import process, used for code-first development, is a powerful way to define an application while disconnected from Sitecore and then publish it to Sitecore, creating appropriate Sitecore artifacts as needed such as templates, placeholder settings, datasource items, route items, and rendering items. This can be a very powerful technique to allow frontend developers (or Sitecore developers too!) to rapidly design the structure of an application.

## Important things to know

#### Import is idempotent

You may run the import process multiple times on the same app to the same Sitecore instance without repercussions, with some limitations (which follow). In general, any fields on an item that are not _explicitly_ defined in the manifest are left untouched, for example if a Sitecore developer inputs a `source` for an imported field, the next import will not reset the source unless the manifest also defines a value for `source`. There are also [special considerations](/docs/fundamentals/dev-workflows/code-first) that define how import works with content items and content editors.

#### Import is not a subsititute for Sitecore serialization

The import format is designed to be _simple_ as opposed to full-featured. It is quite capable but does not represent the full fidelity of Sitecore items or handle every situation when updating items. **JSS import is not meant as a replacement for tools such as Unicorn or TDS that serialize Sitecore items**.

Import is primarily to allow the design of JSS apps by frontend developers who may not have an available Sitecore instance, or to begin creating/designing/proof-of-concepting an application when Sitecore is not yet set up. Eventually in the development process import should be supplemented by or replaced by purpose-built Sitecore item serialization tools to maintain the state of a JSS app, with the possible exception of rapidly developed simple campaign-style apps.

Sitecore item serialization tools have no problem serializing items created or updated by JSS import; they are like any other Sitecore item.

#### Import uses strings as IDs by default

The import process maps _string names_ onto Sitecore items which have GUIDs. This makes the import files easier to write, but it does mean that care must be taken when moving or renaming imported items. 

> Note that imported Sitecore item IDs are [deterministic](https://tools.ietf.org/html/rfc4122.html#section-4.3): importing the same app on different Sitecore instances will result in the creation of items with the same IDs in Sitecore.

##### Renaming Imported Items

Because they are matched by string name, renaming an item in your manifest (or in Sitecore) after it has already been imported will result in the creation of a duplicate item if import is re-run. There are several options to deal with this: 

* Explicitly set the manifest ID to the existing imported item ID in Sitecore, then rename it in the manifest. It will be renamed on import.
* Set the _display name_ and leave the name alone, which visually alters the name in Sitecore.

##### Moving Imported Items

Because they are matched by name, moving an imported item will cause a duplicate of it to be created on the next import. If an imported item must be moved, set an explicit ID in the manifest for the item equal to the already imported Sitecore item ID. This will cause the item to be looked up by ID instead of name, and thus survive the moving operation still known by the manifest.

#### Import does not purge unknown items

If a template or route is removed from the manifest, it is not deleted from Sitecore on the next import.

#### Import will set values only for explicitly defined manifest data

For example if a template is imported that does not define an icon, and a Sitecore developer sets an icon on the Sitecore item, future imports will not overwrite the icon value. Explicit manifest data will overwrite values set in Sitecore, however - for example if the manifest _did_ define an icon for a template it _would_ overwrite any value set in Sitecore on import.

## How Import Handles Item IDs

Sitecore items have unique GUID IDs. By default import uses the `name` defined in the manifest to derive a [deterministic GUID](https://tools.ietf.org/html/rfc4122.html#section-4.3) so that the imported item always has a predictable ID. This GUID is _namespaced,_ so that names need only be unique within a section of the app, instead of across the entire JSS app - for example, it's legal to have both a route and a template named "Home" (or two routes at different levels) but it is not legal to have two templates called "Home." The namespace also contains the JSS application name, so multiple JSS apps can have items with the same name.

> Renaming a JSS application will cause all of its items' expected GUIDs to change

It is also possible to specify an _explicit ID_ for all of the items in the import manifest. This takes the form of adding an `id` property to the manifest definition. The `id` can be one of two types:

* A GUID value. This value is used literally, and will be the exact item ID used in Sitecore
* A string value. This is used as the source for a deterministic GUID. Unlike name-based deterministic GUIDs, _explicit string IDs are namespaced only by JSS app name_. This means that they must be globally unique within a JSS app.

> Note that import will never change an existing imported item GUID to avoid losing data. If setting an ID value on an already imported item, that new ID will not take effect in Sitecore unless that item is deleted and import is re-run (or import runs in _full wipe_ mode).

The sample applications have examples of setting explicit IDs in their _content reuse_ styleguide examples. Note that when adding _components_ to the manifest, there are two `id` properties: `renderingId` and `templateId` - this is necessary because a JSS component definition results in adding two Sitecore items.

> When specifying explicit IDs on route data in a multilingual import environment, ensure that the same ID value is set on all language values

## Import Pipeline Details

The pipeline group for all JSS pipelines is `javaScriptServices`.

#### Pipeline Relationships

![Import Pipelines](/assets/img/import-pipelines.png)

#### `import`

> Namespace: `Sitecore.JavaScriptServices.AppServices.Pipelines.Import`

> Processors described as "creating" items will first attempt to Look for an existing item of the same name, and will update that item instead if it already exists. All processors creating or writing items should check `item:create` and `item:write` permissions appropriately first and gracefully skip those actions if permissions do not allow them.

| Processor | Description |
| --------- | ----------- |
| `EnableSecurity` | Ensures that security permissions are enforced. Needed for execution within contexts where security is normally disabled (i.e. as an update package post-step). |
| `SwitchUser` | Switches the user context to the configured import user. |
| `SwitchSite` | Sets up a "mock" site context with workflow enabled and the configured import language as a content language. The latter is needed for proper template creation. |
| `SwitchDatabases` | Switches the database context to the configured import database. |
| `SwitchLanguage` | Switches the language context to the configured import language. |
| `SwitchBulkUpdateContext` | If import indexing optimization is enabled, enters a `BulkUpdateContext`. |
| `VerifyAppConfiguration` | Ensures the app has all required attributes and that configured item paths on the app exist. Populates values on `args.Items`. |
| `Deserialize` | Deserializes import JSON into import data model classes. |
| `WipePreviousImport` | If full wipe mode is enabled, attempts to delete any existing items at the import paths configured on the app. |
| `CreateTemplatesContainer` | Creates the parent item for imported templates.
| `CreateRouteTemplate` | Creates an app-specific template for route items. |
| `CreateAppContainer` | Creates the root item for app routes and data items. Grants the import user `item:create` access on the created item, and assigns the generated route template as an insert option. |
| `CreatePlaceholdersContainer` | Creates the parent item for imported placeholder settings. |
| `CreateRenderingsContainer` | Creates the parent item for imported renderings. Assigns the JSS rendering types as insert options. |
| `CreateMediaLibraryContainer` | Creates the parent item for imported media items. |
| `ProcessTemplates` | Creates all templates in the manifest with their specified fields. Also creates their standard values and sets the configured workflow as the default workflow. |
| `ProcessPlaceholders` | Creates settings items for all placeholders in the manifest, as well as the "root" placeholders in the app configuration. |
| `ProcessRenderings` | Creates rendering items for all renderings in the manifest. Uses the configured datasource strategy to set the appropriate datasource location(s) for the rendering, if it has a datasource template. Configures rendering placeholders based on data in the manifest. |
| `AddPlaceholderAllowedControls` | If allowed controls analysis is enabled, updates all imported placeholder settings with allowed controls, based on rendering usage within the imported routes. |
| `CreateLayout` | Creates a main layout item for the app. Configures its placeholders based on the root placeholders in the app configuration. |
| `SetRouteLayoutStandardValue` | Populates the layout in the standard values of the generated route template with the generated layout item. |
| `SetRouteTemplateInheritance` | If the import manifest defines any custom route templates, sets their base template to the app-specific route template generated above. |
| `ProcessItems` | Creates all route and non-route items in the manifest using the `create.item` pipeline. |
| `ProtectDeveloperItems` | If developer item protection is enabled, applies the read-only/protected flag to imported template and layout/rendering items. |
| `RefreshIndexes` | If import indexing optimization is enabled, refreshes indexes on all the root/parent import items utilizing `IndexCustodian.RefreshTree`. |

> Note that all the `IDisposable` context switchers are disposed outside the pipeline itself, in the `ImportPipeline` service.

#### `create.item`

> Namespace: `Sitecore.JavaScriptServices.AppServices.Pipelines.CreateItem`

| Processor | Description |
| --------- | ----------- |
| `ResolveItemName` | Determines the name of the item to be found/created based on a "namer" provided in pipeline args. |
| `CheckPermissions` | Check whether the item already exists, based on item name. If not, check if permissions exist to create the item. If not, abort pipeline. |
| `ResolveTemplate` | Determine the template that will be used to create a new item, if necessary. |
| `AddItem` | If the item does not already exists, creates it. |
| `UpdateItemValues` | Invokes the `update.item` pipeline to set item values. |
| `CreateChildItems` | Re-invokes the `create.item` pipeline again for each child of the item found in the manifest. |

#### `update.item`

> Namespace: `Sitecore.JavaScriptServices.AppServices.Pipelines.UpdateItem`

| Processor | Description |
| --------- | ----------- |
| `CheckPermissions` | Checks whether permissions exist to write to the item. If not, abort the pipeline. |
| `SetDisplayName` | Sets the item display name based on the "display namer" provided in the pipeline args.|
| `SetFieldValues` | Sets field values on the item by invoking the `import.field` pipeline for each field in the item manifest. |
| `AssignInsertOptions` | If indicated in pipeline args, sets the item's insert options to the item's own template. |
| `ImportLayout` | Invokes the `import.layout` pipeline to update the item's layout/presentation. |

#### `import.field`

> Namespace: `Sitecore.JavaScriptServices.AppServices.Pipelines.ImportField`

| Processor | Description |
| --------- | ----------- |
| `ResolveField` | Finds the field on the item by the name specified in the JSON field model. Aborts the pipeline if not found. |
| `LinkFieldValue` | If the field is one of the configured link field types, invokes the `create.item` pipeline to create the linked items, then populates the field with pipe-delimited IDs and aborts the pipeline. |
| `MediaFieldValue` | If the field is one of the configured image field types, invokes the `create.media` pipeline to create the media item, and populates the field with the media ID and aborts the pipeline. |
| `DefaultFieldValue` | Populates the field with the raw/literal value from the JSON field model and aborts the pipeline. |

#### `create.media`

> Namespace: `Sitecore.JavaScriptServices.AppServices.Pipelines.CreateMedia`

| Processor | Description |
| --------- | ----------- |
| `CalculateItemPath` | Determines the appropriate location in the media library based on the configured app media library path and the path of the asset in the import manifest. |
| `CheckPermissions` | Checks if the media item already exists, and whether write permission is allowed on the item. If not, the existing item is returned and the pipeline is aborted. |
| `CalculateFilePath` | Maps the filesystem path of the asset based on the path of the import package and the path of the asset in the manifest. If the file does not exist at the calculated path, the pipeline is aborted. |
| `BuildMediaCreatorOptions` | Creates the `Sitecore.Resources.Media.MediaCreatorOptions` object that will be used for importing the media. | 
| `CreateFromFile` | Invokes a `Sitecore.Resources.Media.MediaCreator` to import the media file into the media library. |

#### `import.layout`

> Namespace: Sitecore.JavaScriptServices.AppServices.Pipelines.ImportLayout

| Processor | Description |
| --------- | ----------- |
| `CheckForLayout` | Checks if the imported item manifest has any renderings defined. Aborts the pipeline if not. |
| `InitializeLayout` | Creates a new `LayoutDefinition` and initializes the main layout on the configured device. |
| `AddRenderings` | Invokes the `create.renderingInstance` pipeline for each rendering defined in the item manifest, and adds the renderings to the configured device. |
| `SaveLayout` | Sets the layout XML on the item's Shared Layout, using `LayoutField` to ensure that the layout delta calculation is performed. If the processor is configured to do so, resets/clears the Final Layout field on the item as well (`ClearFinalLayout`). |

#### `create.renderingInstance`

> Namespace: Sitecore.JavaScriptServices.AppServices.Pipelines.CreateRenderingInstance

| Processor | Description |
| --------- | ----------- |
| `ResolveRenderingItem` | Finds the imported rendering definition item for the rendering instance. Aborts the pipeline if not found. |
| `CreateRenderingInstance` | Creates a new `RenderingDefinition` and populates its rendering ID, placeholder, UID, rendering parameters, and other properties. |
| `CheckForDatasourceFields` | Checks whether the rendering manifest has any datasource fields. Aborts the pipeline if not. |
| `CreateDatasourceItem` | Uses the configured datasource strategy to create/determine the parent item for the rendering datasource, then invokes the `create.item` pipeline to create or find the datasource item. Updates the rendering with the datasource ID. |