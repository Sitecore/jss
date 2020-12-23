import React from 'react';

import { FormField } from '@sitecore-jss/sitecore-jss-forms';
import { FieldTypes } from './FieldTypes';
import { FieldProps } from './FieldProps';

export type FormFieldComponent<TProps extends FieldProps> = React.ComponentType<TProps>;

/**
 * Maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
 * into an implementing React component - this is very similar to the JSS componentFactory,
 * but it maps form element components instead of layout components
 */
class FieldFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fieldMap = new Map<string, React.ComponentType<any>>();
  private _defaultComponent: React.ComponentType<FormField>;

  constructor() {
    // eslint-disable-next-line react/display-name
    this._defaultComponent = (props: FormField) => (
      <div key={props.model.fieldTypeItemId}>
        {props.model.name}: No renderer for form element type {props.model.fieldTypeItemId}
      </div>
    );
  }

  setComponentNotFoundComponent(component: React.ComponentType<FormField>) {
    this._defaultComponent = component;
  }

  setComponent<TProps extends FieldProps>(type: FieldTypes, component: FormFieldComponent<TProps>) {
    this._fieldMap.set(type, component);
  }

  get(field: FormField, props: FieldProps): React.ReactNode {
    const Result = this._fieldMap.get(field.model.fieldTypeItemId);

    if (!Result) {
      const Default = this._defaultComponent;
      return <Default {...field} />;
    }

    return <Result {...props} />;
  }
}

export default FieldFactory;
