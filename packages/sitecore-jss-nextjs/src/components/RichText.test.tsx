import React, { ReactNode } from 'react';
import { use, expect, spy } from 'chai';
import { RichText as ReactRichText } from '@sitecore-jss/sitecore-jss-react';
import { mount } from 'enzyme';
import spies from 'chai-spies';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { RichText } from './RichText';

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
const Page = ({ children, value }: { children: ReactNode; value?: any }) => (
  <RouterContext.Provider value={value || Router()}>{children}</RouterContext.Provider>
);

describe('RichText', () => {
  it('should initialize links', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value: `<div id="test"><h1>Hello!</h1><a href="/t10">1</a><a href="/t10">2</a></div>`,
      },
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { attachTo: app }
    );

    expect(c.html()).contains('<div id="test">');
    expect(c.html()).contains('<h1>Hello!</h1>');
    expect(c.html()).contains('<a href="/t10">1</a>');
    expect(c.html()).contains('<a href="/t10">2</a>');

    expect(router.prefetch).called.exactly(1);

    const main = document.querySelector('main');

    const links = main && main.querySelectorAll('a');

    const link1 = links && links[0];
    const link2 = links && links[1];

    expect(link1!.href).to.equal('/t10');
    expect(link2!.href).to.equal('/t10');

    link1 && link1.click();

    expect(router.push).called.exactly(1);

    link2 && link2.click();

    expect(router.push).called.exactly(2);

    expect(c.find(ReactRichText).length).to.equal(1);

    document.body.removeChild(app);
  });

  it('should initialize links using internalLinksSelector', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value: `<div id="test"><h1>Hello!</h1><a href="/testpath/t1">t1</a><a href="/t2">t2</a></div>`,
      },
      internalLinksSelector: 'a[href^="/testpath"]',
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { attachTo: app }
    );

    expect(c.html()).contains('<div id="test">');
    expect(c.html()).contains('<h1>Hello!</h1>');

    const main = document.querySelector('main');

    const links = main && main.querySelectorAll('a');

    const link1 = links && links[0];
    const link2 = links && links[1];

    expect(link1!.href).to.equal('/testpath/t1');
    expect(link2!.href).to.equal('/t2');

    link1 && link1.click();

    expect(router.push).called.exactly(1);

    link2 && link2.click();

    // Check that push not invoked, because second link don't have event listener
    expect(router.push).called.exactly(1);

    expect(c.find(ReactRichText).length).to.equal(1);

    document.body.removeChild(app);
  });

  it('should not initialize links when does not have value', () => {
    const router = Router();

    const props = {
      field: {},
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(router.prefetch).called.exactly(0);

    expect(c.find(ReactRichText).length).to.equal(1);
  });

  it('should not initialize links if no links in markup', () => {
    const router = Router();

    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1></div>',
      },
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(c.html()).contains('<div id="test">');
    expect(c.html()).contains('<h1>Hello!</h1>');

    expect(router.prefetch).called.exactly(0);

    expect(c.find(ReactRichText).length).to.equal(1);
  });

  it('should not initialize links when editable', () => {
    const router = Router();

    const props = {
      field: {
        editable: '<div id="test"><h1>Hello!</h1><a href="/t1">t1</a><a href="/t2">t2</a></div>',
      },
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(c.html()).contains('<div id="test">');
    expect(c.html()).contains('<h1>Hello!</h1>');
    expect(c.html()).contains('<a href="/t1">t1</a>');
    expect(c.html()).contains('<a href="/t2">t2</a>');

    expect(router.prefetch).called.exactly(0);

    expect(c.find(ReactRichText).length).to.equal(1);
  });
});
