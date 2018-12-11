---
name: extending-import
routeTemplate: ./data/component-templates/article.yml
title: Extending the Import Pipeline
---

# Extending the Import Pipeline

The [import pipeline](/docs/techniques/working-disconnected/import-process) for the code-first workflow can be extended in powerful ways. This is an example of extending the import process to allow customizing the path of templates you create.

## Step 1: Extend your manifest data

The [manifest](../manifest-generation) is the format that item data takes on its way to being imported. First, we need to add the path data to the manifest. This is actually awfully easy - just add a new JS property:

```javascript
export default manifest => {
  manifest.addComponent({
    name: "Welcome",
    // we added this property to our welcome component
    path: "/sitecore/templates/Welcome",
    fields: [
      { name: "title", type: manifest.fieldTypes.singleLineText },
    ]
  });
};

```

Once added to the manifest declaration, the property is added to the manifest JSON file created when you run `jss manifest`. This is normally `sitecore/manifest/sitecore-import.json`.

When `jss deploy items` is run, this manifest is bundled up into a JSS manifest package file and uploaded into Sitecore where the [import pipeline](/docs/techniques/working-disconnected/import-process) takes over and installs the items.

## Step 2: Modify the import pipeline to do something with your data

To make our custom path work, we need to extend the import pipeline to alter how templates are created by the import process. Specifically we need to target the `ProcessTemplates` processor in the `import` pipeline, derive from it, and alter its behaviour. Here's the code to do just that:

```c#
using System;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.JavaScriptServices.AppServices.Data;
using Sitecore.JavaScriptServices.AppServices.Extensions;
using Sitecore.JavaScriptServices.AppServices.Models;
using Sitecore.JavaScriptServices.Configuration;

namespace Sitecore.JavaScriptServices.AppServices.Pipelines.Import
{
    public class ProcessTemplatesWithPath : ProcessTemplates
    {
        protected override TemplateItem CreateTemplate(TemplateDef templateDef, Item parent, Item multilistRoot, AppConfiguration app, IdManager idManager)
        {
            // the AdditionalData property is a dictionary of any JSON properties that were _not_ mapped to a TemplateDef property
            // so our path property - and any other custom properties that are added - will show up here. It will be null if no unmapped
            // properties exist so make sure to check everything for nulls with ?
            //
            // All import pipeline model objects have an AdditionalData property like this.
            var path = templateDef.AdditionalData?["path"]?.ToString();

            // path not set, use default behavior
            if (path == null) return base.CreateTemplate(templateDef, parent, multilistRoot, app, idManager);

            // resolve the custom path's parent (to keep things simple, we're not creating any parent hierarchy)
            var parentItemPath = path.Substring(0, path.LastIndexOf("/"));
            var customParentItem = parent.Database.GetItem(parentItemPath, parent.Language);

            if (customParentItem == null) throw new InvalidOperationException($"Parent item for custom import path item {templateDef.Name} ({path}) did not exist.");

            var templateName = ItemUtil.ProposeValidItemName(templateDef.Name);

            // JSS imports use _consistent IDs_ so that imports across instances use the same Sitecore item GUIDs
            // This code generates the consistent ID and ensures that it is unique.
            var templateId = idManager.GetTemplateId(app.Name, templateDef);
            idManager.AssertIdIsUnused(templateId, $"template {templateDef.Name}");

            // ensure we have permissions to create the item
            if (!customParentItem.CanImportChild(templateName, templateId, out var templateItem))
            {
                return null;
            }

            if (templateItem == null)
            {
                Log.Info($"[JSS] - Creating template - {templateName} (Custom path: {path})", this);
                templateItem = parent.Database.Templates.CreateTemplate(templateName, customParentItem);

                // make the db see our new template
                parent.Database.Engines.TemplateEngine.Reset();
            }
            else
            {
                Log.Debug($"[JSS] - Found existing template - {templateName}", this);
            }

            // sets the requisite fields on the template item
            UpdateTemplateItem(templateItem, templateDef, parent, multilistRoot, app, idManager, templateItem.DisplayName);

            return templateItem;
        }
    }
}
```

## Step 3: Insert our custom pipeline processor with a config patch file

Copy the following to `App_Config/Include/PickAnyFileName.config`. This will cause Sitecore to replace the default `ProcessTemplates` processor with our custom extended processor:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:set="http://www.sitecore.net/xmlconfig/set/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
  <sitecore role:require="ContentManagement or Standalone">
    <pipelines>
      <group groupName="javaScriptServices">
        <pipelines>
          <import>
            <processor 
              type="Sitecore.JavaScriptServices.AppServices.Pipelines.Import.ProcessTemplatesWithPath, Sitecore.JavaScriptServices.AppServices"
              patch:instead="*[contains(@type, 'ProcessTemplates')]" />
          </import>
        </pipelines>
      </group>
    </pipelines>
  </sitecore>
</configuration>
```

## Step 4: Deploy your JSS app

Deploy your jss app with `jss deploy items` (if the app has never been deployed before, use `jss deploy app -c`). In the deployment log, you should see your custom template get deployed:

```
[JSS] - Creating template - Welcome (Custom path: /sitecore/templates/Welcome)
```

## Step 5: Review

The template should be deployed at the path you requested in Sitecore. Note: If you've previously deployed your JSS app and have an existing template item in the default location, ensure that you remove it and change any usages of it to the new template.