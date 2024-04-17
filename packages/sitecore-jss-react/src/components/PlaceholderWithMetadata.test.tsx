// PlaceholderWithMetadata.test.js

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { PlaceholderWithMetadata } from './PlaceholderWithMetadata';

describe('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const wrapper = shallow(<PlaceholderWithMetadata component={component} />);
    expect(wrapper.find('code').length).to.equal(2);
    expect(wrapper.find('RichText').length).to.equal(1);
    expect(
      wrapper
        .find('code')
        .first()
        .text()
    ).to.include('123');
  });

  it('renders a component with nested placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'Layout',
      placeholders: {
        main: [
          {
            uid: '456',
            componentName: 'RichText',
          },
        ],
      },
    };

    const wrapper = shallow(<PlaceholderWithMetadata component={component} />);
    expect(wrapper.find('code').length).to.equal(4);
    expect(wrapper.find('RichText').length).to.equal(1);
    expect(
      wrapper
        .find('code')
        .at(0)
        .text()
    ).to.include('main');
    expect(
      wrapper
        .find('code')
        .at(1)
        .text()
    ).to.include('456');
    const codeTags = wrapper.find('code');
    const openCodeTag = codeTags.at(0).text();
    expect(openCodeTag).to.contain('{placeholderName: "main", parentRendering: "123"}');
  });

  it('renders deeply nested components correctly', () => {
    const component = {
      uid: 'root123',
      componentName: 'Layout',
      placeholders: {
        header: [
          {
            uid: 'nested123',
            componentName: 'Header',
            placeholders: {
              logo: [
                {
                  uid: 'deep123',
                  componentName: 'Logo',
                },
              ],
            },
          },
        ],
      },
    };

    const wrapper = mount(<PlaceholderWithMetadata component={component} />);
    expect(wrapper.find('Header').length).to.equal(1);
    expect(wrapper.find('Logo').length).to.equal(1);
    expect(wrapper.find('code').length).to.equal(8);
  });
});
