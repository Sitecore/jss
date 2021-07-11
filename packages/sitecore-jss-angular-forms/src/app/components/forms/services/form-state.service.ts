import { Injectable } from '@angular/core';
import { SitecoreForm } from '@sitecore-jss/sitecore-jss-forms';

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

@Injectable({
    providedIn: 'root'
})
export class FormStateService {
    private formState: FormState = <FormState>{};

    get state(): FormState {
        return this.formState;
    }

    // React uses a native state object, which we don't get in Angular
    // This will let us get similar functionality, to get data over to the form
    public setState(state: object) {
        Object.keys(state).forEach((key) => {
            this.state[key] = state[key];
        });
    }

    public setFieldState(key: string, value: string | string[], isValid: boolean, errors: string[]) {
        this.setState({
            [key]: { value, isValid, errors}
        });
    }

    /**
   * Removes the current fields' mutated state from this.state,
   * which prevents validation issues and mutable field state from following us
   * across steps in a multistep form.
   */
  public resetFieldsState() {
    const keys = Object.keys(this.state).filter(
      (key) => key !== 'nextForm' && key !== 'errors' && key !== 'submitButton'
    );
    const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
    this.setState({ ...stateReset, errors: [] });
  }
}