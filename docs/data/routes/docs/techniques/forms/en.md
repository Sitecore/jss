---
name: forms
routeTemplate: ./data/component-templates/article.yml
title: Forms + JSS
---
# Sitecore Forms + JSS

JSS provides the capability to consume and post [Sitecore Forms](https://doc.sitecore.com/users/91/sitecore-experience-platform/en/introducing-sitecore-forms.html) from JSS apps. Sitecore Forms is a capable form-authoring framework that enables marketers to author their own forms, collect data, and analyze form performance.

Usage of Sitecore Forms in JSS works like this:

![forms service sequence diagram](/assets/img/jss-forms-sequence.svg)

## Getting Started

This document assumes you are familiar with JSS fundamentals and have a React-based JSS app that you have set up and deployed to Sitecore. It is not possible to use Sitecore Forms in disconnected mode.

### Creating a Sitecore Form

To use a form in JSS, the form must be created in Sitecore. The [Sitecore Forms documentation](https://doc.sitecore.com/users/91/sitecore-experience-platform/en/create-a-form.html) details how to create forms within Sitecore.

For the sake of simplicity, consider starting off with a simple form with a text box and submit button. It's helpful to set the _submit actions_ on the submit button to _Save Data_ and _Redirect to Page_ - without Save Data the form data won't be stored, and without Redirect to Page the form will clear itself on submit but not provide other feedback. Note that in a JSS app, _Redirect to Page_ can easily be accomplished with client-side routing - it need not be an actual reload of the page.

### Creating a Form Rendering component for your JSS App

> JSS comes with a **React** example of consuming the forms API. It is possible to consume the forms schema data with other frameworks as well, but example components are not provided.

In order to add a form to the JSS app we need a component to render the form. A form rendering component is a normal JSS component, but since disconnected mode is not supported for forms we'll create it Sitecore-first.

* Create the component definitions in Sitecore using the JSS CLI: `jss deploy component Form --allowedPlaceholders jss-main`
    * Change the allowed placeholder to the placeholder name you want to allow the form to be added to.
* Enter the Sitecore Content Editor
    * Navigate to the rendering item that was created (`/sitecore/layout/Renderings/Project/$yourappname/Form`)
    * Set the `Datasource location` field to `/sitecore/forms`
    * Set the `Datasource template` field to `/sitecore/templates/System/Forms/Form`
    * Set the `Rendering Contents Resolver` field to `Sitecore Forms Resolver`. This will cause JSS to deliver form data to the component instead of item data.

### Add the Form Rendering to an app route

* Enter Experience Editor on the JSS route item you wish to add the form to
* Insert the new `Form` component into the placeholder it is allowed in
* Choose the Sitecore Form you created previously as the Associated Content
* NOTE: you will see a warning that the component is missing its implementation. This is normal - we haven't yet defined what the form looks like.

### Install NPM packages

> There are two npm packages for JSS + Forms
> * `sitecore-jss-react-forms` implements components to render forms in React
> * `sitecore-jss-forms` implements framework-agnostic helpers to deal with the forms API (serializing forms to post, antiforgery, etc)
> 
> These packages ship with TypeScript typings and JSDoc comments so they are easily discoverable in typings-aware editors such as Code.

To use the sample forms implementation, install the forms packages: 
* `npm i @sitecore-jss/sitecore-jss-forms`
* `npm i @sitecore-jss/sitecore-jss-react-forms`

### Implement the Form React component

To make the form render as a form, we need to tell React how to render the Sitecore Forms schema.

* Create a new React component in `src/components/Form/index.js`
* Set the contents to:

```jsx
import React from 'react';
import { SitecoreForm } from '@sitecore-jss/sitecore-jss-forms';

export default function Form(props) {
  /** @type {SitecoreForm} */
  const form = props.fields;

  // dump the form data out to the page
  return <code>{JSON.stringify(form, null, 2)}</code>;
}
```

* Start the JSS app in connected mode with `jss start:connected`
* You should see the form data dumped to the page as JSON

### Use the sample JSS forms implementation

Sitecore provides a sample implementation of rendering this form data into a usable React form for your reference and modification. The sample implementation provides a native React state-based implementation using controlled form components. It supports client and server side validation and multistep forms.

To use the example React forms implementation, modify your Form component to use the library's form components:

```jsx
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { sitecoreApiHost, sitecoreApiKey } from '../../temp/config';

const JssForm = ({ fields, history }) => (
  <Form
    form={fields}
    sitecoreApiHost={sitecoreApiHost}
    sitecoreApiKey={sitecoreApiKey}
    onRedirect={(url) => history.push(url)}
  />
);

export default withRouter(JssForm);
```
#### Customizing sample forms markup

When using the JSS sample forms implementation there are several options to customize the final markup of the form.

##### Altering Field Types

If you'd like to customize how a specific type of field renders in your form, such as Checkbox or Single-Line Text, you can pass your own _field factory_.

Similar to JSS' _component factory_, the field factory maps a given Sitecore Forms field type into an implementing React component. The _default field factory_ is used if no other is passed, and thus the default form field implementations will be used. Here's an example:

```jsx
// start from scratch (empty field factory)
import { FieldFactory } from '@sitecore-jss/sitecore-jss-react-forms';
const custom = new FieldFactory();

// or start from the default components (prefilled default implementations)
import { createDefaultFieldFactory } from '@sitecore-jss/sitecore-jss-react-forms';
const defaultFieldFactory = createDefaultFieldFactory();

// set a component implementation
import { FieldTypes } from '@sitecore-jss/sitecore-jss-react-forms';
defaultFieldFactory.setComponent(FieldTypes.RadioButtonList, (props) => (
  <pre>{JSON.stringify(props, null, 2)}</pre>
));

// use the component factory with the form component
<Form fieldFactory={defaultFieldFactory} {...otherProps} />
```

##### Add a wrapper to all form fields

It's possible to wrap all form fields in a custom component to create wrapping markup, for example to control vertical rhythm. The wrappers will contain both the label and value of the field.

```jsx
// Sample wraps all fields in a div and prints a span with the field name unless the field is a Text field type
const WrapperComponent = (props) => (
  <div>
    {props.field.model.fieldTypeItemId !== FieldTypes.TextField && (
      <span>Field: {props.field.model.name}</span>
    )}
    {props.children}
  </div>
);

// Usage on form component
<Form fieldWrapperComponent={WrapperComponent} {...otherProps} />
```

##### Customizing Labels

You can customize the rendering of field labels. Note that if you are using custom field components (above), those components can ignore the custom label component if they choose to not use the `labelComponent` prop they receive.

> The customized label is used only for the primary field label. Checkbox lists and radio button lists will not use this component for the individual labels wrapping each list element.

```jsx
// sample renders labels in blue
import { LabelProps } from '@sitecore-jss/sitecore-jss-react-forms';

/**
 * @param {LabelProps} props
 */
const LabelComponent = (props) => (
  <label
    className={props.field.model.cssClass}
    htmlFor={props.field.valueField.id}
    style={{ color: 'blue' }}
  >
    {props.field.model.title}
  </label>
);

// Usage on form component
<Form labelComponent={LabelComponent} {...otherProps} />
```

##### Customizing Error Handling

You can customize the behaviour of the _form-wide_ error message display, i.e. for submit errors or to summarize validation errors.

```jsx
// sample renders only form-level errors (field errors are ignored)
const ErrorComponent = (props) => (
  <div>
    {props.formErrors.map((e, index) => (
      <div className="invalid" key={`formError-${index}`}>
        {e}
      </div>
    ))}
  </div>
);

// Usage on form component
<Form fieldWrapperComponent={WrapperComponent} {...otherProps} />
```

You can also customize the default _field-level_ error message display for validation errors.

```jsx
// sample renders validation errors with inline style
import { LabelProps } from '@sitecore-jss/sitecore-jss-react-forms';

/**
 * @param {LabelProps} props
 */
const FieldErrorComponent = (props) => (
  <div>
    {props.errors.map((error, index) => (
      <p style={{ color: 'red', fontWeight: 'bold' }} key={index}>
        {error}
      </p>
    ))}
  </div>
);

// Usage on form component
<Form fieldValidationErrorsComponent={FieldErrorComponent} {...otherProps} />
```

### Limitations

There are some limitations to be aware of with JSS' Sitecore Forms support.

* Forms cannot be defined or rendered in disconnected mode (connected, integrated, or headless modes are supported)
* Conditional fields are not supported by the JSS forms example implementation; however conditional data is returned by the form API
