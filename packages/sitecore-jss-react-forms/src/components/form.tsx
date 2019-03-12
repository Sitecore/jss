import React, { FormEvent, ComponentType, Component } from 'react';
import {
  serializeForm,
  submitForm,
  instanceOfValueFormField,
  getFieldValueFromModel,
  SitecoreForm,
  FormField,
  FormTracker,
  FormFetcher,
  TrackerFetcher,
} from '@sitecore-jss/sitecore-jss-forms';
import FieldFactory from '../field-factory';
import { FieldWithValueProps, LabelProps } from '../FieldProps';
import DefaultFieldFactory from '../default-field-factory';
import { DefaultError } from './default-error';

export interface ErrorComponentProps {
  form: SitecoreForm;
  formErrors: string[];
  fieldErrors: Array<{ fieldName: string, state: FieldState }>;
}

export interface FormProps {
  form: SitecoreForm;
  fieldFactory?: FieldFactory;
  sitecoreApiHost: string;
  sitecoreApiKey: string;
  onRedirect?: (url: string) => void;
  errorComponent?: ComponentType<ErrorComponentProps>;
  fieldWrapperComponent?: ComponentType<FieldWithValueProps<any>>;

  /** Optionally override the label component for any field components that render a label */
  labelComponent?: ComponentType<LabelProps>;

  /** Optionally override the field validation errors display component for any field components that render validation errors */
  fieldValidationErrorsComponent?: ComponentType<LabelProps>;

  /** Fetch function used when submitting the form (defaults to using `fetch`) */
  formFetcher?: FormFetcher;

  /** Fetch function used when posting form field tracking data (defaults to using `fetch`) */
  trackerFetcher?: TrackerFetcher;
}

export interface FieldState {
  value?: string | string[] | boolean;
  isValid: boolean;
  errors: string[];
}

export interface FormState {
  errors: string[];
  nextForm: SitecoreForm | null;
  submitButton: string | null;
}

export interface FieldStateCollection {
  [key: string]: FieldState;
}

export class Form extends Component<FormProps, FormState & FieldStateCollection> {
  private _tracker: FormTracker;

  constructor(props: FormProps) {
    super(props);

    this.state = {
      errors: [],
      // in a multistep form the server can reset the form schema
      // to display further steps; this state property overrides
      // the form passed in from props if present
      nextForm: null,
      submitButton: null,
    } as any; // workaround index type limitations in TS

    this.createFieldComponent = this.createFieldComponent.bind(this);
    this.getCurrentFieldState = this.getCurrentFieldState.bind(this);
    this.collectCurrentFieldValues = this.collectCurrentFieldValues.bind(this);

    this._tracker = new FormTracker({
      endpoint: `${this.props.sitecoreApiHost}/api/jss/fieldtracking/register?sc_apikey=${this.props.sitecoreApiKey}`,
      fetcher: this.props.trackerFetcher,
    });
  }

  render() {
    const form = this.state.nextForm || this.props.form;

    if (!form) {
      return (<div>No form data was provided. Need to set a datasource?</div>);
    }

    const action = `${this.props.sitecoreApiHost}/api/jss/formbuilder?fxb.FormItemId=${form.metadata.itemId}&fxb.HtmlPrefix=${form.htmlPrefix}&sc_apikey=${this.props.sitecoreApiKey}`;

    this._tracker.setFormData(form.formItemId.value, form.formSessionId.value, form.metadata.isTrackingEnabled);

    const fieldComponents = form.fields.map(this.createFieldComponent);
    const ErrorComponent = this.props.errorComponent || DefaultError;
    const fieldErrors = this.collectCurrentFieldValues().filter(field => !field.state.isValid);

    return (
      <form action={action} method="POST" onSubmit={this.onSubmit.bind(this)}>
        <ErrorComponent form={form} formErrors={this.state.errors} fieldErrors={fieldErrors} />
        {fieldComponents}
      </form>
    );
  }

  /**
   * Creates a field component to render a field based on the form schema data
   */
  createFieldComponent(field: FormField): React.ReactNode {
    const props = {
      field,
      key: field.model.itemId,
      onChange: this.onFieldChange.bind(this),
      onButtonClick: this.onButtonClick.bind(this),
      fieldFactory: this.createFieldComponent,
      fieldValidationErrorsComponent: this.props.fieldValidationErrorsComponent,
      labelComponent: this.props.labelComponent,
      tracker: this._tracker,
      ...this.getCurrentFieldState(field),
    } as FieldWithValueProps<any>;

    const component = (this.props.fieldFactory || DefaultFieldFactory).get(field, props);

    if (this.props.fieldWrapperComponent) {
      const Wrapper = this.props.fieldWrapperComponent;
      return <Wrapper {...props}>{component}</Wrapper>;
    }

    return component;
  }

