---
name: manifest-api
routeTemplate: ./data/component-templates/article.yml
title: Manifest API Reference
---

# Manifest API Reference

The manifest API is used to define the structure of your JSS site while it is disconnected, so that it can be later imported into Sitecore.

## Defining Route data

Route data is used to represent the routes served by your app when running in _disconnected mode_. The `Placeholder` component, and any components that it renders, expect route data to adhere to a specific schema - outlined in the [Reference](#reference) below.

For disconnected development, route data is typically retrieved from static YAML or JSON files, or simple JavaScript files. For connected development or production, the route data is retrieved using calls to the Sitecore [Layout Service](/docs/fundamentals/services/layout-service) (via HTTP, or in-process for integrated mode SSR).

The sample apps define route data in `/data/routes` by using [YAML](https://en.wikipedia.org/wiki/YAML) files. You can choose to use JSON files instead if you prefer that format (just rename the file to .json and run the content through a [YAML-to-JSON converter](https://jsonformatter.org/yaml-to-json)). YAML supports comments, multiline values, and other niceties that make the content authoring experience a bit nicer.

Refer to the [Working Disconnected](/docs/techniques/working-disconnected/disconnected-overview) documentation for more details about how the route data is built and consumed.


## Field Values

### `editable` values

The Layout Service emits `field` data in two formats:
```javascript
fields: {
  [fieldName]: {
    value: '',
    editable: '',
  }
}

```

#### value

The `value` property of a `field` object contains the "raw", unrendered value of a field stored in Sitecore.

The exception is `Image` fields and `Link` fields. The `value` property of an `Image` field is an object containing attributes for the image, e.g. `src`, `alt`, `width`, `height`.

#### editable

The `editable` property of a `field` object will contain the result of the `renderField` pipeline for the given field. As you might expect, this means `editable` may contain a different value depending on whether or not the Layout Service data are retrieved with Experienced Editor (EE) active.

When EE is active, `editable` will contain all of the additional markup that EE emits for a field.

When EE is not active, `editable` will contain the rendered field value - which may differ from the "raw" field value for certain field types (e.g. `Image`, `Rich Text`, `Link`) or if the `renderField` pipeline has been extended / customized.

## Params

There are times when your components will need to receive values that aren't stored as fields on a data source item. In these cases, rendering parameters can be used.

Rendering parameters are exposed via a `params` object on your component props data:

```javascript
{
  name: 'my-route',  
  placeholders: {
    jss-main: [
      {
        componentName: 'my-component',
        params: {
          paramName: 'paramValue'
        }
      }
    ]
  }
}
```

> Note: param values may be defined in route data as any JS object type (i.e. number, boolean) but _all param values are strings_ when they are received by components to render.

Your component would then receive the `params` object via `props`, e.g. `props.params.paramName`.

As part of the [manifest generation](/docs/techniques/working-disconnected/disconnected-overview) process, your `params` data can be mapped to component objects you add to the manifest.

See [import details](/docs/techniques/working-disconnected/import-process) for details on how to specify `id` properties for any object.

#### Example
```javascript
{
  name: 'home',
  displayName: 'Home',
  placeholders: {
    jss-main: [
      {
        componentName: 'Welcome',
        fields: {
          title: {
            value: 'Sitecore Experience Platform + JSS',
          },
          text: {
            value: '<p>...</p>',
          },
          logoImage: {
            value: {
              src: '/assets/img/sc_logo.png',
              alt: 'Logo'
            },
          },
        },
        params: {
          titleColor: "#000000",
        },
        placeholders: {

        }
      }
    ]
  },
  children: [
    // additional route objects
  ]
}
```

# Creating and Using Fields on Routes

By default, all the imported fields in a JSS app are placed in what Sitecore calls *data sources*. These are data items which are referenced in the layout of the route item. The route item itself does not contain any of its own fields by default. To add fields to an item, you need to do it on a *data template*. JSS allows you to define fields for custom "route types" which will be imported as new data templates. You can also simply utilize fields from route data templates created in Sitecore, if you are not utilizing a code-first workflow.

There may be situations in which you wish to add and use fields directly on the route:

* Fields which you need to utilize outside of `Placeholder`-managed components, such as header metadata or data in other staticly-placed components
* Content or data which you might want to utilize throughout the components in a route, rather than just in a single component
* You wish to add default layout to a route template on its *standard values* (currently this must be done in Sitecore itself)
* Other advanced data modeling scenarios

> Note for Sitecore devs and admins: The JSS import process will always generate a route template for each app. This template is the default route template, but is also automatically set as a base template for any route types defined in the app manifest.

## Creating a Route Type

In the `*.sitecore.js` manifest generator where you define/add your routes (or in a new one if you like), use the `addRouteType` function to add a route type with a `name` and `fields`.

```javascript
manifest.addRouteType({
name: 'MyRoute',
fields: [
    { name: 'metaTitle', displayName: 'Meta Title', type: manifest.fieldTypes.singleLineText },
    { name: 'titleText', displayName: 'Body Title', type: manifest.fieldTypes.singleLineText },
    { name: 'body', displayName: 'Body Text', type: manifest.fieldTypes.richText }
]
});
```

> Fields are defined in the same manner as they are in a component.

When defining your route, you will need to add a `template` property which matches the route name. If you are pulling route data from files, you may want to apply this dynamically, especially if all your routes utilize the same type. (See `routes.sitecore.js`).

```json
{
  "name": "route",
  "template": "MyRoute",
  "displayName": "Route",
  "placeholders": {
      // ...
  }
```

On your next import, the route type *data template* will be created and any newly created routes will utilize the data template.

> *IMPORTANT*: Any existing routes will not have their *data template* changed during the import process. You will need to either manually delete them or change their template in Sitecore (or utilize Full Wipe mode during development).

## Mock the Route Data

To mock route-level fields, you can simply add a `fields` property to your route data.

```json
{
  "name": "route",
  "template": "MyRoute",
  "displayName": "Route",
  "fields": {
    "metaTitle": "My Route",
    "titleText": "My Route",
    "body": "Lorem ipsum dolor sit"
  },
  "placeholders": {
      // ...
  }
```

### Manifest API instance methods

* `addComponent(...components: component[])`: registers a JSS app component definition
* `addContent(...contents: content[])`
* `addRoute(...routes: route[])`: adds an app route data definition
* `addRouteType(...routeTypes: template[])`: adds a Sitecore template type for a route
* `addTemplate(...templates: template[])`

### Manifest objects

> Note: using an editor that understands JS typings (such as VS Code) will cause manifest objects to have type information within the editor including helpful annotations, which is highly recommended.

- [component](#component)
- [content](#content)
- [field](#field)
- [CommonFieldTypes](#fieldtypes)
- [param](#param)
- [placeholder](#placeholder)
- [placeholders](#placeholders)
- [route](#route)
- [template](#template)
- [fields](#fields)
- [params](#params)

#### component

```javascript
{
  id: string:optional,
  name: string:required,
  displayName: string:optional,
  fields: fields:optional,
  params: params:optional,
  placeholders: placeholders:optional, // placeholders exposed by rendering
  allowedPlaceholders: array[string]:optional, // placeholders component is allowed in (normally inferred by route data)
  displayFieldEditorButton: boolean:optional = true,
  fieldEditorFields: array[string]:optional = all fields, // field names
  customExperienceButtons: array[string]:optional, // names or IDs
  insertOptions: array[string]:optional, // template names or IDs
  graphQLQuery: string:optional, // see GraphQL integrated documentation
  // note: while these use the same structure as a route, they do not use placeholders and are not mapped as routes. 
  // This enables adding child items to the datasource.
  children: array[route] 
}
```

> The `displayFieldEditorButton` and `fieldEditorFields` properties allow controlling the behavior of the *Field Editor* button that will automatically be added to the component in the Sitecore Experience Editor. This button allows editing all the component data in a popup form interface. By default, all components will display the button, and all component fields will be editable. You do not need to supply either property if this is the desired behavior.

#### content

Content data uses the same schema as [route data](/docs/techniques/working-disconnected/manifest-api), except that the `placeholders` property is generally not used as it would have no effect.

#### field

> For the `type` property, it is recommended to use one of the available [`CommonFieldTypes`](/docs/techniques/working-disconnected/disconnected-overview#fieldtypes) values.

```javascript
{
  name: string:required,
  type: string|CommonFieldTypes:required,
  displayName: string:optional,
  required: bool:optional,   // whether the field must have a value entered
  validationPattern: string:optional, // regular expression (C#) to determine value validity
  validationMessage: string:optional, // message shown when validationPattern fails
  standardValue: string:optional, // the default value this field gets when a content editor creates a new item using it
  section: string:optional, // Sitecore template section name
  source: string:optional,  // Sitecore template field source (field-type specific)
  sortOrder: int:optional,  // Template field sort order. Defaults to order defined in JSON.
  storage: string:optional,  // Sitecore field storage: versioned (default), unversioned, shared (DO NOT CHANGE AFTER IMPORTED)
  id: string:optional
}
```

#### CommonFieldTypes

```javascript
{
  SingleLineText: 'Single-Line Text',
  MultiLineText: 'Multi-Line Text',
  RichText: 'Rich Text',
  ContentList: 'Treelist',
  ItemLink: 'Droptree',
  GeneralLink: 'General Link',
  Image: 'Image',
  File: 'File',
  Number: 'Number',
  Checkbox: 'Checkbox',
  Date: 'Date',
  DateTime: 'Datetime',
}
```

> For custom Sitecore field types or other types not in the `CommonFieldTypes` enumeration, the string of their field type name in Sitecore (i.e. `Single-Line Text`) can be passed. Editors that support type annotations, like VS Code, will provide auto-completion on this enum.

#### param

```javascript
{
  name: string:required
}
```

#### placeholder

```javascript
{
  name: string:required,
  displayName: string:optional
}
```

#### placeholders

```javascript
{
  placeholderName: array[component]:optional,
  // additional placeholder key/values can be added
}
```

#### route
```javascript
{
  id: string:optional,
  name: string:required,
  displayName: string:optional,
  template: string:optional, // note: this is optional in yaml/json as its defaulted before adding to manifest
  fields: fields:optional,
  children: array[route]:optional,
  placeholders: placeholders:optional,
  insertOptions: array[string]:optional,
}
```

#### template

```javascript
{
  name: string:required,
  displayName: string:optional,
  inherits: array[string]:optional, // names of JSS template(s) to inherit from, OR Sitecore item GUIDs for non-JSS templates
  fields: array[field]:optional,
  icon: string:optional, // e.g. People/16x16/alarmclock.png
  defaultWorkflow: string:optional // e.g. /sitecore/system/Workflows/Sample Workflow
}
```

#### fields

```javascript
{
  fieldName: object[fieldName] = field:required
  // additional field key/values can be added, see the following
}
```

#### params
```javascript
{
  paramName: array[string]:required,
  // additional param key/values can be added
  // note: all param values are provided to the component as strings,
  // even if the defined value is a number/boolean value.
}
```

##### imageFieldValue

The image field value is used when a `field` is an image type. It has additional properties compared to a normal field.

```javascript
{
  id: string:optional,
  src: string:required,         // src of image. Should be under /sitecore/media on the JSS app.
  alt: string:required,
  displayName: string:optional, // media item display name
  title: string:optional,       // media item field
  keywords: string:optional,    // media item field
  description: string:optional, // media item field
  width: int:optional,
  height: int:optional,
  class: string:optional        // rendered image CSS class

}
```

##### linkFieldValue

The link field value is used when a `field` is a link type. It has additional properties compared to a normal field.

```javascript
{
  href: string:required,
  text: string:optional,        // link body text
  class: string:optional,       // rendered <a> css class
  target: string:optional,      // target attribute e.g. _blank
  title: string:optional        // title attribute of <a>
}
```

##### multilistFieldValue

Sitecore multilist fields can be defined by specifying the item definitions that are selected in the multilist (as an array),
or by using ID references to pull in items defined in a shared content area (or explicit GUIDs to refer to non-app items in Sitecore)

```javascript
// definition using array of content items (routes without placeholders)
[route]:required

// complete example including the top level fields (YAML):
fields:
  multilistFieldName:
  - name: Option1
    fields:
      title:
        value: Hello
  - name: Option2
  # ...

// or define it using ID references to shared content items (also YAML):
fields:
  multilistFieldName:
  - id: option-1
  - id: option-2
  # ...
```

##### Handling date field values

Date fields' values in the manifest are formatted using [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) formatted strings, for example `2012-04-23T18:25:43.511Z`. 

> Note: this is a JavaScript date format, and is different from how Sitecore stores date field values internally. Sitecore-formatted dates _will not work._
