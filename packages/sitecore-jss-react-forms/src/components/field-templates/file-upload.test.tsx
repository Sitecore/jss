/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */

import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
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

  it('should file input', () => {
    const c = shallow(<FileUpload {...p} />);
    const input = c.find('input');
    const prop = (name: string) => input.prop(name);

    expect(c.type()).to.exist;
    expect(prop('id')).to.equal('value_field_id_xxx');
    expect(prop('name')).to.equal('value_field_name_xxx');
    expect(prop('className')).to.equal('xxx_css-class');
    expect(prop('multiple')).to.be.true;
  });

  it('should check if validator is enabled', () => {
    const c = shallow(<FileUpload {...p} />);
    const inst = c.instance() as FileUpload;

    expect(inst.getEnabledValidation('yyy')).to.deep.equal({
      itemId: 'yyy',
      message: 'yyy_message',
      name: 'yyy_name',
    });
    expect(inst.getEnabledValidation('zzz')).to.deep.equal({
      itemId: 'zzz',
      message: 'zzz_message',
      name: 'zzz_name',
    });
    expect(inst.getEnabledValidation('xxx')).to.deep.equal({
      itemId: 'xxx',
      message: 'xxx_message',
      name: 'xxx_name',
    });
    expect(inst.getEnabledValidation('ggg')).to.equal(undefined);
  });
});
