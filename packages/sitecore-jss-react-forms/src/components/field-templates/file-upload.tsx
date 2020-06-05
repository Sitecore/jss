import React, { Component, Fragment, createRef } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValidationDataModels } from '../../ValidationDataModels';
import { FileInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

class FileUpload extends Component<ValueFieldProps<FileInputViewModel>> {
	fileInputRef = createRef<HTMLInputElement>();

	SIZE_UNITS: { [key: string]: string } = {
		'1': 'Bytes',
		'1024': 'KB',
		'1048576': 'MB',
		'1073741824': 'GB'
	};

	componentDidUpdate(prevProps: ValueFieldProps<FileInputViewModel>) {
		if (prevProps.value && !this.props.value && this.fileInputRef.current) {
			this.fileInputRef.current.value = '';
		}
	}

	getEnabledValidation(itemId: string) {
		return this.props.field.model.validationDataModels.find(validation => validation.itemId === itemId);
	}

	getFileSizeUnitName(value: number): string {
		return this.SIZE_UNITS[value];
	}

	onChangeField = (files: FileList | null, field: ValueFormField<FileInputViewModel>, cb: FieldChangeCallback) => {
		const fileSizeValidator = this.getEnabledValidation(ValidationDataModels.FileSizeValidator);
		const fileCountValidator = this.getEnabledValidation(ValidationDataModels.FileCountValidator);

		const list: File[] = [];
		const errorMessages = [];
		let valid = true;

		if (files) {
			Array(files.length).fill(null).forEach((_, idx) => {
				const fileSize = files[idx].size / field.model.fileSizeUnit;

				if (valid && fileSizeValidator && (fileSize > field.model.maxFileSize)) {
					const msg = fileSizeValidator.message
						.replace('{0}', field.model.maxFileSize.toString())
						.replace('{1}', this.getFileSizeUnitName(field.model.fileSizeUnit));

					errorMessages.push(msg);
					valid = false;
				}

				list.push(files[idx]);
			});
		}

		if (fileCountValidator && list.length > field.model.maxFileCount) {
			const msg = fileCountValidator.message
				.replace('{0}', field.model.maxFileCount.toString())
				.replace('{1}', field.model.title);

			errorMessages.push(msg);
			valid = false;
		}

		if (field.model.required && !list.length) {
			valid = false;
			errorMessages.push(`${field.model.title} is required`);
		}

		cb(field.valueField.name, list, valid, errorMessages);
	}

	render() {
		const { field, value, onChange, errors, tracker } = this.props;

		const fileTypeValidator = this.getEnabledValidation(ValidationDataModels.FileTypeValidator);

		return (
			<Fragment>
				<Label {...this.props} />
				<input
					ref={this.fileInputRef}
					type="file"
					accept={fileTypeValidator ? field.model.allowedContentTypes : undefined}
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
