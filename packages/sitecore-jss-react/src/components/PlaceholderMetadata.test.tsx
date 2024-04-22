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

    expect(codeTags.length).to.equal(2);

    expect(wrapper.find('RichText').length).to.equal(1);

    expect(codeTags.at(0).props().chrometype).to.equal('rendering');
    expect(codeTags.at(0).props().kind).to.equal('open');
    expect(codeTags.at(0).props().id).to.equal('123');

    expect(codeTags.at(1).props().chrometype).to.equal('rendering');
    expect(codeTags.at(1).props().kind).to.equal('close');
    expect(codeTags.at(1).props().id).to.equal('123');
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

    expect(codeTags.at(0).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(0).props().kind).to.equal('open');
    expect(codeTags.at(0).props().id).to.equal('main_123');

    expect(codeTags.at(1).props().chrometype).to.equal('rendering');
    expect(codeTags.at(1).props().kind).to.equal('open');
    expect(codeTags.at(1).props().id).to.equal('456');

    expect(codeTags.at(2).props().chrometype).to.equal('rendering');
    expect(codeTags.at(2).props().kind).to.equal('close');
    expect(codeTags.at(2).props().id).to.equal('456');

    expect(codeTags.at(3).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(3).props().kind).to.equal('close');
    expect(codeTags.at(3).props().id).to.equal('main_123');
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

    expect(codeTags.at(0).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(0).props().kind).to.equal('open');
    expect(codeTags.at(0).props().id).to.equal('header_root123');

    expect(codeTags.at(1).props().chrometype).to.equal('rendering');
    expect(codeTags.at(1).props().kind).to.equal('open');
    expect(codeTags.at(1).props().id).to.equal('nested123');

    expect(codeTags.at(2).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(2).props().kind).to.equal('open');
    expect(codeTags.at(2).props().id).to.equal('logo_nested123');

    expect(codeTags.at(3).props().chrometype).to.equal('rendering');
    expect(codeTags.at(3).props().kind).to.equal('open');
    expect(codeTags.at(3).props().id).to.equal('deep123');

    expect(codeTags.at(4).props().chrometype).to.equal('rendering');
    expect(codeTags.at(4).props().kind).to.equal('close');
    expect(codeTags.at(4).props().id).to.equal('deep123');

    expect(codeTags.at(5).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(5).props().kind).to.equal('close');
    expect(codeTags.at(5).props().id).to.equal('logo_nested123');

    expect(codeTags.at(6).props().chrometype).to.equal('rendering');
    expect(codeTags.at(6).props().kind).to.equal('close');
    expect(codeTags.at(6).props().id).to.equal('nested123');

    expect(codeTags.at(7).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(7).props().kind).to.equal('close');
    expect(codeTags.at(7).props().id).to.equal('header_root123');
  });

  it('should render component if nested placeholder is empty', () => {
    const component = {
      uid: '123',
      componentName: 'Layout',
      placeholders: {
        main: [],
      },
    };

    const wrapper = mount(<PlaceholderMetadata component={component} />);
    const codeTags = wrapper.find('code');

    expect(codeTags.length).to.equal(2);

    expect(codeTags.at(0).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(0).props().kind).to.equal('open');
    expect(codeTags.at(0).props().id).to.equal('main_123');

    expect(codeTags.at(1).props().chrometype).to.equal('placeholder');
    expect(codeTags.at(1).props().kind).to.equal('close');
    expect(codeTags.at(1).props().id).to.equal('main_123');
  });
});
