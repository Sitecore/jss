import React, { Component, Fragment, createRef } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValidationDataModels } from '../../ValidationDataModels';
import { FileInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

class FileUpload extends Component<ValueFieldProps<FileInputViewModel>> {
  fileInputRef = createRef<HTMLInputElement>();

  componentDidUpdate(prevProps: ValueFieldProps<FileInputViewModel>) {
    if (prevProps.value && !this.props.value && this.fileInputRef.current) {
      this.fileInputRef.current.value = '';
    }
  }

  isValidatorEnabled(itemId: string) {
    return !!this.props.field.model.validationDataModels.find(validation => validation.itemId === itemId);
  }

  onChangeField = (files: FileList | null, field: ValueFormField<FileInputViewModel>, cb: FieldChangeCallback) => {
    const isFileSizeValidatorEnabled = this.isValidatorEnabled(ValidationDataModels.FileSizeValidator);
    const isFileCountValidatorEnabled = this.isValidatorEnabled(ValidationDataModels.FileCountValidator);

    const list: File[] = [];
    const errorMessages = [];
    let valid = true;

    if (files) {
      Array(files.length).fill(null).forEach((_, idx) => {
        const fileSize = files[idx].size / field.model.fileSizeUnit;

        if (valid && isFileSizeValidatorEnabled && (fileSize > field.model.maxFileSize)) {
          errorMessages.push(`You cannot upload a file that exceeds the allowed file size limit (10 KB)`);
          valid = false;
        }

        list.push(files[idx]);
      });
    }

    if (isFileCountValidatorEnabled && list.length > field.model.maxFileCount) {
      valid = false;
      errorMessages.push(`You can only upload up to ${field.model.maxFileCount} files in ${field.model.title}.`);
    }

    if (field.model.required && !list.length) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }

    cb(field.valueField.name, list, valid, errorMessages);
  }

  render() {
    const { field, value, onChange, errors, tracker } = this.props;

    const isFileTypeValidatorEnabled = this.isValidatorEnabled(ValidationDataModels.FileTypeValidator);

    return (
      <Fragment>
        <Label {...this.props} />
        <input
          ref={this.fileInputRef}
          type="file"
          accept={isFileTypeValidatorEnabled ? field.model.allowedContentTypes : undefined}
          multiple={field.model.isMultiple}
          className={field.model.cssClass}
          id={field.valueField.id}
          name={field.valueField.name}
          onChange={(e) => this.onChangeField(e.target.files, field, onChange)}
          onFocus={() => tracker.onFocusField(field, value)}
          onBlur={() => tracker.onBlurField(field, value, errors)}
        />
        <FieldValidationErrors {...this.props} />
      </Fragment>
    );
  }
}

export default FileUpload;
