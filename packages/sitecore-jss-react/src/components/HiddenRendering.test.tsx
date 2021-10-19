import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { HiddenRendering } from './HiddenRendering';

describe('<HiddenRendering />', () => {
  it('should render', () => {
    const rendered = mount(<HiddenRendering />);
    expect(rendered).to.have.length(1);
    expect(rendered.find('div').prop('style')).to.deep.equal({
      height: '100px',
      backgroundImage:
        'linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%);',
      backgroundSize: '3px 3px',
    });
    expect(rendered.html()).to.equal(
      '<div style="height: 100px; background-size: 3px 3px;"></div>'
    );
  });
});
