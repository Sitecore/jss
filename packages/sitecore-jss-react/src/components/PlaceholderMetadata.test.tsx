import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';

/**
 * Normalize HTML output for comparison
 * @param str
 */
function normalizeWhitespace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

describe('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const wrapper = shallow(<PlaceholderMetadata component={component} />);

    const expectedOutput =
      '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code><RichText></RichText><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>';

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

    const wrapper = mount(<PlaceholderMetadata component={component} />);

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code><richtext></richtext><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>';

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

    const wrapper = mount(<PlaceholderMetadata component={component} />);

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_root123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code><header><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code><code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code><logo></logo><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="deep123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="logo_nested123"></code></header><code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="nested123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_root123"></code>';

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

    const wrapper = mount(<PlaceholderMetadata component={component} />);

    const expectedOutput =
      '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="main_123"></code><code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="main_123"></code>';

    const actualOutput = normalizeWhitespace(wrapper.html());
    const normalizedExpectedOutput = normalizeWhitespace(expectedOutput);

    expect(actualOutput).to.equal(normalizedExpectedOutput);
  });
});
