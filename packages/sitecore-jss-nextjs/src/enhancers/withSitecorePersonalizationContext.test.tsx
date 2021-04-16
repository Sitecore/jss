/* eslint-disable no-unused-expressions */
import React from 'react';
import { RouteData } from '@sitecore-jss/sitecore-jss';
import { use, expect, spy } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';
import { withSitecorePersonalizationContext } from './withSitecorePersonalizationContext';
import { SitecorePersonalizationContextProps } from '@sitecore-jss/sitecore-jss-react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import * as SitecoreJssReact from '@sitecore-jss/sitecore-jss-react';
import * as SitecoreJss from '@sitecore-jss/sitecore-jss';
import * as SitecoreUtils from '../utils';
import { WithSitecorePersonalizationContextOptions } from '@sitecore-jss/sitecore-jss-react';

use(spies);

describe('withSitecorePersonalizationContext', () => {
  const sandbox = spy.sandbox();
  let testComponentProps: SitecorePersonalizationContextProps;
  let withSitecorePersonalizationContextSpy: ChaiSpies.SpyFunc0Proxy<JSX.Element>;

  const router = {
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
  };
  let TestComponentWithContext: React.FC<SitecorePersonalizationContextProps>;

  afterEach(function() {
    sandbox.restore();
  });

  beforeEach(() => {
    testComponentProps = {
      layoutData: {
        sitecore: {
          route: {} as RouteData,
          context: {},
        },
      },
      isPreview: false,
      isPersonalizationSuppressed: false,
      tracked: false,
    };

    withSitecorePersonalizationContextSpy = spy(() => <div />);
    sandbox.on(SitecoreJssReact, 'withSitecorePersonalizationContext', () => () =>
      withSitecorePersonalizationContextSpy
    );

    TestComponentWithContext = withSitecorePersonalizationContext(
      {} as WithSitecorePersonalizationContextOptions
    )(() => <div />);
  });

  it('should set suppress personalization when query params are not ready and not server rendering', () => {
    sandbox.on(SitecoreUtils, 'areQueryParamsReady', () => false);
    sandbox.on(SitecoreJss, 'isServer', () => false);

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(SitecoreUtils.areQueryParamsReady).have.been.called.with(router);
    expect(withSitecorePersonalizationContextSpy).to.have.been.called.with({
      ...testComponentProps,
      isPersonalizationSuppressed: true,
    });
  });

  it('should not suppress personalization when query params are ready and not server rendering', () => {
    sandbox.on(SitecoreUtils, 'areQueryParamsReady', () => true);
    sandbox.on(SitecoreJss, 'isServer', () => false);

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(withSitecorePersonalizationContextSpy).to.have.been.called.with({
      ...testComponentProps,
      isPersonalizationSuppressed: false,
    });
  });

  it('should not suppress personalization when query params are not ready and server rendering', () => {
    sandbox.on(SitecoreUtils, 'areQueryParamsReady', () => false);
    sandbox.on(SitecoreJss, 'isServer', () => true);

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(withSitecorePersonalizationContextSpy).to.have.been.called.with({
      ...testComponentProps,
      isPersonalizationSuppressed: false,
    });
  });
});
