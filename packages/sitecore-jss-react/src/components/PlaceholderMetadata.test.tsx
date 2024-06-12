import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

describe('PlaceholderMetadata', () => {
  it('renders rendering code blocks for metadataType rendering', () => {
    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(
      <PlaceholderMetadata rendering={{ uid: '123', componentName: 'RichText' }}>
        {children}
      </PlaceholderMetadata>
    );

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
      <PlaceholderMetadata
        rendering={{
          uid: '123',
          componentName: 'RichText',
          placeholders: { main: [] },
        }}
        placeholderName={'main'}
      >
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

  it('renders placeholder code blocks when metadataType is a root placeholder and uid is undefined', () => {
    const children = <div className="richtext-mock"></div>;
    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={{
          componentName: 'RichText',
          placeholders: { main: [] },
        }}
        placeholderName={'main'}
      >
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_00000000-0000-0000-0000-000000000000"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
      ].join('')
    );
  });

  it('renders placeholder code blocks when metadataType is dynamic placeholder', () => {
    const children = <div className="richtext-mock"></div>;
    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={{
          uid: '123',
          componentName: 'RichText',
          placeholders: { 'main-{*}': [] },
        }}
        placeholderName={'main-1'}
      >
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main-{*}"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
      ].join('')
    );
  });

  it('renders placeholder code blocks when metadataType is double digit dynamic placeholder', () => {
    const children = <div className="richtext-mock"></div>;
    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={{
          uid: '123',
          componentName: 'RichText',
          placeholders: { 'main-1-{*}': [] },
        }}
        placeholderName={'main-1-1'}
      >
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main-1-{*}"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close"></code>',
      ].join('')
    );
  });
});
