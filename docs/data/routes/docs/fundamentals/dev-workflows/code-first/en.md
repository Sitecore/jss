---
name: code-first
routeTemplate: ./data/component-templates/article.yml
title: Code-first Workflow
---

# Code-first workflow

> When contemplating using code-first workflow, it's important to be aware of the [limitations of this technique](/docs/techniques/working-disconnected/import-process) to ensure you make the correct choice of workflow.

## Initial app deployment

Before deploying, ensure that you have a Sitecore install with JSS server components installed.

The app drives all the initial content hierarchy (routes -> page-level items), renderings (for each component there will be one rendering item in Sitecore) and presentation details on page-level items.

To deploy your app, run:

```
jss deploy app --includeContent --includeDictionary
```

This command will perform the following steps for you, which can also be performed independently if needed:

* **App manifest** generation starts with `jss manifest`. This will generate the `sitecore-import.json` file that will be used by `jss package`.
* A JSS _manifest package_ is generated using the manifest created previously, using `jss package`
* The app will be built, using `jss build`.
* The manifest package is deployed to Sitecore via the import service endpoint - `jss deploy items --includeContent --includeDictionary`
* The build artifacts are copied to the Sitecore instance at the configured location - `jss deploy files`

At the end of the process, you will have everything necessary automatically created in Sitecore and your app is expected to render the same way as in the disconnected mode.

> See the documentation about the [import process](/docs/techniques/working-disconnected/import-process) for important information on how import works and how to customize it

## Incremental app deployment

> For a Sitecore-first development process incremental deployments will use `jss deploy files` only. Package-based deployment is only for code-first scenarios after the initial deployment.

The same scripted process applies for incremental deployment. If you added a new component that needs to be deployed to Sitecore, you can simply execute `jss deploy app`, with `--includeContent --includeDictionary` if appropriate, and the import process will take care of the change.

> Before using `jss deploy app` for incremental deployment, read the [import process](/docs/techniques/working-disconnected/import-process) documentation for important considerations.

Here you have more options, however. You may want to deploy changes during development with `jss deploy files`, for example.