  /**
   * Acquires the current form field state for a single field.
   * This state can come from two possible sources:
   * - The form schema/current data (default values, previously saved steps in multistep)
   * - This component's state (the mutated state of the field after user changes)
   * The field state includes both current value as well as current validity.
   */
  getCurrentFieldState(field: FormField) {
    // non-valued fields, i.e. text, section, do not have a value or validity state
    if (!instanceOfValueFormField(field)) {
      return null;
    }

    const fieldName = field.valueField.name || null;

    if (!fieldName) {
      return null;
    }

    const fieldState = this.state[fieldName];

    // field has a value in react state i.e. due to user change
    if (fieldState) {
      const result: FieldState = {
        isValid: fieldState.isValid,
        errors: fieldState.errors || [],
      };

      if (typeof fieldState.value !== 'undefined') {
        // field state from changed field value (in this.state)
        result.value = fieldState.value;
      } else {
        result.value = getFieldValueFromModel(field);
      }

      return result;
    }

    // default state from form API model
    return {
      isValid: true,
      errors: [],
      value: getFieldValueFromModel(field),
    };
  }

  /**
   * Handler triggered by child components that informs us which button triggered a submit.
   * This is important for multistep forms to disambiguate between back and next/submit buttons.
   */
  onButtonClick(buttonName: string) {
    this.setState({ submitButton: buttonName });
  }

  /**
   * Handler triggered by child components that updates a given field's current value
   * (which we then push back down to the child via prop)
   * @param key Field's name attribute
   * @param value New field value
   * @param isValid Whether the field is valid or not
   * @param errors Validation error message(s) if field is invalid
   */
  onFieldChange(key: string, value: string | string[], isValid: boolean, errors: string[]) {
    this.setState({
      [key]: { value, isValid, errors },
    });
  }

  /**
   * Handler triggered when the form is submitted. May transition its state between
   * steps in a multistep form or handle a final submit.
   */
  onSubmit(e: FormEvent) {
    e.preventDefault();

    const form = this.state.nextForm || this.props.form;

    const fieldValues: { [key: string]: string | string[] | boolean } = {};

    const currentFieldValues = this.collectCurrentFieldValues();

    currentFieldValues.forEach(field => {
      if (typeof field.state.value !== 'undefined') {
        fieldValues[field.fieldName] = field.state.value;
      }
    });

    // NOTE: we're not pre-validating the submit on the client because
    // Sitecore won't be able to track validation errors in xConnect

    // serialize the form data that we got from the server
    // (hidden fields with constant values, unchanged default field values, etc)
    const formData = serializeForm(form, { submitButtonName: this.state.submitButton });

    // merge in user-updated field values
    formData.mergeOverwritingExisting(fieldValues);

    const submitUrl = (e.target as HTMLFormElement).action;

    if (!submitUrl) {
      throw new Error('Submit URL was not defined. Ensure the form has an action attribute.');
    }

    submitForm(formData, submitUrl, { fetcher: this.props.formFetcher })
      .then((result) => {
        if (result.success && result.redirectUrl) {
          // Process redirect-on-success action.
          if (this.props.onRedirect) {
            this.props.onRedirect(result.redirectUrl);
          } else {
            window.location.href = result.redirectUrl;
          }
        }

        if (result.validationErrors) {
          const stateUpdate: FieldStateCollection = {};
          Object.keys(result.validationErrors).forEach((fieldKey) => {
            stateUpdate[fieldKey] = {
              value: (this.state[fieldKey] || {}).value,
              isValid: false,
              errors: result.validationErrors[fieldKey],
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

        if (result.errors && result.errors.length > 0) {
          throw result.errors;
        }

        this.setState({ errors: [] });
      })
      .catch((error: Error | string[] | string) => {
        if (Array.isArray(error)) {
          this.setState({ errors: error });
        } else if (typeof error === 'string') {
          console.log('Form submit error', error);
          this.setState({ errors: [error] });
        } else {
          console.log('Form submit error', error);
          this.setState({ errors: [error.message] });
        }
      });
  }

  collectCurrentFieldValues() {
    return Object.keys(this.state)
      .filter((fieldName) => this.state[fieldName] && typeof this.state[fieldName].isValid !== 'undefined')
      .map((fieldName) => ({ fieldName: fieldName, state: this.state[fieldName] as FieldState }));
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
