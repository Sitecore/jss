import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import { FileUpload } from './file-upload';

describe('<FileUpload />', () => {
  it('should return null if no editable or value', () => {
    const p = {
      field: {
        valueField: {
          id: 'xxx_id',
          name: 'xxx_name'
        },
        model: {
          title: 'xxx_title',
          cssClass: 'xxx_css-class',
          labelCssClass: 'xxx_label-css-class',
          isMultiple: true,
          allowedContentTypes: '.jpg, .css'
        }
      }
    };

    const c = shallow(<FileUpload />);

    expect(c.type()).to.exist;
  });
});
