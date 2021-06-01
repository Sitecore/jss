---
name: disconnected-overview
routeTemplate: ./data/component-templates/article.yml
title: Working Disconnected
---
# Working disconnected

When utilizing a code-first approach with JSS, the application can run during development without a Sitecore instance. 

To support working disconnected and deploy the data to Sitecore later, we need to define your app's data without Sitecore using the  _manifest_ generation process.  

The manifest is a JSON file representing your data in a format that can be imported into Sitecore or used to host the app disconnected.

Manifest generation and the corresponding code-first approach for JSS apps is entirely _**optional**_. An app with a manifest can also run in _connected mode_, where it uses actual Sitecore data - which the manifest may deploy.

> Your app can utilize a [Sitecore-first approach](/docs/fundamentals/dev-workflows/sitecore-first), in which case you do not need to generate an app manifest. Developing Sitecore-first requires a Sitecore instance to run the app.

> We recommend using code-first for the initial deployment of a JSS app to Sitecore, even if not using the pattern after that, to save time setting up items for your JSS application. 


## Types of manifest data

You can add several types of data to the JSS manifest. These live under `/data` and `/sitecore/definitions` in the sample apps.

### Routes

Routes are an essential component of any app. These define the routes that make up your application. You can think of them as:

Somewhat like website pages if you're new to JS apps or, 
Items under a site root if you're a Sitecore developer. 
The sample apps use the most popular routing platform for their library (for example, `react-router`) to enable these defined routes to resolve when the app runs.

Routes are hierarchically defined, forming a traditional page-tree architecture. Since there is no requirement to force your app to use this routing paradigm, you can implement more complex routing patterns if you need to. The Sitecore [Layout Service](/docs/fundamentals/services/layout-service) expects to receive a route for retrieving data. But that does not mean the frontend router must use that exact route path in the browser. 

> Using custom routing may require implementing the same custom routing on the Sitecore backend to allow editing the custom routed site. When possible, try to use hierarchical routes.

A minimal route definition contains a `name` (used to construct the route segment). Most routes also define `placeholders`, defining a set of frontend components and data placed inside JSS `Placeholder` components of the same name.

In the sample apps, routes are defined in `/data/routes/[path-to-route]/[language].{yaml|yml|json}`. For example, `/data/routes/en.yml` would be the route data for the `/` route in English, or `/data/routes/about/es-MX.yml` would be the data for the `/about` route in Spanish (Mexico).

#### A crash course in JSS layout

In a JSS app, _placeholders_ and _components_ determine the content of your application's routes.

A _component_ is what it sounds like: a frontend component. These components are defined just like any standard component in your library of choice (for example, Vue.js). The only particular property of a JSS component is the one that contains the content data that it should render, which, in production, comes from Sitecore. 

Where components diverge into JSS-specific territory is that they are _dynamically bound to routes_. You'll never directly instantiate or render a component - that is the JSS infrastructure's job. What you need to do, however, is adding it to a route by name. The component data structure is defined by its fields defined in the corresponding Sitecore rendering's data template." 

A _placeholder_ is a special component included with JSS. When added to the app's root component, or another component, this component creates a _named placeholder key_.  You can use the named placeholder key for dynamically placing other _components_ registered with JSS in the corresponding placeholder. 

When connected to Sitecore, placeholders enable the functionality of Sitecore features, such as personalization, testing, and editors' ability to alter the page layout. 

When working disconnected from Sitecore, you determine the binding of components to specific placeholders through the route data file.  

See also [understanding layout](/docs/fundamentals/understanding-layout).

#### The Structure of a Route File

Very advanced capabilities are available in route files (see the reference material for the full APIs), but they can also be quite simple to define. Here's a sample route data file, written in YAML, that defines data for an `about` route:

```yaml
/data/routes/about/en.yml

# name: names the route segment. Should match parent folder name.
name: about
# The root of the layout for this route
placeholders:
  # defines the components that belong in the 'main' placeholder
  # defining the appname-main placeholder requires a <Placeholder key="appname-main"> component added to the root app component
  appname-main:
  # Adds a component called 'Heading' to the route in the 'main' placeholder
  - componentName: Heading
    # Component data can be as complex as a reference to another component (see the reference),
    # or as simple as defining field values that the component receives
    fields:
      # To use fields, they must be defined on the component definition (see below)
      # a field consists of a top-level named object and a child value which may be a simple string,
      # or something more complex for fields like images
      titleField:
        value: Page Title
      imageField:
        value:
          src: "/assets/img/logo.png"
          alt: Logo
    # A component can itself expose placeholders (for example, Heading might expose 'appname-heading-content') that contain more components
    # Child placeholders are defined hierarchically under the component that exposes them
    placeholders: 
      appname-heading-content:
      - componentName: ContentComponentSample
        fields:
          # ...
```

Here's an equivalent in JSON:

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

Component content is a way to share components between routes. A typical scenario for using component content might be sketching out a JSS site with only _lorem ipsum_ text and FPO (for placement only) images and therefore not wanting to maintain many copies of the same component. Or that there are pieces of content shared across multiple routes.

