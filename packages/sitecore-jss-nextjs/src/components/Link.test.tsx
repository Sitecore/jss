import React, { createRef, ReactNode } from 'react';
import { NextRouter } from 'next/router';
import { LinkField, DefaultEmptyFieldEditingComponentText } from '@sitecore-jss/sitecore-jss-react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Link } from './Link';
import { spy } from 'sinon';

const Router = (): NextRouter => ({
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isLocaleDomain: false,
  isFallback: false,
  isPreview: false,
  isReady: false,
  events: { emit: spy(), off: spy(), on: spy() },
  push: spy(() => Promise.resolve(true)),
  replace: spy(() => Promise.resolve(true)),
  reload: spy(),
  back: spy(),
  prefetch: spy(() => Promise.resolve()),
  beforePopState: spy(),
});

// Should provide RouterContext in case if we render Link from next/link
const Page = ({ children }: { children: ReactNode }) => (
  <RouterContext.Provider value={Router()}>{children}</RouterContext.Provider>
);

describe('<Link />', () => {
  it('should render all value attributes', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
        querystring: 'foo=bar',
        anchor: 'foo',
      },
    };

    const c = render(
      <Page>
        <Link field={field} />
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.getAttribute('href')).to.equal(
      `${field.value.href}?${field.value.querystring}#${field.value.anchor}`
    );
    expect(link?.getAttribute('class')).to.equal(field.value.class);
    expect(link?.getAttribute('title')).to.equal(field.value.title);
    expect(link?.getAttribute('target')).to.equal(field.value.target);
    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const c = render(
      <Page>
        <Link field={field} />
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.contain(field.href);
    expect(link?.outerHTML).to.contain(field.text);

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render link text with children', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const c = render(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.contain('ipsum');
    expect(link?.outerHTML).to.contain('<p>Hello world...</p>');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render link href with children', () => {
    const field = {
      value: {
        href: '/lorem',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const c = render(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.contain('/lorem');
    expect(link?.outerHTML).to.contain('<p>Hello world...</p>');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render children instead of link text', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const c = render(
      <Page>
        <Link field={field}>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.not.contain('ipsum');
    expect(link?.outerHTML).to.contain('<p>Hello world...</p>');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render with prefetch prop provided', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const prefetch = false;

    const c = render(
      <Page>
        <Link field={field} prefetch={prefetch} />
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.contain(field.href);
    expect(link?.outerHTML).to.contain(field.text);

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
    expect(link?.getAttribute('data-nextjs-link-prefetch')).to.equal(prefetch.toString());
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
    };
    const c = render(
      <Page>
        <Link field={field} id="my-link" accessKey="a" />
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link?.outerHTML).to.contain('id="my-link"');
    expect(link?.outerHTML).to.contain('accesskey="a"');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should not add extra hash when linktype is anchor', () => {
    const field = {
      linktype: 'anchor',
      href: '#anchor',
      text: 'anchor link',
      anchor: 'anchor',
    };
    const rendered = render(
      <Page>
        <Link field={field} />
      </Page>
    ).container.querySelector('a');

    expect(rendered?.outerHTML).to.contain(`href="${field.href}"`);
    expect(rendered?.innerHTML).to.equal(field.text);
  });

  it('should render NextLink using internalLinkMatcher', () => {
    const field = {
      value: {
        href: 'http://jssreactweb/home',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const rendered = render(
      <Page>
        <Link
          field={field}
          showLinkTextWithChildrenPresent
          internalLinkMatcher={/^http:\/\/jssreactweb/g}
        >
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = rendered.container.querySelector('a');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  describe('relative file url', () => {
    it('should not render Next link when file url is provided', () => {
      const field = {
        value: {
          href: '/foo/bar/test.html',
          text: 'ipsum',
          class: 'my-link',
          title: 'My Link',
          target: '_blank',
        },
      };
      const rendered = render(
        <Page>
          <Link field={field} showLinkTextWithChildrenPresent>
            <p>Hello world...</p>
          </Link>
        </Page>
      );

      const link = rendered.container.querySelector('a');

      expect(link?.getAttribute('data-react-link')).to.equal('true');
    });

    it('should not render Next link when file url is provided in the root', () => {
      const field = {
        value: {
          href: '/test.png',
          text: 'ipsum',
          class: 'my-link',
          title: 'My Link',
          target: '_blank',
        },
      };
      const rendered = render(
        <Page>
          <Link field={field} showLinkTextWithChildrenPresent>
            <p>Hello world...</p>
          </Link>
        </Page>
      );

      const link = rendered.container.querySelector('a');

      expect(link?.getAttribute('data-react-link')).to.equal('true');
    });
  });

  it('should render ReactLink if link is external', () => {
    const field = {
      value: {
        href: 'http://jssreactweb/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const rendered = render(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = rendered.container.querySelector('a');

    expect(link?.getAttribute('data-react-link')).to.equal('true');
  });

  it('should prevent passing internalLinkMatcher to ReactLink', () => {
    const field = {
      value: {
        href: 'http://jssreactweb/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const rendered = render(
      <Page>
        <Link
          field={field}
          showLinkTextWithChildrenPresent
          internalLinkMatcher={/^http:\/\/doc.sitecore.com/g}
        >
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = rendered.container.querySelector('a');
    expect(link?.outerHTML).not.to.contain('internallinkmatcher');

    expect(link?.getAttribute('data-react-link')).to.equal('true');
  });

  it('should prevent passing emptyFieldEditingComponent to NextLink', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const customEmptyFieldEditingComponentText = DefaultEmptyFieldEditingComponentText;
    // Spy on console.warn
    const consoleErrorSpy = spy(console, 'error');

    const rendered = render(
      <Page>
        <Link field={field} emptyFieldEditingComponent={customEmptyFieldEditingComponentText}>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = rendered.container.querySelector('a');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');

    // Assert that the specific warning was not logged
    expect(consoleErrorSpy.calledWithMatch(/React does not recognize the .* prop on a DOM element/))
      .to.be.false;

    // Restore the original console.error
    consoleErrorSpy.restore();
  });

  it('should render with a ref to the anchor', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const ref = createRef<HTMLAnchorElement>();

    const c = render(
      <Page>
        <Link field={field} ref={ref} id="my-link" />
      </Page>
    );

    const link = c.container.querySelector('a');

    expect(link).to.equal(ref.current);
  });

  it('should render ReactLink if editable', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
      editable: '<a href="/lorem">Lorem</a>',
    };
    const rendered = render(
      <Page>
        <Link field={field} />
      </Page>
    );

    const link = rendered.container.querySelector('a');

    expect(link?.getAttribute('data-react-link')).to.equal('true');
  });

  it('should render NextLink with editing explicitly disabled', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
      editable: '<a href="/lorem">Lorem</a>',
    };
    const rendered = render(
      <Page>
        <Link field={field} editable={false} />
      </Page>
    );

    const link = rendered.container.querySelector('a');

    expect(link?.getAttribute('data-nextjs-link')).to.equal('true');
  });

  it('should render nothing with missing field', () => {
    const field = (null as unknown) as LinkField;

    const rendered = render(<Link field={field} />);

    expect(rendered.container.innerHTML).to.have.length(0);
  });

  describe('editMode metadata', () => {
    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'single-line',
      rawValue: 'Test1',
    };

    it('should render field metadata component when metadata property is present', () => {
      const field = {
        value: {
          href: '/lorem',
          text: 'ipsum',
          class: 'my-link',
        },
        metadata: testMetadata,
      };

      const rendered = render(
        <Page>
          <Link field={field} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<a href="/lorem" class="my-link" data-react-link="true">ipsum</a>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component when field value href is not present', () => {
      const field = {
        value: {
          href: undefined,
        },
        metadata: testMetadata,
      };

      const rendered = render(
        <Page>
          <Link field={field} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span>[No text in field]</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render default empty field component when field href is not present', () => {
      const field = {
        href: undefined,
        metadata: testMetadata,
      };

      const rendered = render(
        <Page>
          <Link field={field} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span>[No text in field]</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field component when provided, when field value href is not present', () => {
      const field = {
        value: {
          href: undefined,
        },
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Page>
          <Link field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span class="empty-field-value-placeholder">Custom Empty field value</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render custom empty field component when provided, when field href is not present', () => {
      const field = {
        href: undefined,
        metadata: testMetadata,
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Page>
          <Link field={field} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal(
        [
          `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
            testMetadata
          )}</code>`,
          '<span class="empty-field-value-placeholder">Custom Empty field value</span>',
          '<code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>',
        ].join('')
      );
    });

    it('should render nothing when field value href is not present and editing is explicitly disabled', () => {
      const field = {
        value: { href: undefined },
        metadata: testMetadata,
      };

      const rendered = render(
        <Page>
          <Link field={field} editable={false} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal('');
    });

    it('should render nothing when field href is not present and editing is explicitly disabled', () => {
      const field = {
        href: undefined,
        metadata: testMetadata,
      };

      const rendered = render(
        <Page>
          <Link field={field} editable={false} />
        </Page>
      );

      expect(rendered.container.innerHTML).to.equal('');
    });
  });
});
