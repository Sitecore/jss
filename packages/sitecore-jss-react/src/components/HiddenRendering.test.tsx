import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { HiddenRendering } from './HiddenRendering';

describe('<HiddenRendering />', () => {
  it('should render', () => {
    const rendered = mount(<HiddenRendering />);
    expect(rendered).to.have.length(1);
    expect(rendered.find('div').prop('style')).to.deep.equal({
      backgroundImage:
        'linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%)',
      backgroundSize: '3px 3px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      color: '#aaa',
    });
    expect(rendered.html()).to.equal(
      '<div style="background-size: 3px 3px; display: flex; justify-content: center; align-items: center; padding: 30px; color: rgb(170, 170, 170);">The component is hidden</div>'
    );
  });
});
