import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  serializeForm,
  submitForm,
  SitecoreForm,
  FormFetcher,
  TrackerFetcher,
  ValueFormField,
  FormTracker,
} from '@sitecore-jss/sitecore-jss-forms';
import { FieldTypes } from '../FieldTypes';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { DynamicFieldDirective } from '../directives/dynamic-field/dynamic-field.directive';
import { environment } from '../../../../environment';
import { FieldState, FormStateService, FieldStateCollection } from '../services/form-state.service';

export interface ErrorComponentProps {
  form: SitecoreForm;
  formErrors: string[];
  fieldErrors: Array<{ fieldName: string, state: FieldState }>;
}

export interface FormProps {
  form: SitecoreForm;
  sitecoreApiHost: string;
  sitecoreApiKey: string;
  onRedirect?: (url: string) => void;
  
  /** Fetch function used when submitting the form (defaults to using `fetch`) */
  formFetcher?: FormFetcher;

  /** Fetch function used when posting form field tracking data (defaults to using `fetch`) */
  trackerFetcher?: TrackerFetcher;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements FormProps {
  @ViewChild(DynamicFieldDirective, { static: true}) field: DynamicFieldDirective;
  @Input() public rendering: ComponentRendering;

  private _tracker: FormTracker;
  public trackerFetcher: TrackerFetcher;
  public formFetcher: FormFetcher;

  public formGroup: FormGroup;

  get value() {
    return this.formGroup.value;
  }

  public form: SitecoreForm;
  public formErrors: string[];
  
  public sitecoreApiHost = environment.sitecoreApiHost;
  public sitecoreApiKey = environment.sitecoreApiKey;
  public action: string;

  public constructor(private formBuilder: FormBuilder, private formState: FormStateService) { 
    const state = {
      errors: [],
      // in a multistep form the server can reset the form schema
      // to display further steps; this state property overrides
      // the form passed in from props if present
      nextForm: null,
      submitButton: null
    };

    this.formState.setState(state);

    this._tracker = new FormTracker({
      endpoint: `${this.sitecoreApiHost}/api/jss/fieldtracking/register?sc_apikey=${this.sitecoreApiKey}`,
      fetcher: this.trackerFetcher,
    });
  }

  public ngOnInit(): void { 
    this.form = this.formState.state.nextForm || this.rendering.fields as unknown as SitecoreForm;
    this.formGroup = this.createControl();

    this._tracker.setFormData(this.form.formItemId.value, this.form.formSessionId.value, this.form.metadata.isTrackingEnabled);

    this.action = `${this.sitecoreApiHost}/api/jss/formbuilder?fxb.FormItemId=${this.form.metadata.itemId}&fxb.HtmlPrefix=${this.form.htmlPrefix}&sc_apikey=${this.sitecoreApiKey}`;
  }

  createControl() {
    const group = this.formBuilder.group({});
    this.form.fields.forEach(field => {
      if (field.model.fieldTypeItemId === FieldTypes.Button) return;

      const castField = field as ValueFormField;

      if (castField.valueField) {
        const control = this.formBuilder.control(castField.valueField.name);
        group.addControl(castField.valueField.name, control);
      }
    });

    return group;
  }

  collectCurrentFieldValues() {
    return Object.keys(this.formState.state)
      .filter((fieldName) => this.formState.state[fieldName] && typeof this.formState.state[fieldName].isValid !== 'undefined')
      .map((fieldName) => ({ fieldName: fieldName, state: this.formState.state[fieldName] as FieldState }));
  }

  /**
   * Handler triggered when the form is submitted. May transition its state between
   * steps in a multistep form or handle a final submit.
   */
  onSubmit(e) {
    e.preventDefault();

    const form = this.formState.state.nextForm || this.form;

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
    const formData = serializeForm(form, { submitButtonName: this.formState.state.submitButton });

    // merge in user-updated field values
    formData.mergeOverwritingExisting(fieldValues);

    const submitUrl = (e.target as HTMLFormElement).action;

    if (!submitUrl) {
      throw new Error('Submit URL was not defined. Ensure the form has an action attribute.');
    }

    submitForm(formData, submitUrl)
      .then((result) => {
        this.form = result.nextForm;

        if (result.success && result.redirectUrl) {
          // Process redirect-on-success action.
          // if (this.props.onRedirect) {
          //   this.props.onRedirect(result.redirectUrl);
          // } else {
            window.location.href = result.redirectUrl;
          //}
        }

        if (result.validationErrors) {
          this.formErrors = [];
          Object.keys(result.validationErrors).forEach((fieldKey) => {
            this.formErrors = this.formErrors.concat(result.validationErrors[fieldKey]);
          });

          const stateUpdate: FieldStateCollection = {};

          Object.keys(result.validationErrors).forEach((fieldKey) => {
            stateUpdate[fieldKey] = {
              value: (this.formState.state[fieldKey] || {}).value,
              isValid: false,
              errors: result.validationErrors[fieldKey],
            };
          });

          this.formState.setState(stateUpdate);
        }

        if (result.nextForm) {
          this.formState.setState({ nextForm: result.nextForm });
        }

        if (result.success) {
          this.formState.resetFieldsState();
        }

        if (result.errors && result.errors.length > 0) {
          throw result.errors;
        }

        this.formState.setState({ errors: [] });
      })
      .catch((error: Error | string[] | string) => {
        console.log('Form submit error', error);

        if (Array.isArray(error)) {
          this.formState.setState({ errors: error });
        } else if (typeof error === 'string') {
          console.log('Form submit error', error);
          this.formState.setState({ errors: [error] });
        } else {
          console.log('Form submit error', error);
          this.formState.setState({ errors: [error.message] });
        }
      });
  }
}
