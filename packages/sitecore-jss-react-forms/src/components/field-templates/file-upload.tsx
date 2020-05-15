import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { StringInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const FileUpload: React.FunctionComponent<ValueFieldProps<StringInputViewModel>> = (props) => {
  console.log('FILE-UPLOAD PROPS:', props);
  return (
    <Fragment>
      Hello world...I'm not implemented file-uplaod field.
    </Fragment>
  );
};

export default FileUpload;
