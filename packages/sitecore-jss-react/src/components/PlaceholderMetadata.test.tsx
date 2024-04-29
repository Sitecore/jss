import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';
import { Placeholder } from './placeholder';
import { ComponentFactory } from './sharedTypes';

const deepNestedComponent = {
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
};

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC>();

  components.set('RichText', () => <div className="richtext-mock" />);
  components.set('Header', () => (
    <div className="component-class">
      <Placeholder
        name="logo"
        rendering={deepNestedComponent}
        componentFactory={componentFactory}
      />
    </div>
  ));
  components.set('Logo', () => <div className="Logo-mock" />);

  return components.get(componentName) || null;
};

describe('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(
      <PlaceholderMetadata rendering={component}>{children}</PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
        '<div class="richtext-class"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>',
      ].join('')
    );
  });

  it('renders a component with placeholders', () => {
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

    const children = (
      <div className="component-class">
        <Placeholder name="main" rendering={component} componentFactory={componentFactory} />
      </div>
    );

    const wrapper = shallow(
      <PlaceholderMetadata rendering={component}>{children}</PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code>',
        '<div class="component-class"><div class="richtext-mock"></div></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>',
      ].join('')
    );
  });

  it('renders nested placeholder components', () => {
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

    const children = (
      <div className="component-class">
        <Placeholder name="header" rendering={component} componentFactory={componentFactory} />
      </div>
    );

    const wrapper = shallow(
      <PlaceholderMetadata rendering={component}>{children}</PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_root123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
        '<div class="component-class"><div class="header-mock"></div></div>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
        '<div class="component-class"><div class="logo-mock"></div></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="deep123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="logo_nested123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="nested123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_root123"></code>',
      ].join('')
    );
  });

  it('should render code blocks if placeholder is empty', () => {
    const component = {
      uid: '123',
      componentName: 'Layout',
      placeholders: {
        main: [],
      },
    };

    const wrapper = shallow(<PlaceholderMetadata rendering={component} />);

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>',
      ].join('')
    );
  });

  it('should render missing component with chromes if component is not registered', () => {
    const component = {
      uid: '123',
      componentName: 'Layout',
      placeholders: {
        main: [
          {
            uid: '456',
            componentName: 'Unknown',
          },
        ],
      },
    };

    const children = (
      <div className="unknown-class">
        <Placeholder name="main" rendering={component} componentFactory={componentFactory} />
      </div>
    );

    const wrapper = shallow(
      <PlaceholderMetadata rendering={component}>{children}</PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code>',
        '<div class="unknown-class"><div style="background:darkorange;outline:5px solid orange;padding:10px;color:white;max-width:500px"><h2>Unknown</h2><p>JSS component is missing React implementation. See the developer console for more information.</p></div></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>',
      ].join('')
    );
  });
});
