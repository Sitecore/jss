/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { SinonStub, stub } from 'sinon';
import { TrackingService } from '@sitecore-jss/sitecore-jss-tracking';
import { StubbedInstance, stubConstructor } from 'ts-sinon';
import {
  withCurrentPageTracking,
  withNotFoundPageTracking,
  withPersonalizationAndTracking,
} from './with-personalization-and-tracking';
import { SitecorePageProps } from './page-props';
import { mount } from 'enzyme';
import { LayoutPersonalizationService, RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { NextRouter } from 'next/router';
import * as SitecoreJssNextjs from '@sitecore-jss/sitecore-jss-nextjs';

use(sinonChai);

describe('withCurrentPageTracking', () => {
  let router: NextRouter;
  let trackingService: StubbedInstance<TrackingService>;
  let TestComponentWithContext: React.FC<SitecorePageProps>;
  let testComponentProps: SitecorePageProps;
  let testComponentStub: SinonStub;

  beforeEach(() => {
    trackingService = stubConstructor(TrackingService);

    testComponentProps = {
      locale: 'en',
      dictionary: {},
      componentProps: {},
      layoutData: {
        sitecore: {
          route: {} as RouteData,
          context: {},
        },
      },
      isPreview: false,
      tracked: false,
      notFound: false,
    };
    router = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      events: { emit: stub(), off: stub(), on: stub() },
      push: stub().callsFake(() => Promise.resolve(true)),
      replace: stub().callsFake(() => Promise.resolve(true)),
      reload: stub(),
      back: stub(),
      prefetch: stub().callsFake(() => Promise.resolve()),
      beforePopState: stub(),
    };

    testComponentStub = stub().callsFake(() => <div />);
    TestComponentWithContext = withCurrentPageTracking({ trackingService })(testComponentStub);
  });

  it('should track current page and set tracked to props', () => {
    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage).to.have.been.calledWith(
      testComponentProps.layoutData?.sitecore.context,
      testComponentProps.layoutData?.sitecore.route
    );
    expect(testComponentStub).to.be.calledWith({ ...testComponentProps, tracked: true });
  });

  it('should not track current page if route is not defined', () => {
    testComponentProps.layoutData!.sitecore.route = null;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if in preview', () => {
    testComponentProps.isPreview = true;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if in disconnected mode', () => {
    testComponentProps.layoutData!.sitecore.route!.layoutId = 'available-in-connected-mode';

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if already tracked', () => {
    testComponentProps.tracked = true;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if layoutData is not defined', () => {
    testComponentProps.layoutData = null;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if query params are not ready', () => {
    router.asPath = '?test=test';
    testComponentProps.layoutData = null;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage.called).to.be.false;
  });

  it('should not track current page if on server', () => {
    // set document to undefined to mimic server rendering
    const document = window.document;
    Object.defineProperty(window, 'document', {
      value: undefined,
    });

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    // restore document
    Object.defineProperty(window, 'document', {
      value: document,
    });

    // assert
    expect(trackingService.trackCurrentPage.called).to.be.false;
  });
});

