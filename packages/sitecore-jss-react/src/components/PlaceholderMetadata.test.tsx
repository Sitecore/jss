import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

describe('PlaceholderWithMetadata', () => {
  it('renders rendering code blocks for metadataType rendering', () => {
    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(
      <PlaceholderMetadata uid={'123'} metadataType={'rendering'}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
        '<div class="richtext-class"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>',
      ].join('')
    );
  });

  it('renders placeholder code blocks when metadataType is placeholder', () => {
    const children = <div className="richtext-mock"></div>;
    const wrapper = shallow(
      <PlaceholderMetadata uid={'123'} placeholderName={'main'} metadataType={'placeholder'}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>',
      ].join('')
    );
  });
});
