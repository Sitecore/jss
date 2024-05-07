import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

describe('PlaceholderMetadata', () => {
  it('renders rendering code blocks for metadataType rendering', () => {
    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(<PlaceholderMetadata uid={'123'}>{children}</PlaceholderMetadata>);

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
        '<div class="richtext-class"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close"></code>',
      ].join('')
    );
  });

  it('renders placeholder code blocks when metadataType is placeholder', () => {
    const children = <div className="richtext-mock"></div>;
    const wrapper = shallow(
      <PlaceholderMetadata uid={'123'} placeholderName={'main'}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
      ].join('')
    );
  });
});
