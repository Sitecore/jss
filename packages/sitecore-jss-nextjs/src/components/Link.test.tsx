import React, { ReactNode } from 'react';
import { use, expect, spy } from 'chai';
import { mount } from 'enzyme';
import spies from 'chai-spies';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { Link, LinkField } from './Link';
import { generalLinkField as eeLinkData } from '../testData/ee-data';

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
  it('should render nothing with missing editable and value', () => {
    const field: LinkField = {};
    const rendered = mount(<Link field={field} />).children();
    expect(rendered).to.have.length(0);
  });

  it('should render editable with an editable value', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    const rendered = mount(<Link field={field} />);

    expect(rendered.html()).to.contain(field.editableFirstPart);
  });

  it('should render null when editable with children and without href', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    const rendered = mount(<Link field={field}><p>Hello world...</p></Link>);

    expect(rendered.html()).to.be.null;
  })

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
      editable: '<a href="/services" class="yo">Lorem</a>',
    };
    const rendered = mount(
      <Page>
        <Link field={field} editable={false} />
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain(field.value.href);
    expect(rendered.html()).to.contain(field.value.text);
  });

  it('should render with href directly on provided field', () => {
    const field = {
      href: '/lorem',
      text: 'ipsum',
    };
    const rendered = mount(
      <Page>
        <Link field={field} />
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain(field.href);
    expect(rendered.html()).to.contain(field.text);
  });

  it('should render ee HTML', () => {
    const field = {
      editableFirstPart: eeLinkData,
    };
    const rendered = mount(<Link field={field} />);
    expect(rendered.html()).to.contain('<input');
    expect(rendered.html()).to.contain('chrometype="field"');
  });

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
    const rendered = mount(
      <Page>
        <Link field={field} />
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain(`href="${field.value.href}"`);
    expect(rendered.html()).to.contain(`class="${field.value.class}"`);
    expect(rendered.html()).to.contain(`title="${field.value.title}"`);
    expect(rendered.html()).to.contain(`target="${field.value.target}"`);
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
    const rendered = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain('ipsum');
    expect(rendered.html()).to.contain('<p>Hello world...</p>');
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
    const rendered = mount(
      <Page>
        <Link field={field} showLinkTextWithChildrenPresent>
          <p>Hello world...</p>
        </Link>
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain('/lorem');
    expect(rendered.html()).to.contain('<p>Hello world...</p>');
  })

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
    const rendered = mount(
      <Page>
        <Link field={field}>
          <p>Hello world...</p>
        </Link>
      </Page>
    ).find('a');
    expect(rendered.html()).to.not.contain('ipsum');
    expect(rendered.html()).to.contain('<p>Hello world...</p>');
  })

  it('should render other attributes with other props provided', () => {
    const field = {
      value: {
        href: '/lorem',
        text: 'ipsum',
      },
    };
    const rendered = mount(
      <Page>
        <Link field={field} id="my-link" accessKey="a" />
      </Page>
    ).find('a');
    expect(rendered.html()).to.contain('id="my-link"');
    expect(rendered.html()).to.contain('accesskey="a"');
  });

  it('should render other attributes on wrapper span with other props provided with editable', () => {
    const field = {
      editableFirstPart: '<a href="/services" class="yo">Lorem',
      editableLastPart: '</a>',
    };
    const rendered = mount(<Link field={field} id="my-link" />);
    expect(rendered.html()).to.contain('id="my-link"');
  });
});
