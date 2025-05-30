import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
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

    const wrapper = render(<MissingComponent {...props} />);

    expect(wrapper.container.querySelector('div p')?.textContent).to.contain(errorMsg);
  });
});
