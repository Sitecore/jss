/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react';
import { use, expect } from 'chai';
import { RichText as ReactRichText } from '@sitecore-jss/sitecore-jss-react';
import { NextRouter } from 'next/router';
import { mount } from 'enzyme';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { RichText } from './RichText';
import { SinonSpy, spy } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

const Router = (): { push: SinonSpy } & Omit<NextRouter, 'push'> => ({
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isLocaleDomain: false,
  isFallback: false,
  forward: spy(),
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        value: `
        <div id="test">
          <h1>Hello!</h1>
          <a href="/t10">1</a>
          <a href="/t10">2</a>
          <a href="/contains-children"><span id="child">Title</span></a>
        </div>`,
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
    expect(c.html()).contains('<a href="/contains-children"><span id="child">Title</span></a>');

    expect(router.prefetch).callCount(2);

    const main = document.querySelector('main');

    const links = main && main.querySelectorAll('a');

    const link1 = links && links[0];
    const link2 = links && links[1];
    const link3 = links && links[2];
    const innerMarkup = document.querySelector('#child') as HTMLSpanElement;

    expect(link1!.pathname).to.equal('/t10');
    expect(link2!.pathname).to.equal('/t10');

    link1?.click();

    expect(router.push).callCount(1);

    link2?.click();

    expect(router.push).callCount(2);

    link3?.click();

    expect(router.push).callCount(3);

    // Check that when we click on link with children "router push" is called with expected pathname
    innerMarkup?.click();

    expect(router.push).callCount(4);
    expect(router.push.getCall(3).calledWith('https://example.com/contains-children')).to.equal(
      true
    );

    expect(c.find(ReactRichText).length).to.equal(1);

    document.body.removeChild(app);
  });

  it('should re-initialize links when the re-mounting with different content', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1><a href="/t100">1</a><a href="/t100">2</a></div>',
      },
    };

    const props2 = {
      field: {
        value: '<div id="test"><h1>Hello!</h1><a href="/t20">1</a><a href="/t20">2</a></div>',
      },
    };

    const initialMountedComponent = mount(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { attachTo: app }
    );

    expect(initialMountedComponent.html()).contains('<div id="test">');
    expect(initialMountedComponent.html()).contains('<h1>Hello!</h1>');
    expect(initialMountedComponent.html()).contains('<a href="/t100">1</a>');
    expect(initialMountedComponent.html()).contains('<a href="/t100">2</a>');

    expect(router.prefetch).callCount(1);

    const main = document.querySelector('main');

    const links = main && main.querySelectorAll('a');

    const link1 = links && links[0];
    const link2 = links && links[1];

    expect(link1!.pathname).to.equal('/t100');
    expect(link2!.pathname).to.equal('/t100');

    link1 && link1.click();

    expect(router.push).callCount(1);

    link2 && link2.click();

    expect(router.push).callCount(2);

    expect(initialMountedComponent.find(ReactRichText).length).to.equal(1);

    initialMountedComponent.unmount();

    const remountedComponent = mount(
      <Page value={router}>
        <RichText {...props2} />
      </Page>,
      { attachTo: app }
    );

    expect(remountedComponent.html()).contains('<div id="test">');
    expect(remountedComponent.html()).contains('<h1>Hello!</h1>');
    expect(remountedComponent.html()).contains('<a href="/t20">1</a>');
    expect(remountedComponent.html()).contains('<a href="/t20">2</a>');

    expect(router.prefetch).callCount(2);

    const links2 = main && main.querySelectorAll('a');

    const link3 = links2 && links2[0];
    const link4 = links2 && links2[1];

    expect(link3!.pathname).to.equal('/t20');
    expect(link4!.pathname).to.equal('/t20');

    link3 && link3.click();

    expect(router.push).callCount(3);

    link4 && link4.click();

    expect(router.push).callCount(4);

    expect(remountedComponent.find(ReactRichText).length).to.equal(1);

    document.body.removeChild(app);
  });

  it('should initialize links using internalLinksSelector', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value:
          '<div id="test"><h1>Hello!</h1><a href="/testpath/t1?test=sample1">t1</a><a href="/t2">t2</a></div>',
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

    expect(router.prefetch).callCount(1);

    const main = document.querySelector('main');
    const links = main && main.querySelectorAll('a');
    const link1 = links && links[0];
    const link2 = links && links[1];

    expect(link1!.href).to.endWith('/testpath/t1?test=sample1');
    expect(link2!.pathname).to.equal('/t2');

    link1 && link1.click();

    expect(router.push).callCount(1);

    link2 && link2.click();

    // Check that push not invoked, because second link don't have event listener
    expect(router.push).callCount(1);

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

    expect(router.prefetch).callCount(0);

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

    expect(router.prefetch).callCount(0);

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

    expect(router.prefetch).callCount(0);

    expect(c.find(ReactRichText).length).to.equal(1);
  });

  it('should not initialize links when target set to "_blank"', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1><a href="/t1" target="_blank">t1</a></div>',
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
    expect(c.html()).contains('<a href="/t1" target="_blank">t1</a>');

    const main = document.querySelector('main');
    const links = main && main.querySelectorAll('a');
    const link = links && links[0];

    expect(router.prefetch).callCount(0);

    link && link.click();

    expect(router.push).callCount(0);

    expect(c.find(ReactRichText).length).to.equal(1);
  });

  it('Should not call prefetch when prefetchLinks is set to false', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const props = {
      field: {
        value:
          '<div id="test"><h1>Prefetch test!</h1><a href="/notprefetched1">1</a><a href="/notprefetched2">2</a></div>',
      },
    };

    const c = mount(
      <Page value={router}>
        <RichText {...props} prefetchLinks={false} />
      </Page>,
      { attachTo: app }
    );

    expect(c.html()).contains('<div id="test">');
    expect(c.html()).contains('<h1>Prefetch test!</h1>');
    expect(c.html()).contains('<a href="/notprefetched1">1</a>');
    expect(c.html()).contains('<a href="/notprefetched2">2</a>');

    expect(router.prefetch).callCount(0);
  });

  it('should render field metadata component when metadata property is present', () => {
    const app = document.createElement('main');

    document.body.appendChild(app);

    const router = Router();

    const testMetadata = {
      contextItem: {
        id: '{09A07660-6834-476C-B93B-584248D3003B}',
        language: 'en',
        revision: 'a0b36ce0a7db49418edf90eb9621e145',
        version: 1,
      },
      fieldId: '{414061F4-FBB1-4591-BC37-BFFA67F745EB}',
      fieldType: 'image',
      rawValue: 'Test1',
    };

    const props = {
      field: {
        value: `
        <div id="test">
          <h1>Hello!</h1>
          <a href="/t10">1</a>
          <a href="/t10">2</a>
          <a href="/contains-children"><span id="child">Title</span></a>
        </div>`,
        metadata: testMetadata,
      },
    };

    const rendered = mount(
      <Page value={router}>
        <RichText {...props} prefetchLinks={false} />
      </Page>,
      { attachTo: app }
    );

    expect(rendered.html()).to.equal(
      [
        `<code type="text/sitecore" chrometype="field" class="scpm" kind="open">${JSON.stringify(
          testMetadata
        )}</code><div>
        `,
        `<div id="test">
          <h1>Hello!</h1>
          <a href="/t10">1</a>
          <a href="/t10">2</a>
          <a href="/contains-children"><span id="child">Title</span></a>
        </div></div><code type="text/sitecore" chrometype="field" class="scpm" kind="close"></code>`,
      ].join('')
    );

    expect(rendered.find('code')).to.have.length(2);
    expect(rendered.html()).to.contain('<div id="test">');
    expect(rendered.html()).to.contain('kind="open"');
    expect(rendered.html()).to.contain('kind="close"');
    expect(rendered.html()).to.contain(JSON.stringify(testMetadata));
  });
});
