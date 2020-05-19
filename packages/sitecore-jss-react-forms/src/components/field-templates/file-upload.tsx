import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { StringInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const onChangeField = (files: FileList | null, field: ValueFormField, cb: FieldChangeCallback) => {
  if (!files || !files[0]) {
    return;
  }

  cb(field.valueField.name, files[0], true, []);
};

const FileUpload: React.FunctionComponent<ValueFieldProps<StringInputViewModel>> = (props) => {
  const { field, value, onChange, errors, tracker } = props;
  console.log('FILE-UPLOAD PROPS:', props);
  return (
    <Fragment>
      <Label {...props} />
      <input
        type="file"
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        onChange={function (e) {
          console.log('Ev', e, e.target.files && e.target.files[0]);
          onChangeField(e.target.files, field, onChange);
        }}
        onFocus={() => {
          console.log('focus...')
          tracker.onFocusField(field, value)
        }}
        onBlur={() => {
          console.log('blur...');
          tracker.onBlurField(field, value, errors);
        }}
      />
      <FieldValidationErrors {...props} />
    </Fragment>
  );
};

export default FileUpload;
