import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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
    const rendered = render(<Button {...props} />);
    const button = rendered.container.querySelector('button')!;

    expect(button.getAttribute('type')).to.equal('submit');
    expect(button.getAttribute('id')).to.equal('button-xxx');
    expect(button.getAttribute('name')).to.equal('button-xxx');
    expect(button.getAttribute('class')).to.equal('xxx_css-class');
    expect(button.getAttribute('value')).to.equal('xxx_title');
    expect(button.innerHTML).to.equal('xxx_title');

    fireEvent.click(button);
    expect(props.onButtonClick.calledOnce).to.be.true;
  });
});
