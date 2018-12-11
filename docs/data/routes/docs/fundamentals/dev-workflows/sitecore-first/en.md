---
name: sitecore-first
routeTemplate: ./data/component-templates/article.yml
title: Sitecore-first Workflow
---
# Sitecore First Workflow

> NOTE: before working Sitecore-first, we recommend doing an initial deploy of a new app with Import. This will create all of the root items, base templates, and such to get you started on a well-organized JSS app.

Working Sitecore-first in a JSS app is a lot like building any non-JSS Sitecore site. There are a few key differences:

## Creating Renderings

When creating _rendering_ items, use the `Json Rendering` template instead of View renderings, XSLT, etc. This rendering template is automatically rendered to JSON when emitted via Layout Service. Json Rendering also includes some additional fields that allow you to set [Rendering Contents Resolvers](/docs/techniques/extending-layout-service/layoutservice-rendering-contents), set up [Integrated GraphQL queries](/docs/techniques/graphql/integrated-graphql), and configure any placeholders that are exposed by the rendering.

Also unique to Json Rendering, the `Component Name` field is a string that needs to match up to the name of a component registered in the JSS app. For example, if you created a rendering with `Foo` as the component name, the JSS app would need a `Foo.js` component that was registered with its component mapping as `"Foo" -> Foo.js`. If a component name cannot be mapped, JSS apps will show a placeholder with the name of the missing component received from Sitecore. This can be used to scaffold out a component hierarchy prior to frontend developers actually implementing the view of the components.

> If you add a placeholder to a rendering, don't forget to add it to the `Layout Service Placeholders` field on the rendering item - if this is not done, Layout Service will not attempt to render the child placeholder, and you will not receive any renderings added to it in the Layout Service data.

## Editing & Creating Routes

Creating routes Sitecore-first is just like adding pages in a traditional Sitecore site.

## Scripted component scaffolding in Sitecore-first

When working in a Sitecore-first application, the task of adding a new component involves a repetitive set of steps (creating a rendering item, datasource template item, datasource location folders, linking them together, etc). To keep this simple, there are JSS CLI commands to help scaffold JSS components' Sitecore infrastructure:

* `jss deploy component` deploys a new component (similar to `manifest.addComponent()` for code-first, but directly to the Sitecore database) 
* `jss deploy template` deploys a new Sitecore template (for use as a content template, settings item, etc) 

Run `jss deploy component --help` for documentation; a usage can be as simple as `jss deploy component HelloWorld --allowedPlaceholders content`.

## Transitioning from Code-first to Sitecore-first

The JSS sample apps are all set up to use [code-first](/docs/fundamentals/dev-workflows/overview) workflow by default. At some point, apps may wish to transition from working with disconnected data and importing that into Sitecore to treating Sitecore data as the master.

Such a transition would usually be because:

* An app started its life as a code-first disconnected prototype and is transitioning to be Sitecore integrated
* App developers are more comfortable working in Sitecore than in JS and prefer a familiar backend
* The [limitations](/docs/techniques/working-disconnected/import-process) of import are too limiting, and the app is transitioning to use Sitecore item serialization

> It is not necessary to perform any steps to transition to Sitecore-first development, other than to not push import data. The following steps are for developers wishing to remove artifacts of code-first development from their app for cleanup and safety in case of an accidental deployment.

### Removing Code-First Artifacts

These instructions apply to all supported JS libraries.

> Extensively customized apps using different techniques than the standard sample apps may require additional steps depending on their customizations.

* Delete `/data` to remove disconnected route data, if it exists
* Delete `/sitecore/definitions` to remove the manifest definitions
* Delete `/sitecore/pipelines` (if it exists) to remove manifest pipeline patches
* Delete `/scripts/disconnected-mode-proxy.js` to remove an unused script
* In the `package.json`:
    * Remove the `start` script, and (optional) rename `start:connected` to `start` to remove the option to start disconnected
    * Remove the `bootstrap:disconnected` script


### Working After Removal

Once code-first has been removed from the app, you may continue development as before but without expecting any new items to come from the JSS app.

> At this point you will most likely be working in connected mode, where your app is running locally but fetching data from a Sitecore instance which is available via HTTP(S). Therefore, if you haven't already, it is recommended to follow the steps outlined in [connected mode setup](/docs/fundamentals/application-modes).