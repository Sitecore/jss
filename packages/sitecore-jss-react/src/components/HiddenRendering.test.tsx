import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { HiddenRendering } from './HiddenRendering';

describe('<HiddenRendering />', () => {
  it('should render', () => {
    const rendered = render(<HiddenRendering />, { container: document.body });
    expect(document.querySelectorAll('body > *')).to.have.length(1);
    const style = rendered.container
      .querySelector('div')
      ?.getAttribute('style')
      ?.trim()
      ?.split(';')
      .reduce<Record<string, string>>((acc, style) => {
        if (style.split(':')[0]) acc[style.split(':')[0].trim()] = style.split(':')[1].trim();
        return acc;
      }, {});

    // TODO: Re-enable background-image check when bug is fixed
    // https://github.com/jsdom/jsdom/issues/2166
    /*
    expect(style).to.deep.equal({
      'background-image':
        'linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%)',
    */
    console.log(style);
    expect(style).to.deep.equal({
      height: '100px',
      'background-size': '3px 3px',
    });
    expect(rendered.container.innerHTML).to.equal(
      '<div style="height: 100px; background-size: 3px 3px;"></div>'
    );
  });
});
