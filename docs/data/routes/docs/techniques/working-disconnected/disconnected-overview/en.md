---
name: disconnected-overview
routeTemplate: ./data/component-templates/article.yml
title: Working Disconnected
---
# Working Disconnected

When utilizing a code-first approach with JSS, the application can run during development without the need for a Sitecore instance. In order to support this, as well as deploy the disconnected data to Sitecore later, we need a way define your app's data without Sitecore. 

This is accomplished via the _manifest_ generation process.  The manifest is a JSON file that represents your data in a format that can be imported into Sitecore or used to host the app disconnected.

> It is important to note that manifest generation and the corresponding code-first approach for JSS apps is entirely _**optional**_. Your app can utilize a Sitecore-first approach, in which case you would not need to generate an app manifest but you would need a Sitecore instance to run the app.
>
> An app with a manifest can also run in _connected mode_, where actual Sitecore data is used - which may be deployed by the manifest.
>
> We recommend using code-first to do at least the initial deployment of a JSS app to Sitecore, even if [not using the pattern](/docs/fundamentals/dev-workflows/sitecore-first) after that, to save time setting up root items and such for your application.

## Types of Manifest Data

There are several kinds of data that can be added to the JSS manifest. In the sample apps, these live under `/data` and `/sitecore/definitions`.

### Routes

