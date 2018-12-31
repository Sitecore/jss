import React from 'react';
import { serializeForm } from '@sitecore-jss/sitecore-jss-forms';
import fieldFactory from './field-factory';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // TODO HACK
    this.endpointHack = 'http://jssreactweb/api/jss/formbuilder';
  }

  render() {
    const form = this.props.fields;

    const fieldComponents = form.fields.map((field) =>
      fieldFactory(field, {
        field,
        value: this.getCurrentFieldValue(field),
        key: field.model.itemId,
        onChange: this.onFieldChange.bind(this),
        onSubmit: this.onSubmit.bind(this),
      })
    );

    return (
      <form
        action={`${this.endpointHack}?fxb.FormItemId=${form.metadata.itemId}&fxb.HtmlPrefix=${
          form.htmlPrefix
        }`}
        method="POST"
        onSubmit={this.onSubmit.bind(this)}
      >
        {fieldComponents}
      </form>
    );
  }

  getCurrentFieldValue(field) {
    const fieldName = (field.valueField && field.valueField.name) || null;

    if (!fieldName) {
      return null;
    }

    return (this.state[fieldName] && this.state[fieldName].value) || field.model.value;
  }

  onFieldChange(key, value, isValid) {
    this.setState({
      [key]: { value, isValid },
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const form = this.props.fields;

    const fieldValues = {};

    // ensure validity
    let valid = true;
    Object.keys(this.state).forEach((fieldName) => {
      const fieldState = this.state[fieldName];
      if (!fieldState.isValid) {
        valid = false;
      }

      fieldValues[fieldName] = fieldState.value;
    });

    if (!valid) {
      // eslint:disable-next-line
      alert('Form was not valid, cannot submit yet');
      return;
    }

    const formData = serializeForm(form);

    formData.mergeOverwritingExisting(fieldValues);

    // eslint-disable-next-line prettier/prettier
    const submitUrl = e.target.action;

    console.log(formData.get(), submitUrl);
    fetch(submitUrl, { 
      body: formData.toUrlEncodedFormData(), 
      method: 'post', 
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    .then(r => {console.log(r); return r.text() })
      .then(r => console.log(r))
    .then(() => alert('pow!'));
  }
}

// TODO: just here to look nice temporarily
function Hack(props) {
  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      label { display: block }
    `,
        }}
      />
      <Form {...props} />
    </React.Fragment>
  );
}
export default Hack;
