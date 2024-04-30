import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

describe('PlaceholderWithMetadata', () => {
  it('renders rendering code blocks for metadataType rendering', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(
      <PlaceholderMetadata uid={component.uid} metadataType={'rendering'}>
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
      <PlaceholderMetadata uid={'xyz'} metadataType={'placeholder'}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="xyz"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="xyz"></code>',
      ].join('')
    );
  });
});
