/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */

import { expect } from 'chai';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import React from 'react';
import { FormTracker } from '@sitecore-jss/sitecore-jss-forms';

import FileUpload from './file-upload';

describe('<FileUpload />', () => {
  const p = {
    field: {
      valueField: {
        id: 'value_field_id_xxx',
        name: 'value_field_name_xxx',
        value: 'value_field_name_xxx',
      },
      model: {
        itemId: 'model_item_id',
        isTrackingEnabled: true,
        title: 'xxx_title',
        name: 'xxx_name',
        templateId: 'xxx_templateId',
        cssClass: 'xxx_css-class',
        labelCssClass: 'xxx_label-css-class',
        isMultiple: true,
        allowedContentTypes: '.jpg, .css',
        maxFileCount: 1,
        maxFileSize: 9999,
        fileSizeUnit: 1024,
        files: [],
        required: true,
        value: '',
        fieldTypeItemId: 'xxx_field_type_item_id',
        validationDataModels: [
          { itemId: 'xxx', message: 'xxx_message', name: 'xxx_name' },
          { itemId: 'yyy', message: 'yyy_message', name: 'yyy_name' },
          { itemId: 'zzz', message: 'zzz_message', name: 'zzz_name' },
        ],
      },
      indexField: {
        id: 'index_field_id_xxx',
        name: 'index_field_name_xxx',
        value: 'index_field_name_xxx',
      },
      fieldIdField: {
        id: 'field_id_field_id_xxx',
        name: 'field_id_field_name_xxx',
        value: 'field_id_field_name_xxx',
      },
    },
    value: 'val',
    isValid: true,
    errors: [],
    fieldFactory: () => <div>xxx</div>,
    onChange: sinon.spy(),
    onButtonClick: sinon.spy(),
    tracker: new FormTracker({ endpoint: 'xxx_endpoint' }),
  };

  it('should render file input', () => {
    const rendered = render(<FileUpload {...p} />);
    const input = rendered.container.querySelector('input')!;

    expect(input.getAttribute('type')).to.equal('file');
    expect(input.getAttribute('id')).to.equal('value_field_id_xxx');
    expect(input.getAttribute('name')).to.equal('value_field_name_xxx');
    expect(input.getAttribute('class')).to.equal('xxx_css-class');
    expect(input.getAttribute('multiple')).to.exist;
  });

  it('should check if validator is enabled', () => {
    const rendered = render(<FileUpload {...p} />);
    const getEnabledValidationScript = rendered.container.querySelector(
      'script#file-getEnabledValidation'
    )!;

    const enabledValidations = JSON.parse(getEnabledValidationScript.innerHTML);

    expect(enabledValidations).to.deep.equal(p.field.model.validationDataModels);
  });
});