When the content user activity starts, it makes sense to think about the parts of the content tree owned by developers (`/sitecore/layout` and `/sitecore/templates`) and which ones are owned by content authors (`/sitecore/content`). See the [Content Workflow and Developer Overwrite](#content-workflow-and-developer-overwrite) section for more information about content ownership.

## Content Workflow and Developer Overwrite

The JSS import process is designed to gracefully skip items to which the configured import user does not have write permission. This allows you to utilize Sitecore Security to prevent the import from overwriting content which should no longer be "developer-owned."

To further facilitate this, JSS includes a content workflow which is automatically applied to all generated templates. This workflow defines *Development Mode* and *Content Mode* states to designate the current "ownership" of a content item.

![JSS Workflow](/assets/img/jss-workflow.png "JSS Workflow")

| Workflow State     |         |
|:-------------------|--------:|
| Development Mode   | Import can overwrite field values and route item layout.  |
| Content Mode       | Import user is denied item write access. Import will skip writes on the item. For route items, this means that any rendering changes or updates to datasource items are also skipped. |

Note that *Development Mode* includes an *__OnSave* command which moves the item into *Content Mode*. This means that by default, any content changes to an item will force it into *Content Mode*, to avoid overwrite by subsequent imports.

> By default the *Development Mode* workflow state is not publishable. This means that a JSS site that has its content database set to anything other than _master_ (thus enabling workflow and publishing) will not publish content items that are imported from the JSS app manifest without workflow approval. For use-cases where app-based content should be considered "publishable", check the *Final* checkbox on the *Development Mode* workflow item in the above screenshot.

To move an item back to *Development Mode*, you can use the *Allow Developer Overwrite* action. As stated in the confirmation dialog presented by that action, doing so can be dangerous. If the developer does not pull the latest content, whatever is imported next will overwrite the existing item content. Even if the developer uses `pull-all-route-data` to update local data, data and configuration can still be lost, since the route data is not a complete serialization of the item. Examples of data that could still be lost includes:

* Personalization rules / conditional rendering
* Content tests
* Final Layout (though it will be pulled in the route data, it would be reimported as Shared Layout)
* Specific datasource locations (import will utilize whatever datasource strategy is configured for the app)
* etc

Therefore it is recommended that you limit use of *Allow Developer Overwrite* to only scenarios when simple content changes have been made to route and/or its datasources, or potentially when renderings have been added to the Shared Layout.

[As when deploying items using any tool which can serialize Sitecore items](https://sitecore.stackexchange.com/a/1046), you need to carefully consider ownership of items when using the import process. Rather than updating the routes through the import, your import may simply provide new components which content authors can utilize on the routes.

## Front-end Developer vs Sitecore Developer Item Ownership

Similar to designating content author "ownership" of content items is JSS's use of Sitecore security to designate developer items which should not be overwritten on import. This would typically include items such as:

* The app's generated Route template
* Datasource templates and their fields
* The app's generated main layout
* Renderings
* Placeholder settings

Denying `item:write` and `item:create` access to the `sitecore\JSS Import Service Users` role or the specific import user allows a Sitecore developer or admin to limit items that the front-end developer can create and update. The import process will gracefully skip those items and output a warning indicating that it has done so. This allows the Sitecore developer to tweak the imported items without fear that the changes will be overwritten.

![Item skip in import log](/assets/img/security-item-skip.png "Item skip in import log")

To facilitate these restrictions, JSS provides two security presets that can be used to quickly protect items from the import process.

![JSS Security Presets](/assets/img/security-presets.png "Security presets")

>Note that you may need to scroll past the default Sitecore `Remove Inherit` and `Require Login` presets to see these options, or use the dropdown button of the `Presets` box to see them all.

| Preset             |         |
|:-------------------|--------:|
| No overwrite       |Denies `item:write` access to the item and its descendants for the `sitecore\JSS Import Service User` role. Indicates the import should not overwrite any field values on the item.  |
| No new children    |Denies `item:create` access to the item and its desendants for the `sitecore\JSS Import Service User` role. Indicates the import should not create any new children under the item. |

Care should be taken when using this mechanism as it will require additional coordination between the front-end developer and the Sitecore developer if a change is needed to the items in question.

> You don't necessarily need to restrict writes if you are updating fields which JSS does not touch. JSS import will never delete an item unless "full wipe" mode is enabled. However note that doing this confuses the ownership of the item and could create issues in the future if the JSS import adds support for the field.

## Import Full Wipe Mode

During initial development, when application structure is most volatile, it can be helpful to have a "fresh start" on each import. Enabling _Full Wipe_ mode will delete any imported items at their currently configured path at the start of the import process. It is intended primarily for local development or Continuous Integration configurations, where check-ins from front-end developers are being automatically deployed/imported in a CI environment.

_Full Wipe_ has a "double lock" on it and must be enabled in two places:
* The _SitecoreJSS.WipeAllowed_ setting in Sitecore configuration must be enabled (`true`) in a configuration patch.
* The _--wipe_ parameter (alias `-w`) must be passed via the JSS CLI `deploy` command: `jss deploy app -c -d -w`

In addition, the _SitecoreJSS.WipeMode_ setting can be used to control whether the import recycles (default) or does a hard delete of the items. Change this setting at your own risk.

> Care should be taken to ensure that _Full Wipe_ is not enabled in a content entry or production environment. Sitecore configuration rules are in place by default so that the `WipeAllowed` global setting defaults to `true` for Sitecore installs that are in the `Standalone` role. This is designed to make it easy to wipe while developing, but hard to mistakenly wipe a production site (which would have a `ContentManagement` role)  The paranoid and/or thorough may also wish to disable `item:delete` access to relevant portions of the content tree for the JSS import role or user.