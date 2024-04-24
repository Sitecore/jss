import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';
import { ComponentFactory } from './sharedTypes';

/**
 * Normalize HTML output for comparison
 * @param {string} str - The string from which to remove excessive whitespace.
 * @returns {string} The normalized string with reduced whitespace.
 */
function normalizeWhitespace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * @param {React.Component} component - The React component to set up for testing.
 * @returns {object} An object containing the component, placeholderProps, and mock functions.
 */
function setupTest(component) {
  const componentFactory: ComponentFactory = (componentName: string) => {
    const components = new Map<string, React.FC>();

    components.set('RichText', () => <div className="richtext-mock" />);
    components.set('Header', () => <div className="header-mock" />);
    components.set('Logo', () => <div className="Logo-mock" />);

    return components.get(componentName) || null;
  };

  const placeholderProps = {
    name: 'sxa-header',
    rendering: component,
    sitecoreContext: {
      context: {
        editMode: 'metadata',
      },
    },
    componentFactory,
  };

  const mockGetComponentForRendering = () => {
    // eslint-disable-next-line react/display-name, react/prop-types
    return (props) => <div {...props}>{props.children}</div>;
  };

  const mockGetSXAParams = () => {
    return {};
  };

  return { component, placeholderProps, mockGetComponentForRendering, mockGetSXAParams };
}

describe.only('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const { placeholderProps, mockGetComponentForRendering, mockGetSXAParams } = setupTest(
      component
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={component}
        placeholderProps={placeholderProps}
        getComponentForRendering={mockGetComponentForRendering}
        getSXAParams={mockGetSXAParams}
      />
    );

    const expectedOutput =
      '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code><div name="sxa-header" rendering="[object Object]" sitecoreContext="[object Object]"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
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

    const { placeholderProps, mockGetComponentForRendering, mockGetSXAParams } = setupTest(
      component
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={component}
        placeholderProps={placeholderProps}
        getComponentForRendering={mockGetComponentForRendering}
        getSXAParams={mockGetSXAParams}
      />
    );

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code><div name="sxa-header" rendering="[object Object]" sitecoreContext="[object Object]"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
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

    const { placeholderProps, mockGetComponentForRendering, mockGetSXAParams } = setupTest(
      component
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={component}
        placeholderProps={placeholderProps}
        getComponentForRendering={mockGetComponentForRendering}
        getSXAParams={mockGetSXAParams}
      />
    );

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_root123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code><div name="sxa-header" rendering="[object Object]" sitecoreContext="[object Object]"></div><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code><div name="sxa-header" rendering="[object Object]" sitecoreContext="[object Object]"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="deep123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="logo_nested123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="nested123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_root123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
  });

  it('should render component if nested placeholder is empty', () => {
    const component = {
      uid: '123',
      componentName: 'Layout',
      placeholders: {
        main: [],
      },
    };

    const { placeholderProps, mockGetComponentForRendering, mockGetSXAParams } = setupTest(
      component
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={component}
        placeholderProps={placeholderProps}
        getComponentForRendering={mockGetComponentForRendering}
        getSXAParams={mockGetSXAParams}
      />
    );

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
  });

  it('should render missing component with chromes if component is not registered', () => {
    const component = {
      uid: '123',
      componentName: 'Unknown',
    };

    const { placeholderProps, mockGetComponentForRendering, mockGetSXAParams } = setupTest(
      component
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        rendering={component}
        placeholderProps={placeholderProps}
        getComponentForRendering={mockGetComponentForRendering}
        getSXAParams={mockGetSXAParams}
      />
    );

    const expectedOutput =
      '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code><div name="sxa-header" rendering="[object Object]" sitecoreContext="[object Object]"></div><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
  });
});
