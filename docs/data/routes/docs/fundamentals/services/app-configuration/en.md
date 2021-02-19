---
name: app-configuration
routeTemplate: ./data/component-templates/article.yml
title: App Configuration
---

## App configuration
In order to import a Sitecore JSS app or run it in Integrated mode, the app must be configured via a standard Sitecore configuration patch. JSS default applications include their needed `<app />` configuration (under `/sitecore/config` in the app), and an example configuration patch can also be found at `\App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.ExampleApp.config.example`.

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <javaScriptServices>
      <apps>
        <!-- you may override other attributes from 'defaults' in the app definition below -->
        <app name="exampleApp"
             sitecorePath="/sitecore/content/ExampleApp"
             inherits="defaults"
        />
      </apps>
    </javaScriptServices>
  </sitecore>
</configuration>
```

The above represents the minimum app configuration required.

| Attribute       | Usage  |
| --------------- | ------ |
| `name`          | The unique name of the application. |
| `sitecorePath`  | The content path of the application and its routes when imported. Will be created on first import. |
| `inherits`      | Indicates the `app` which other, non-specified settings should inherit from. Inheritance will cascade through multiple `app` definitions. |

The `defaults` app configuration can be found in `\App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.Apps.config` and reveals other available configuration values used in import and integrated rendering.

> App configuration includes a rudimentary token-replacement system (implemented by the `configuration.replaceConfigurationTokens` pipeline). By default this just supports the `$name` token for the application name.

| Attribute                           | Usage  |
| ----------------------------------- | ------ |
| `filesystemPath`                    | The filesystem deployment path for the JavaScript application. Must match the `sitecoreDistPath` in `package.json`. <br/><br/>Default: `/dist/$name` |
| `serverBundle`                      | The bundled file name of the application's `server.js`. <br/><br/>Default: `server.bundle` |
| `importUser`                        | The Sitecore user account which should be used during the import process. This allows restricting the actions of the import using security and workflow. <br/><br/>Default: `sitecore\JssImport` |
| `importLanguage`                    | The Sitecore language which will be used during import as a fallback, **if** the manifest does not contain a `language` value. <br/><br/>Default: `en` |
| `importDatabase`                    | The Sitecore database which will be used during import. <br/><br/>Default: `master` |
| `importDevice`                      | The device layer in which renderings will be created during import. <br/><br/>Default: `/sitecore/layout/Devices/Default` |
| `rootPlaceholders`                  | A comma-delimited list of the placeholder names at the root of your app layout. <br/><br/>Default: `main` |
| `templatesPath`                     | The path to which generated templates will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/templates/$name` |
| `renderingsPath`                    | The path to which generated renderings will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/layout/renderings/$name` |
| `layoutPath`                        | The path at which the app's generated main layout will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/layout/Layouts/JavaScriptServices/$name` |
| `placeholdersPath`                  | The path to which generated placeholder settings will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/layout/placeholder settings/$name` |
| `appDatasourcesPath`                | The path to which app-level datasource items will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/content/$name/Components` |
| `routeDatasourcesPath`              | The name of the child folder that should be created under route items for route-level datasource items. <br/><br/>Default: `Page Components` |
| `mediaLibraryPath`                  | The path to which media items will be imported. It will be created if needed, including any ancestor folders. <br/><br/>Default: `/sitecore/media library/$name` |
| `defaultWorkflow`                   | The default workflow which should be applied to the standard values of generated templates. <br/><br/>Default: `/sitecore/system/Workflows/JSS Development Workflow` |
| `appTemplate`                       | The template of the generated root app item. If changed this template *must* inherit from the default app template. <br/><br/>Default: `/sitecore/templates/JavaScriptServices/App` |
| `routeBaseTemplate`                 | The base template for the app-specific route template which the import will generate. If changed this template *must* inherit from the default route template. <br/><br/>Default: `/sitecore/templates/JavaScriptServices/Route` |
| `routeTemplateName`                 | The name that should be used for the generated route template. <br/><br/>Default: `$name Route` |
| `layoutTemplate`                    | The template to be used for creating the app's main layout item. If changed this *must* inherit from the JSS `JavaScript Main Layout`. <br/><br/>Default: `/sitecore/templates/JavaScriptServices/JavaScript Main Layout` |
| `folderTemplate`                    | The template to be used for creating generic folders (e.g. for datasource items). <br/><br/>Default: `/sitecore/templates/Common/Folder` |
| `placeholderSettingsFolderTemplate` | The template to be used for creating placeholder setting folders. <br/><br/>Default: `/sitecore/templates/System/Layout/Placeholder Settings Folder` |
| `renderingsFolderTemplate`          | The template to be used for creating renderings folders. <br/><br/>Default: `/sitecore/templates/System/Layout/Renderings/Rendering Folder` |
| `layoutFolderTemplate`              | The template to be used for creating folders for the app main layout. <br/><br/>Default: `/sitecore/templates/System/Layout/Layout Folder` |
| `templateFolderTemplate`            | The template to be used for creating template folders. <br/><br/>Default: `/sitecore/templates/System/Templates/Template Folder` |
| `mediaLibraryFolderTemplate`        | The template to be used for creating folders in the media library. <br/><br/>Default: `/sitecore/templates/System/Media/Media folder` |
| `protectDeveloperItems`             | Boolean value indicating whether "developer" items (i.e. template and layout items) should have their read-only/protected flag turned on by the import. <br/><br/>Default: `true` |
| `optimizeImportIndexing`            | Boolean value indicating whether the import should utilize a `BulkUpdateContext` during the import and then refresh indexes following import completion. <br/><br/>Default: `true` |
| `datasourceStrategy`                | The name of the datasource import strategy that should be utilized. The setting should reference the name of an `IDatasourceStrategy` configured in the `/javaScriptServices/datasourceStrategies` config section. <br/><br/>Default: `preferRouteLevel` |
| `analyzeAllowedControls`            | Boolean value indicating whether the import should attempt to populate the `Allowed Controls` field on placeholder settings based on rendering usage within the imported routes. <br/><br/>Default: `true` |
| `dictionaryDomain`                  | The name or GUID of the Sitecore Dictionary Domain that should be used with the app. If not configured, the application dictionary will fall back to the default dictionary of the context database. <br/><br/>Default: (none) |
| `layoutServiceConfiguration`        | The name of a named Layout Service configuration that will be used for integrated mode app rendering. Outside of integrated mode, the app will need to explicitly reference this configuration. <br/><br/>Default: `jss` |
| `serverSideRenderingEngine`         | [Rendering engine](/docs/fundamentals/services/view-engine) used by Sitecore when rendering the app server-side. Possible values: `nodejs` and `http`. <br/><br/>Default: `nodejs` |
| `serverSideRenderingFunctionName`   | Only relevant when `nodejs` rendering engine is enabled. Name of the exported JS function on your `serverBundle` to call when rendering in integrated mode. <br/><br/>Default: `renderView` |
| `serverSideRenderingEngineEndpointUrl` | Only relevant when `http` rendering engine is enabled. Defines an HTTP endpoint for a remote rendering host. <br/><br/>Default: `` |
| `serverSideRenderingEngineApplicationUrl` | Only relevant when `http` rendering engine is enabled. Defines the URL that will be used when creating absolute links for any relative links in the rendered HTML, which is necessary in the Experience Editor. If not specified (default), the host name will be extracted from the `serverSideRenderingEngineApplicationUrl`.<br/><br/>Default: `` |
| `deploymentSecret`                  | Configures the app import shared secret. This secret must be 32+ randomly generated characters, and it must match the secret in the app's `scjssconfig.json` to work. For Sitecore-first dev workflow, this is unnecessary. Do not commit this secret to source control, and use a unique secret for every environment. Possession of this secret effectively grants you the ability to administratively create and modify Sitecore items.<br/><br/>Default: (none) |
| `debugSecurity`                     | Enables security debugging if you're having app import connection issues. Details about the processing of the shared secret on the server-side will be logged. _Do not use unless debugging a connection issue_. Pairs with `--debugSecurity` on the CLI to diagnose the client-side. <br/><br/>Default: `false` |