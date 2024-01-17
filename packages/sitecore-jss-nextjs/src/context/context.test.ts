/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import sinon from 'sinon';
import { expect } from 'chai';
import { Context } from './';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-react';

describe('Context', () => {
  const sdks = {
    Foo: {
      sdk: { foo: true },
      init: () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 300);
        }),
    },
    Bar: {
      sdk: { bar: true },
      init: () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
      },
    },
  };

  const errorSdk = {
    Error: {
      sdk: { error: 'yes' },
      init: () => {
        return new Promise<void>((_, reject) => {
          reject('Cannot init Error');
        });
      },
    },
  };

  const fooInitSpy = sinon.spy(sdks.Foo, 'init');
  const barInitSpy = sinon.spy(sdks.Bar, 'init');

  const props = {
    sitecoreEdgeUrl: 'https://edgeurl',
    sitecoreEdgeContextId: 'contextid',
    siteName: '',
    sdks,
  };

  afterEach(() => {
    fooInitSpy.resetHistory();
    barInitSpy.resetHistory();
  });

  describe('constructor', () => {
    it('should create a new context', () => {
      const context = new Context<typeof sdks>(props);

      expect(context.sitecoreEdgeUrl).to.equal(props.sitecoreEdgeUrl);
      expect(context.sitecoreEdgeContextId).to.equal(props.sitecoreEdgeContextId);
      expect(context.siteName).to.equal(props.siteName);
    });

    it('should provide all the properties when context instance is merged as an object', () => {
      const context = new Context<typeof sdks>(props);

      const merged = { ...context };

      expect(merged.sitecoreEdgeUrl).to.equal(props.sitecoreEdgeUrl);
      expect(merged.sitecoreEdgeContextId).to.equal(props.sitecoreEdgeContextId);
      expect(merged.siteName).to.equal(props.siteName);
      expect(merged.getSDK).to.equal(context.getSDK);
      expect(merged.isInitialized).to.equal(context.isInitialized);
    });
  });

  describe('init', () => {
    it('should initialize the context', (done) => {
      const context = new Context<typeof sdks>(props);

      context.init();

      expect(context.isInitialized).to.be.true;
      expect(context.siteName).to.equal(props.siteName);

      expect(context.sdks.Bar).to.equal(undefined);
      expect(context.sdks.Foo).to.equal(undefined);

      Promise.all([
        context.getSDK('Foo').then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar').then((sdk) => {
          expect(barInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Bar.sdk);

          return;
        }),
      ]).then(() => {
        expect(context.sdks.Foo).to.deep.equal(sdks.Foo.sdk);
        expect(context.sdks.Bar).to.deep.equal(sdks.Bar.sdk);

        done();
      });
    });

    it('should use normal pageMode when context is initialized with empty props', () => {
      const context = new Context<typeof sdks>(props);

      context.init();

      expect(context.isInitialized).to.be.true;
      expect(context.pageState).to.equal(LayoutServicePageState.Normal);
    });

    it('should initialize the context with a different site name', (done) => {
      const context = new Context<typeof sdks>(props);

      context.init({ siteName: 'website' });

      expect(context.isInitialized).to.be.true;
      expect(context.siteName).to.equal('website');

      expect(context.sdks.Bar).to.equal(undefined);
      expect(context.sdks.Foo).to.equal(undefined);

      Promise.all([
        context.getSDK('Foo').then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar').then((sdk) => {
          expect(barInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Bar.sdk);

          return;
        }),
      ]).then(() => {
        expect(context.sdks.Foo).to.deep.equal(sdks.Foo.sdk);
        expect(context.sdks.Bar).to.deep.equal(sdks.Bar.sdk);

        done();
      });
    });

    it('should initialize the context with a different page mode', () => {
      const context = new Context<typeof sdks>(props);

      context.init({ pageState: LayoutServicePageState.Edit });

      expect(context.isInitialized).to.be.true;
      expect(context.pageState).to.equal(LayoutServicePageState.Edit);
    });

    it('should not initialize the context if it is already initialized', () => {
      const context = new Context<typeof sdks>(props);

      context.init({ siteName: 'website-1' });

      expect(context.isInitialized).to.be.true;

      context.init({ siteName: 'website-2' });

      expect(context.siteName).to.equal('website-1');
    });

    it('should not fail context init when an SDK init throws', (done) => {
      const localProps = { ...props, sdks: errorSdk };
      const context = new Context<typeof errorSdk>(localProps);
      try {
        context.init();
      } catch (e) {
        done(e);
      } finally {
        done();
      }
    });

    it('should reject when getting SDK that rejected initialization', (done) => {
      const localProps = { ...props, sdks: errorSdk };
      const context = new Context<typeof errorSdk>(localProps);
      context.init();
      context
        .getSDK('Error')
        .then(() => {
          done('should not resolve');
        })
        .catch((e) => {
          expect(e).to.be.equal('Cannot init Error');
          done();
        });
    });
  });

  describe('getSDK', () => {
    it('should return the SDKs', (done) => {
      const context = new Context<typeof sdks>(props);

      context.init();

      expect(context.sdks.Bar).to.equal(undefined);
      expect(context.sdks.Foo).to.equal(undefined);

      Promise.all([
        context.getSDK('Foo').then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar').then((sdk) => {
          expect(barInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Bar.sdk);

          return;
        }),
      ]).then(() => {
        expect(context.sdks.Foo).to.deep.equal(sdks.Foo.sdk);
        expect(context.sdks.Bar).to.deep.equal(sdks.Bar.sdk);

        done();
      });
    });

    it('should reject unknown SDK', async () => {
      const context = new Context<typeof sdks>(props);
      const sdk = 'Baz';

      context.init();

      return context
        .getSDK(sdk)
        .then(() => {
          throw new Error('should not resolve');
        })
        .catch((e) => {
          expect(e).to.equal(`Unknown SDK '${sdk}'`);
        });
    });
  });
});
