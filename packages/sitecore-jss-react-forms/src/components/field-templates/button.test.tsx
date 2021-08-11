/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */

import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import Button from './button';

describe('<Button />', () => {
  const p = () => ({
    field: {
      model: {
        itemId: 'model_item_id',
        title: 'xxx_title',
        name: 'xxx_name',
        templateId: 'xxx_templateId',
        cssClass: 'xxx_css-class',
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
      navigationButtonsField: {
        name: 'xxx',
        id: 'xxx',
        value: 'xxx',
      },
      navigationStepField: {
        name: 'yyy',
        id: 'yyy',
        value: 'yyy',
      },
      buttonField: {
        name: 'button-xxx',
        id: 'button-xxx',
        value: 'button-xxx',
      },
    },
    fieldFactory: () => <div>xxx</div>,
    onButtonClick: sinon.spy(),
  });

  it('should render button', () => {
    const props = p();
    const c = mount(<Button {...props} />);
    const button = c.find('button');
    const prop = (name: string) => button.prop(name);

    expect(c.type()).to.exist;
    expect(prop('type')).to.equal('submit');
    expect(prop('id')).to.equal('button-xxx');
    expect(prop('name')).to.equal('button-xxx');
    expect(prop('className')).to.equal('xxx_css-class');
    expect(prop('value')).to.equal('xxx_title');

    button.simulate('click');

    expect(props.onButtonClick.calledOnce).to.be.true;
    expect(button.contains('xxx_title')).to.be.true;
  });
});
