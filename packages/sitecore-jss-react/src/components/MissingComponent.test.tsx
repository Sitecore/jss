import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MissingComponent } from './MissingComponent';

describe('<MissingComponent>', () => {
  it('should accept and display custom error', () => {
    const errorMsg = 'Oops, I errored again';
    const props = {
      rendering: {
        componentName: 'test',
      },
      errorOverride: errorMsg,
    };

    const wrapper = mount(<MissingComponent {...props} />);

    expect(wrapper.find('div p').text()).to.contain(errorMsg);
  });
});