Component content is organized in a similar folder structure to routes (`/data/component-content`), with the same folder-and-language naming convention. Conventionally you should store component content under a folder named for its component that it defines. For example, `/data/component-content/<ComponentName>/id/en.yml`.

The content of a shared component looks exactly like a component added directly to a route, _except that you must specify an **id** and a **name** attribute so it can be referred to_. The ID value must be unique across the entire JSS application.

```yaml
/data/component-content/Heading/fpo-heading/en.yml

id: fpo-heading
name: FPO Fake Heading
componentName: Heading
fields:
  titleField:
    value: Page Title
```

Using the shared component on routes is very simple: you add a component to a placeholder. Instead of specifying a `componentName` and `name`, you specify _only the `id`_:

```yaml
/data/routes/en.yml

name: home
placeholders:
  appname-main:
  - id: fpo-heading
```

In the previous example, we reference the`fpo-heading` on the home route. All of its data is expanded into the home route layout. 

Another way to reference content that takes effect when you import the site into Sitecore is copying. When you import a reference like `fpo-heading`, in Sitecore, all usages of that reference are placed in a single content item. It facilitates sharing content (such as copyright). 

> A bad practice is to use references to repeat _lorem ipsum_ content on a multicolumn promo, tabs, or carousel. In such case, when imported, the final content will _not_ be shared and should be unique. 

To reference content when importing the site into Sitecore through copyuing simply add `copy: true` to your ID reference:

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

With setup defined here, the two tabs are shared _while disconnected_. When imported to Sitecore, they become separate items that you can change independently.

### Content

It's possible to define content items that are neither routes nor shared component content. Examples include items that contain content for static items or items that are shared options for multi-list fields in content. See the [route data](/docs/techniques/working-disconnected/manifest-api).

Content items work exactly like component content, with two exceptions:

* Instead of `componentName`, specify `template`.
* You store definitions for content items in `/data/content`.

### Dictionary

JSS allows you to develop multilingual applications while disconnected. A common requirement in multilingual applications is to have a _dictionary_ that translates non-content text elements such as form labels or global elements.

JSS sample applications define their dictionaries under `/data/dictionary` - a single file per language, such as `en.yaml` or `es-MX.json`, is added with a simple mapping between dictionary key and value:

```yaml
/data/dictionary/es-MX.yaml

Login: Iniciar sesión
Close: Cerca
LoginFailed: Nombre de usuario y / o contraseña inválido.
```

## The Manifest JavaScript API

JSS generates the manifest by reading the YAML or JSON manifest data files described earlier, then adding them to a JavaScript API that generates the manifest. Therefore, should you wish to, you could replace the JSON or YAML files with direct JS API calls. 

The sample apps use the convention of the `/data` folder as a convention only - the actual manifest is created using the manifest source files in `/sitecore/definitions/*.sitecore.js`. These manifest definition files use helper libraries to crawl the YAML/JSON files and add them to the JS manifest object. You can extend or replace the `/data` convention, if you wish to.

Some manifest items, components, and placeholders are usually defined using the JS API directly.

### Components

You must define each frontend component added to a _route_, so that JSS can register the component within Sitecore and provide the appropriate infrastructure to give it the necessary content.

Component definitions are conventionally stored in `/sitecore/definitions/components/<ComponentName>.sitecore.{js|ts}`. The `.sitecore` in the name is mandatory.

Here's a sample component definition:

```js
/*
NOTE: if you use an editor, such as VS Code, that reads typings data from imported libraries, you will receive code completion hints for the manifest definitions.
*/
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

Defining placeholders explicitly in the manifest is optional. Any placeholder name referred to by a route will be automatically known by the manifest. However, explicitly registering a placeholder allows you to set a display name for it so that content editors can see something friendlier than `appname-content-leftside-upsidedown-2`.

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

Once defined, you must generate the manifest to create the complete manifest definition (normally emitted to `/sitecore/manifest` in your app). You can make a manifest standalone with the `jss manifest` CLI command. However, unless you're debugging the manifest contents, it's more common that JSS generates the manifest: 
  - during the startup of the disconnected dev server (`jss start`) or,
  - during a deployment (`jss deploy items`).

When the manifest generation process executes in any of these scenarios:

1. JSS locates all `/sitecore/definitions/*.sitecore.{js|ts}` manifest files in your application. We use this naming convention for files that the manifest should include.
2. JSS iterates over the manifest files, invoking the `default` export of each file. The `default` export is expected to be a `function` with the signature: `function(manifest) { }`.
3. Each `.sitecore.{js|ts}` file invokes various methods on the `manifest` instance received by the `default` function, such as `addComponent` or `addRoute`.
4. After processing all `.sitecore.{js|ts}` files, JSS generates the manifest output through a series of pipelines and write the output to `/sitecore/manifest` or to the console (with `--manifestOutputPath console`).

> The manifest generation process supports transpiled (ES6/TypeScript) manifest sources. In the sample apps, you can find the transpilers' default settings in `/sitecore/definitions/config.js`. You can override this path with the `--require` argument to the CLI command that generates the manifest.

## Reference

### CLI

Use `jss manifest --help` for the latest documentation. Note that arguments to `jss manifest` are also valid when used with `jss package` or `jss deploy items`, which imply manifest generation by default (unless you use `--skipManifest`).