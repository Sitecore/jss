import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { Link as ReactLink } from '@sitecore-jss/sitecore-jss-react';
import { use, expect, spy } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { Link } from './Link';

use(spies);

const Router = () => ({
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  components: {},
  isFallback: false,
  basePath: '',
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
      },
    };

    const c = mount(
      <Page>
        <Link field={field} />
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.contain(`href="${field.value.href}"`);
    expect(link.html()).to.contain(`class="${field.value.class}"`);
    expect(link.html()).to.contain(`title="${field.value.title}"`);
    expect(link.html()).to.contain(`target="${field.value.target}"`);

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
  });

  it('should render with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const c = mount(
      <Page>
        <Link field={field} />
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.contain(field.href);
    expect(link.html()).to.contain(field.text);

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
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
    const c = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.contain('ipsum');
    expect(link.html()).to.contain('<p>Hello world...</p>');

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
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
    const c = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.contain('/lorem');
    expect(link.html()).to.contain('<p>Hello world...</p>');

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
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
    const c = mount(
      <Page>
        <Link field={field}>
          <p>Hello world...</p>
        </Link>
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.not.contain('ipsum');
    expect(link.html()).to.contain('<p>Hello world...</p>');

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
    };
    const c = mount(
      <Page>
        <Link field={field} id="my-link" accessKey="a" />
      </Page>
    );

    const link = c.find('a');

    expect(link.html()).to.contain('id="my-link"');
    expect(link.html()).to.contain('accesskey="a"');

    expect(c.find(NextLink).length).to.equal(1);
    expect(c.find(ReactLink).length).to.equal(0);
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
    const rendered = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent internalLinkMatcher={/^http:\/\/jssreactweb/g}>
          <p>Hello world...</p>
        </Link>
      </Page>
    );
    expect(rendered.find(NextLink).length).to.equal(1);
    expect(rendered.find(ReactLink).length).to.equal(0);
	})
	
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
    const rendered = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );
    expect(rendered.find(NextLink).length).to.equal(0);
    expect(rendered.find(ReactLink).length).to.equal(1);
  });

  it('should render ReactLink if href not exists', () => {
    const field = {
      value: {
        href: null,
        text: 'ipsum',
        class: 'my-link',
        title: 'My Link',
        target: '_blank',
      },
    };
    const rendered = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    );
    expect(rendered.find(NextLink).length).to.equal(0);
    expect(rendered.find(ReactLink).length).to.equal(1);
  });
});
