---
name: app-import
routeTemplate: ./data/component-templates/article.yml
title: JSS App Import
---

# App Import

JSS App Import enables the [code-first](../dev-workflows/overview) dev workflow to import a JSS app that has been defined structually while disconnected from Sitecore, and create the necessary item infrastructure in Sitecore to run the app when it's connected. App import runs as a service endpoint on the Sitecore CM server that accepts deployments from the JSS app.

App import _does not_ import your JSS app's build artifacts, only the Sitecore items, because:

* Production app artifacts need to be deployed to CM and CD instances both, which the service cannot orchestrate
* Reduced attack surface (no capability to modify files via deploy service)

> Note: app import is automatically disabled on Content Delivery (CD) servers.

### The JSS Manifest Package

Importing of JSS application code and items is accomplished via a JSS Manifest Package. The provided `npm` modules include JavaScript utilities for:

* Generating the application manifest. This is a JSON file that contains information on the templates, renderings, placeholders, and items that should be created for the app.
* Bundling the manifest, any associated media assets, and built application code into a Manifest Package.
* Posting the package to a service endpoint for installation and import.

> The Manifest Package format is specific to Sitecore JSS.

### The JSS Import Process

The import process kicked off by the Manifest Package is comprised of a series of pipelines in the `javaScriptServices` group which will create template, layout, media, and content items based on the data in the manifest.

| Pipeline | Description |
| -------- | ----------- |
| `import` | The primary pipeline for the import process which initializes the context for the import, creates template and layout items, and triggers the creation of content item pipelines. |
| `create.item` | Finds or creates a content item. |
| `update.item` | Populates or updates field values on a content item, triggers the update of item layout. |
| `import.field` | Imports the value of a field on a content item. |
| `create.media` | Creates a media item from an asset associated with the manifest. |
| `import.layout` | Populates the layout of an imported item.
| `create.renderingInstance` | Creates a rendering instance for use in imported item layout. | 

![Import Pipelines](/assets/img/import-pipelines.png)

> Pipelines are configured in  `\App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.AppServices.config`, but you should use a configuration patch for any adjustments.

[Read more on import pipeline processors, including limitations, here.](/docs/techniques/working-disconnected/import-process)

### Import Datasource Location Strategies

When creating datasource items for renderings, the import process will utilize the `datasourceStrategy` value in the app configuration to look up an implementation of `IDatasourceStrategy` configured in the `/javaScriptServices/datasourceStrategies` configuration section. An `IDatasourceStrategy` is used in the import process to determine the allowed datasource locations for any created renderings, and the parent folder for any created datasource items. JSS ships with four options out of the box.

| Strategy | Description |
| -------- | ----------- |
| `appLevel` | Datasource location and parent will be a folder named for the datasource template, created at the path specified in `appDatasourcesPath`. |
| `routeLevel` | Datasource location and parent will be a single folder under each route item whose name is indicated by in `routeDatasourcesPath`. |
| `preferRouteLevel` (Default) | Configure both `appLevel` and `routeLevel` options as datasource locations, but utilize `routeLevel` when importing items. |
| `preferAppLevel` | Configure both `appLevel` and `routeLevel` options as datasource locations, but utilize `appLevel` when importing items. |

> For route-level datasource items to work, the route must have a child item with a name matching the value specified in `routeDatasourcesPath`. The JSS import process will create this folder for any generated routes. However new routes created via the Content Editor or Experience Editor will not have this folder. You may wish to implement a solution to [ensure datasource location folders exist](http://reinoudvandalen.nl/blog/ensure-your-sitecore-datasource-locations/).