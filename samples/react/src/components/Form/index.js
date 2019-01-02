import React from 'react';
import {
  serializeForm,
  submitForm,
  // eslint-disable-next-line no-unused-vars
  SitecoreForm,
  // eslint-disable-next-line no-unused-vars
  FormField,
  instanceOfValueFormField,
} from '@sitecore-jss/sitecore-jss-forms';
import fieldFactory from './field-factory';
import { sitecoreApiHost, sitecoreApiKey } from '../../temp/config';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      nextForm: null,
      submitButton: null,
    };

    this.createFieldComponent = this.createFieldComponent.bind(this);
    this.getCurrentFieldData = this.getCurrentFieldData.bind(this);
  }

  render() {
    /** @type {SitecoreForm} */
    const form = this.state.nextForm || this.props.fields;

    const fieldComponents = form.fields.map(this.createFieldComponent);

    return (
      <form
        action={`${sitecoreApiHost}/api/jss/formbuilder?fxb.FormItemId=${
          form.metadata.itemId
        }&fxb.HtmlPrefix=${form.htmlPrefix}&sc_apikey=${sitecoreApiKey}`}
        method="POST"
        onSubmit={this.onSubmit.bind(this)}
      >
        {fieldComponents}
      </form>
    );
  }

  /**
   * Creates a field component to render a field based on the form schema data
   * @param {FormField} field
   */
  createFieldComponent(field) {
    return fieldFactory(field, {
      field,
      key: field.model.itemId,
      onChange: this.onFieldChange.bind(this),
      onButtonClick: this.onButtonClick.bind(this),
      fieldFactory: this.createFieldComponent,
      ...this.getCurrentFieldData(field),
    });
  }

  /**
   * Acquires the current form field state for a single field.
   * This state can come from two possible sources:
   * - The form schema/current data (default values, previously saved steps in multistep)
   * - This component's state (the mutated state of the field after user changes)
   * The field state includes both current value as well as current validity.
   * @param {FormField} field */
  getCurrentFieldData(field) {
    if (!instanceOfValueFormField(field)) return null;

    const fieldName = field.valueField.name || null;

    if (!fieldName) {
      return null;
    }

    const result = {
      isValid: true,
      errors: [],
    };

    const fieldState = this.state[fieldName];
    if (fieldState) {
      let fieldValue = null;

      if (typeof fieldState.value !== 'undefined') {
        fieldValue = fieldState.value;
      } else if (typeof field.model.value !== 'undefined' && field.model.value !== null) {
        fieldValue = field.model.value;
      } else {
        fieldValue = '';
      }

      result.value = fieldValue;
      result.isValid = fieldState.isValid;
      result.errors = fieldState.errors || [];
    } else {
      result.value = field.model.value || '';
    }

    return result;
  }

  /**
   * Handler triggered by child components that informs us which button triggered a submit.
   * This is important for multistep forms to disambiguate between back and next/submit buttons.
   */
  onButtonClick(buttonName) {
    this.setState({ submitButton: buttonName });
  }

  /**
   * Handler triggered by child components that updates a given field's current value
   * (which we then push back down to the child via prop)
   * @param {string} key Field's name attribute
   * @param {string} value New field value
   * @param {boolean} isValid Whether the field is valid or not
   * @param {string[]} errors Validation error message(s) if field is invalid
   */
  onFieldChange(key, value, isValid, errors) {
    this.setState({
      [key]: { value, isValid, errors },
    });
  }

  /**
   * Handler triggered when the form is submitted. May transition its state between
   * steps in a multistep form or handle a final submit.
   */
  onSubmit(e) {
    e.preventDefault();

    /** @type {SitecoreForm} */
    const form = this.state.nextForm || this.props.fields;

    const fieldValues = {};

    // ensure validity
    let valid = true;
    Object.keys(this.state).forEach((fieldName) => {
      const fieldState = this.state[fieldName];

      if (!fieldState || typeof fieldState.isValid === 'undefined') return;

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

    // serialize the form data that we got from the server
    // (hidden fields with constant values, etc)
    const formData = serializeForm(form, this.state.submitButton);

    // merge in user-updated field values
    formData.mergeOverwritingExisting(fieldValues);

    const submitUrl = e.target.action;

    submitForm(formData, submitUrl)
      .then((result) => {
        if (result.success && result.redirectUrl) {
          // NOTE: this should probably be a router push in most cases
          window.location = result.redirectUrl;
        }

        if (result.validationErrors) {
          const stateUpdate = { ...result.validationErrors };
          Object.keys(stateUpdate).forEach((fieldKey) => {
            stateUpdate[fieldKey] = {
              value: (this.state[fieldKey] || {}).value,
              isValid: false,
              errors: stateUpdate[fieldKey],
            };
          });

          this.setState(stateUpdate);
        }

        if (result.nextForm) {
          this.setState({ nextForm: result.nextForm });
        }

        if (result.success) {
          this.resetFieldsState();
        }
      })
      .catch((error) => alert(`Oh no! ${error}`));
  }

  /**
   * Removes the current fields' mutated state from this.state,
   * which prevents validation issues and mutable field state from following us
   * across steps in a multistep form.
   */
  resetFieldsState() {
    const keys = Object.keys(this.state).filter(
      (key) => key !== 'nextForm' && key !== 'errors' && key !== 'submitButton'
    );
    const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
    this.setState({ ...stateReset, errors: [] });
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