Routes are an essential component of any app. These define the routes (somewhat like pages if you're new to JS apps, or like items under a site root for Sitecore developers) that make up your application. The sample apps use the most popular routing platform for their library (i.e. `react-router`) to enable these defined routes to resolve when the app is run.

Routes are hierarchically defined, forming a traditional page-tree architecture. There is no requirement to force your app to use this exact routing paradigm; if you need to do routing in a complex way that is fine. The Sitecore [Layout Service](/docs/fundamentals/services/layout-service), which provides route data, expects to receive a route path to retrieve data for but that does not mean the frontend router must use that exact route path in the browser. _NOTE: using custom routing may require implementation of the same custom routing on the Sitecore backend to allow for editing the custom routed site. When possible, try to use hierarchical routes._

A route definition contains at a minimum a `name` (used to construct the route segment). Most routes will also define `placeholders`, which allow defining a set of frontend components and data that should be placed inside JSS `Placeholder` components of the same name.

In the sample apps, routes are defined in `/data/routes/[path-to-route]/[language].{yaml|yml|json}`. For example, `/data/routes/en.yml` would be the route data for the `/` route in English, or `/data/routes/about/es-MX.yml` would be the data for the `/about` route in Spanish (Mexico).

#### A Crash Course in JSS Layout

In a JSS app, the content of your application's routes are determined by _placeholders_ and _components_.

A _component_ is exactly what it sounds like: a frontend component. These components are defined just like any normal component in your library of choice (i.e. Vue). A JSS component's only special property is that it gets a special prop passed to it that contains the content data that it should render, which comes from Sitecore in production. Where components diverge into special territory is that they are _dynamically bound to routes_. You'll never directly instantiate or render a component other than by adding it to a route by name - that's the JSS infrastructure's job. The component data structure is defined by fields defined in the corresponding Sitecore rendering's data template.

A _placeholder_ is a special component that JSS includes. When added to the app root component, or another component, this component creates a _named placeholder key_ that you can dynamically place other _components_ that are registered with JSS into. In the case of being connected to Sitecore, placeholders are how features of Sitecore such as personalization, testing, and editors' ability to alter the page layout work. Which components are bound within a placeholder is determined by the route data file, when disconnected.

See also [understanding layout](/docs/fundamentals/understanding-layout)

#### The Structure of a Route File

Very advanced capabilities are available in route files (see the reference material for the full APIs), but they can also be quite simple to define. Here's a sample route data file, written in YAML, that defines data for an `about` route:

```yaml
/data/routes/about/en.yml

# name: names the route segment. Should match parent folder name.
name: about
# The root of the layout for this route
placeholders:
  # this defines the components that belong in the 'main' placeholder
  # defining this means it's expected to have a <Placeholder key="appname-main"> component added
  # to the root app component
  appname-main:
  # Adds a component called 'Heading' to the route in the 'main' placeholder
  - componentName: Heading
    # Component data can be as complex as a reference to another component (see the reference),
    # or as simple as defining field values that the component will receive
    fields:
      # Fields must be defined on the component definition (see below) to be used
      # a field consists of a top level named object, and a child value which may be a simple string,
      # or something more complex for fields like images
      titleField:
        value: Page Title
      imageField:
        value:
          src: "/assets/img/logo.png"
          alt: Logo
    # A component can itself expose placeholders (e.g. Heading might expose 'appname-heading-content') that contain more components
    # Child placeholders are defined hierarchically under the component that exposes them
    placeholders: 
      appname-heading-content:
      - componentName: ContentComponentSample
        fields:
          # ...
```

If you're more comfortable with JSON, and don't mind the excessive quotes and brackets, lack of comments, and need to escape content blocks, here's an equivalent in JSON:

```json
{
  "name": "about",
  "placeholders": {
    "appname-main": [
      {
        "componentName": "Heading",
        "fields": {
          "titleField": {
            "value": "Page Title"
          },
          "imageField": {
            "value": {
              "src": "/assets/img/logo.png",
              "alt": "Logo"
            }
          }
        },
        "placeholders": {
          "content": [
            {
              "componentName": "ContentComponentSample"
            }
          ]
        }
      }
    ]
  }
}
```

### Component Content

Component content is a way to share components between routes. A common scenario for using this might be that you're sketching out a JSS site but the only content for it is _lorem ipsum_ text and FPO (for placement only) images, and you don't want to maintain many copies of the same component. Or that there are pieces of shared content that are used on multiple routes.

Component content is organized in a similar folder structure to routes (`/data/component-content`), with the same folder-and-language naming convention - for example `/data/component-content/ComponentName/id/en.yml`. Conventionally you should store component content under a folder named for its component that it defines (e.g. `ComponentName` in the preceding example).

The content of a shared component looks exactly like a component added directly to a route, _except that you must specify an **id** and **name** attribute so it can be referred to_. The ID value must be unique across the entire JSS application.

```yaml
/data/component-content/Heading/fpo-heading/en.yml

id: fpo-heading
name: FPO Fake Heading
componentName: Heading
fields:
  titleField:
    value: Page Title
```

Using the shared component on routes is very simple: you add a component to a placeholder but instead of specifying a `componentName` and `name`, specify _only the `id`_:

```yaml
/data/routes/en.yml

name: home
placeholders:
  appname-main:
  - id: fpo-heading
```

The `fpo-heading` we defined is now referenced on the home route, and all of its data is expanded into the home route layout. 

There is another way to reference content as well that takes effect when the site is imported into Sitecore: copying. When a reference like the above is imported all usages of that reference are placed in a single content item in Sitecore. This is great for actually shared content (say, a copyright). It's bad if you've been using references to repeat _lorem ipsum_ content on a multicolumn promo, tabs, or carousel - in that case when imported the final content will _not_ be shared, and should be unique. Doing this is as simple as adding `copy: true` to your ID reference:

```yaml
/data/routes/en.yml

name: home
placeholders:
  appname-main:
  - componentName: Tabs
    placeholders:
      appname-tabs:
      - id: fpo-tab
        copy: true
      - id: fpo-tab
        copy: true
```

With the above setup the two tabs are shared _while disconnected_, but when imported to Sitecore become separate items that can be changed independently.

### Content

It's possible to define content items that are neither routes nor shared component content - for example, items that contain content for static items, or items that are shared options for multilist fields in content (see the [route data](/docs/techniques/working-disconnected/manifest-api)).

Content items work exactly like component content, with two exceptions:

* Instead of `componentName`, specify `template`
* Definitions are stored in `/data/content`

### Dictionary

JSS allows you to develop multilingual applications while disconnected. A common requirement in this sort of application is to have a _dictionary_ that translates non-content text elements such as form labels or global elements.

JSS sample applications define their dictionaries under `/data/dictionary` - a single file per language, such as `en.yaml` or `es-MX.json`, is added with a simple mapping between dictionary key and value:

```yaml
/data/dictionary/es-MX.yaml

Login: Iniciar sesión
Close: Cerca
LoginFailed: Nombre de usuario y / o contraseña inválido.
```

## The Manifest JavaScript API

The manifest is generated by taking the YAML or JSON manifest data files described previously and reading them, then adding them to a JavaScript API that generates the manifest. This means that you can replace the JSON or YAML files with direct JS API calls, should you wish to do so. The sample apps use the convention of the `/data` folder as a convention only - the actual manifest is created using the manifest source files in `/sitecore/definitions/*.sitecore.js`. These manifest definition files use helper libraries to crawl the YAML/JSON files and add them to the JS manifest object. If you wish to extend or replace the `/data` convention, that's entirely possible.

There are some manifest items, components and placeholders, which are normally defined using the JS API directly.

### Components

Each frontend component that is added to a _route_ must be defined. This enables JSS to register the component with Sitecore, and provide appropriate infrastructure to give it the content that it needs to render.

Component definitions are conventionally stored in `/sitecore/definitions/components/ComponentName.sitecore.js` If you're using TypeScript, `.ts` is also allowed. The `.sitecore` in the name is also important.

Here's a sample component definition:

```js
// NOTE: if you use an editor, such as VS Code, that reads typings data from imported libraries
// you will receive code completion hints for the manifest definitions

import { addComponent } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    // this name must match the name that is used to add the component to routes,
    // and the name used when the component JS implementation is registered to the componentFactory
    name: 'ConnectedPage',
    // you can use a friendly name for the component to be nice to your authors
    displayName: 'Connected Page',
    // define the content fields, and their data types, that are needed for the component
    fields: [
      { name: 'title', type: manifest.fieldTypes.singleLineText },
      { name: 'text', type: manifest.fieldTypes.richText },
      { name: 'logoImage', type: manifest.fieldTypes.image },
    ],
  });
};
```

### Placeholder Definitions

Defining placeholders explicitly in the manifest is optional. Any placeholder name referred to by a route will be automatically known by the manifest. However, explicitly registering a placeholder allows you to set a display name for it, so that content editors can see something friendlier than `appname-content-leftside-upsidedown-2`.

An explicit placeholder definition is a line in `/sitecore/definitions/placeholders.sitecore.js`:

```js
import { addPlaceholder } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addPlaceholder(manifest, 
    { name: 'appname-main', displayName: 'Main' },
    { name: 'appname-content', displayName: 'Content' });
};
```

## Generating a Manifest

Once the manifest is defined, it has to be generated to create the complete manifest definition (normally emitted to `/sitecore/manifest` in your app). You can make a manifest standalone with the `jss manifest` CLI command, however it's more common that the manifest will be generated during the startup of the disconnected dev server (`jss start`) or during a deployment (`jss deploy items`) unless you're debugging the manifest contents.

When the manifest generation process executes in any of these scenarios, it will do the following:

1. Locate all `/sitecore/definitions/*.sitecore.js` manifest files in your application. This convention is used for files that are part of the manifest.
2. Iterate over the manifest files, invoking the `default` export of each file. The `default` export is expected to be a `function` with signature: `function(manifest) { }`.
3. Each `.sitecore.js` file will invoke various methods on the `manifest` instance that is received by the `default` function, such as `addComponent` or `addRoute`.
4. After all `.sitecore.js` files are processed, the manifest output will be generated via a series of pipelines and the output will either be written to `/sitecore/manifest` or to the console (with `--manifestOutputPath console`).

> The manifest generation process supports transpiled (ES6/TypeScript) manifest sources. In the sample apps, the transpilers' default settings are configured in `/sitecore/definitions/config.js`; this can be overridden with the `--require` argument to the CLI command that generates the manifest.

## Reference

### CLI

Use `jss manifest --help` for the latest documentation. Note that arguments to `jss manifest` are also valid when used with `jss package` or `jss deploy items` which imply manifest generation by default (unless `--skipManifest` is used).

