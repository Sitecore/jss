/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react';
import { use, expect } from 'chai';
import { NextRouter } from 'next/router';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { RichText, prefetched } from './RichText';
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

    const c = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { baseElement: app }
    ).baseElement;

    expect(c.innerHTML).contains('<div id="test">');
    expect(c.innerHTML).contains('<h1>Hello!</h1>');
    expect(c.innerHTML).contains('<a href="/t10">1</a>');
    expect(c.innerHTML).contains('<a href="/t10">2</a>');
    expect(c.innerHTML).contains('<a href="/contains-children"><span id="child">Title</span></a>');

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

    const initialMountedComponent = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { baseElement: app }
    );

    expect(initialMountedComponent.baseElement.innerHTML).contains('<div id="test">');
    expect(initialMountedComponent.baseElement.innerHTML).contains('<h1>Hello!</h1>');
    expect(initialMountedComponent.baseElement.innerHTML).contains('<a href="/t100">1</a>');
    expect(initialMountedComponent.baseElement.innerHTML).contains('<a href="/t100">2</a>');

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

    initialMountedComponent.unmount();

    const remountedComponent = render(
      <Page value={router}>
        <RichText {...props2} />
      </Page>,
      { baseElement: app }
    );

    expect(remountedComponent.baseElement.innerHTML).contains('<div id="test">');
    expect(remountedComponent.baseElement.innerHTML).contains('<h1>Hello!</h1>');
    expect(remountedComponent.baseElement.innerHTML).contains('<a href="/t20">1</a>');
    expect(remountedComponent.baseElement.innerHTML).contains('<a href="/t20">2</a>');

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

    const c = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { baseElement: app }
    );

    expect(c.baseElement.innerHTML).contains('<div id="test">');
    expect(c.baseElement.innerHTML).contains('<h1>Hello!</h1>');

    expect(router.prefetch).callCount(1);

    const main = document.querySelector('main');
    const links = main && main.querySelectorAll('a');
    const link1 = links && links[0];
    const link2 = links && links[1];

    expect(link1!.href.endsWith('/testpath/t1?test=sample1')).to.be.true;
    expect(link2!.pathname).to.equal('/t2');

    link1 && link1.click();

    expect(router.push).callCount(1);

    link2 && link2.click();

    // Check that push not invoked, because second link don't have event listener
    expect(router.push).callCount(1);

    document.body.removeChild(app);
  });

  it('should not initialize links when does not have value', () => {
    const router = Router();

    const props = {
      field: {},
    };

    render(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(router.prefetch).callCount(0);
  });

  it('should not initialize links if no links in markup', () => {
    const router = Router();

    const props = {
      field: {
        value: '<div id="test"><h1>Hello!</h1></div>',
      },
    };

    const c = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(c.container.innerHTML).contains('<div id="test">');
    expect(c.container.innerHTML).contains('<h1>Hello!</h1>');

    expect(router.prefetch).callCount(0);
  });

  it('should not initialize links when editable', () => {
    const router = Router();

    const props = {
      field: {
        editable: '<div id="test"><h1>Hello!</h1><a href="/t1">t1</a><a href="/t2">t2</a></div>',
      },
    };

    const c = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>
    );

    expect(c.container.innerHTML).contains('<div id="test">');
    expect(c.container.innerHTML).contains('<h1>Hello!</h1>');
    expect(c.container.innerHTML).contains('<a href="/t1">t1</a>');
    expect(c.container.innerHTML).contains('<a href="/t2">t2</a>');

    expect(router.prefetch).callCount(0);
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

    const c = render(
      <Page value={router}>
        <RichText {...props} />
      </Page>,
      { baseElement: app }
    );

    expect(c.baseElement.innerHTML).contains('<div id="test">');
    expect(c.baseElement.innerHTML).contains('<h1>Hello!</h1>');
    expect(c.baseElement.innerHTML).contains('<a href="/t1" target="_blank">t1</a>');

    const main = document.querySelector('main');
    const links = main && main.querySelectorAll('a');
    const link = links && links[0];

    expect(router.prefetch).callCount(0);

    link && link.click();

    expect(router.push).callCount(0);
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

    const c = render(
      <Page value={router}>
        <RichText {...props} prefetchLinks={false} />
      </Page>,
      { baseElement: app }
    );

    expect(c.baseElement.innerHTML).contains('<div id="test">');
    expect(c.baseElement.innerHTML).contains('<h1>Prefetch test!</h1>');
    expect(c.baseElement.innerHTML).contains('<a href="/notprefetched1">1</a>');
    expect(c.baseElement.innerHTML).contains('<a href="/notprefetched2">2</a>');

    expect(router.prefetch).callCount(0);
  });

  it('should call prefetch when prefetchLinks is set to hover', () => {
    const router = Router();

    const props = {
      field: {
        value:
          '<div id="test"><h1>Prefetch test!</h1><a href="/hoverprefetched1">1</a><a href="/hoverprefetched2">2</a></div>',
      },
    };

    const c = render(
      <Page value={router}>
        <RichText {...props} prefetchLinks="hover" />
      </Page>
    );

    expect(c.baseElement.innerHTML).contains('<div id="test">');
    expect(c.baseElement.innerHTML).contains('<h1>Prefetch test!</h1>');
    expect(c.baseElement.innerHTML).contains('<a href="/hoverprefetched1">1</a>');
    expect(c.baseElement.innerHTML).contains('<a href="/hoverprefetched2">2</a>');

    const links = c.container.querySelectorAll('a');
    const link1 = (links && links[0])!;
    const link2 = (links && links[1])!;

    link1.dispatchEvent(new MouseEvent('mouseover'));
    link2.dispatchEvent(new MouseEvent('mouseover'));

    // Verify that prefetch called only once for each link
    link1.dispatchEvent(new MouseEvent('mouseover'));
    link2.dispatchEvent(new MouseEvent('mouseover'));

    expect(router.prefetch).callCount(2);
    expect(prefetched['/hoverprefetched1']).to.equal(true);
    expect(prefetched['/hoverprefetched2']).to.equal(true);
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
      fieldType: 'image',
      rawValue: 'Test1',
    };

    it('should render field metadata component when metadata property is present', () => {
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
          metadata: testMetadata,
        },
      };

      const rendered = render(
        <Page value={router}>
          <RichText {...props} prefetchLinks={false} />
        </Page>,
        { baseElement: app }
      );

      expect(rendered.container.innerHTML).to.equal(
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
    });

    it('should render default empty field placeholder when field value is empty in edit mode metadata', () => {
      const app = document.createElement('main');
      document.body.appendChild(app);
      const router = Router();

      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
      };

      const rendered = render(
        <Page value={router}>
          <RichText {...props} />
        </Page>,
        { baseElement: app }
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

    it('should render custom empty field placeholder when provided, when field value is empty in edit mode metadata', () => {
      const app = document.createElement('main');
      document.body.appendChild(app);
      const router = Router();

      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
      };

      const EmptyFieldEditingComponent: React.FC = () => (
        <span className="empty-field-value-placeholder">Custom Empty field value</span>
      );

      const rendered = render(
        <Page value={router}>
          <RichText {...props} emptyFieldEditingComponent={EmptyFieldEditingComponent} />
        </Page>,
        { baseElement: app }
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

    it('should render nothing when field value is empty, when editing is explicitly disabled in edit mode metadata ', () => {
      const app = document.createElement('main');
      document.body.appendChild(app);
      const router = Router();

      const props = {
        field: {
          value: '',
          metadata: testMetadata,
        },
      };
      const rendered = render(
        <Page value={router}>
          <RichText {...props} editable={false} />
        </Page>,
        { baseElement: app }
      );

      expect(rendered.container.innerHTML).to.equal('');
    });
  });
});
