import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import { HiddenRendering } from './HiddenRendering';

describe('<HiddenRendering />', () => {
  it('should render', () => {
    const result = render(<HiddenRendering />);

    const c = result.container.querySelector('div');

    expect(c.getAttribute('style')).to.equal('height: 100px; background-size: 3px 3px;');
    expect(result.container.innerHTML).to.equal(
      '<div style="height: 100px; background-size: 3px 3px;"></div>'
    );
  });
});