describe('withPersonalizationAndTracking', () => {
  const originalWithSitecorePersonalizationContext =
    SitecoreJssNextjs.withSitecorePersonalizationContext;
  let trackingService: StubbedInstance<TrackingService>;
  let layoutPersonalizationService: StubbedInstance<LayoutPersonalizationService>;
  let testComponentStub: SinonStub;
  let TestComponentWithContext: React.FC<SitecorePageProps>;
  let testComponentProps: SitecorePageProps;
  let router: NextRouter;
  let withSitecorePersonalizationContextStub: SinonStub;

  beforeEach(() => {
    testComponentProps = {
      locale: 'en',
      dictionary: {},
      componentProps: {},
      layoutData: {
        sitecore: {
          route: {} as RouteData,
          context: {},
        },
      },
      isPreview: false,
      tracked: false,
      notFound: false,
    };
    router = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      events: { emit: stub(), off: stub(), on: stub() },
      push: stub().callsFake(() => Promise.resolve(true)),
      replace: stub().callsFake(() => Promise.resolve(true)),
      reload: stub(),
      back: stub(),
      prefetch: stub().callsFake(() => Promise.resolve()),
      beforePopState: stub(),
    };
    trackingService = stubConstructor(TrackingService);
    layoutPersonalizationService = stubConstructor(LayoutPersonalizationService);

    withSitecorePersonalizationContextStub = stub().callsFake(() => (p: React.FC) => p);
    console.log(withSitecorePersonalizationContextStub);
    Object.defineProperty(SitecoreJssNextjs, 'withSitecorePersonalizationContext', {
      value: withSitecorePersonalizationContextStub,
    });

    testComponentStub = stub().callsFake(() => <div />);
    TestComponentWithContext = withPersonalizationAndTracking({
      layoutPersonalizationService,
      trackingService,
    })(testComponentStub);
  });

  afterEach(() => {
    Object.defineProperty(SitecoreJssNextjs, 'withSitecorePersonalizationContext', {
      value: originalWithSitecorePersonalizationContext,
    });
  });

  it('should call track current page', () => {
    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage).to.have.been.calledWith(
      testComponentProps.layoutData?.sitecore.context,
      testComponentProps.layoutData?.sitecore.route
    );
    expect(testComponentStub).to.be.calledWith({ ...testComponentProps, tracked: true });
  });

  it('should call personalization hoc', () => {
    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackCurrentPage).to.have.been.calledWith(
      testComponentProps.layoutData?.sitecore.context,
      testComponentProps.layoutData?.sitecore.route
    );
    expect(withSitecorePersonalizationContextStub.called).to.be.true;
  });
});

describe('withNotFoundPageTracking', () => {
  const originalIsServer = SitecoreJssNextjs.isServer;
  let isServerStub: SinonStub;
  let trackingService: StubbedInstance<TrackingService>;
  let testComponentStub: SinonStub;
  let TestComponentWithContext: React.FC<SitecorePageProps>;
  let testComponentProps: SitecorePageProps;
  let router: NextRouter;

  beforeEach(() => {
    isServerStub = stub().callsFake(() => false);
    Object.defineProperty(SitecoreJssNextjs, 'isServer', {
      value: isServerStub,
    });
    testComponentProps = {
      locale: 'en',
      dictionary: {},
      componentProps: {},
      layoutData: {
        sitecore: {
          route: {} as RouteData,
          context: {},
        },
      },
      isPreview: false,
      tracked: false,
      notFound: false,
    };
    router = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      events: { emit: stub(), off: stub(), on: stub() },
      push: stub().callsFake(() => Promise.resolve(true)),
      replace: stub().callsFake(() => Promise.resolve(true)),
      reload: stub(),
      back: stub(),
      prefetch: stub().callsFake(() => Promise.resolve()),
      beforePopState: stub(),
    };
    trackingService = stubConstructor(TrackingService);

    testComponentStub = stub().callsFake(() => <div />);
    TestComponentWithContext = withNotFoundPageTracking({ trackingService })(testComponentStub);
  });

  afterEach(() => {
    Object.defineProperty(SitecoreJssNextjs, 'isServer', {
      value: originalIsServer,
    });
  });

  it('should track not found page', () => {
    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackPage).to.have.been.calledWith(
      {
        url: 'blank',
        referrer: '',
      },
      { sc_trk: 'Page not found' }
    );
  });

  it('should not track page if query params are not ready', () => {
    router.asPath = '?test=test';
    testComponentProps.layoutData = null;

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackPage.called).to.be.false;
  });

  it('should not track current page if on server', () => {
    isServerStub.returns(true);

    mount(
      <RouterContext.Provider value={router}>
        <TestComponentWithContext {...testComponentProps} />
      </RouterContext.Provider>
    );

    expect(trackingService.trackPage.called).to.be.false;
  });
});
