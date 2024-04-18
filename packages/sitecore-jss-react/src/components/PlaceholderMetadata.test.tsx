import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

describe('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const wrapper = shallow(<PlaceholderMetadata component={component} />);
    const codeTags = wrapper.find('code');

    expect(wrapper.find('code').length).to.equal(2);
    expect(wrapper.find('RichText').length).to.equal(1);
    expect(codeTags.at(0).text()).to.equal('{uid: "123"}');
    expect(codeTags.at(1).html()).to.include('</code>');
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

    const wrapper = mount(<PlaceholderMetadata component={component} />);
    const codeTags = wrapper.find('code');

    expect(codeTags.length).to.equal(4);
    expect(wrapper.find('RichText').length).to.equal(1);

    expect(codeTags.at(0).text()).to.equal('{placeholderName: "main", parentRendering: "123"}');
    expect(codeTags.at(1).text()).to.equal('{uid: "456"}');
    expect(codeTags.at(2).html()).to.include('</code>');
    expect(codeTags.at(3).html()).to.include('</code>');
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

    const wrapper = mount(<PlaceholderMetadata component={component} />);
    const codeTags = wrapper.find('code');

    expect(codeTags.length).to.equal(8);
    expect(wrapper.find('Header').length).to.equal(1);
    expect(wrapper.find('Logo').length).to.equal(1);

    expect(codeTags.at(0).text()).to.equal(
      '{placeholderName: "header", parentRendering: "root123"}'
    );
    expect(codeTags.at(1).text()).to.equal('{uid: "nested123"}');
    expect(codeTags.at(2).html()).to.include('</code>');
    expect(codeTags.at(3).text()).to.equal(
      '{placeholderName: "logo", parentRendering: "nested123"}'
    );
    expect(codeTags.at(4).text()).to.equal('{uid: "deep123"}');
    expect(codeTags.at(5).html()).to.include('</code>');
    expect(codeTags.at(6).html()).to.include('</code>');
  });
});
