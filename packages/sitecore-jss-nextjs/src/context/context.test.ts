/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import sinon from 'sinon';
import { expect } from 'chai';
import { Context } from './';

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
        context.getSDK('Foo')?.then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar')?.then((sdk) => {
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

    it('should initialize the context with a different site name', (done) => {
      const context = new Context<typeof sdks>(props);

      context.init({ siteName: 'website' });

      expect(context.isInitialized).to.be.true;
      expect(context.siteName).to.equal('website');

      expect(context.sdks.Bar).to.equal(undefined);
      expect(context.sdks.Foo).to.equal(undefined);

      Promise.all([
        context.getSDK('Foo')?.then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar')?.then((sdk) => {
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

    it('should not initialize the context if it is already initialized', () => {
      const context = new Context<typeof sdks>(props);

      context.init({ siteName: 'website-1' });

      expect(context.isInitialized).to.be.true;

      context.init({ siteName: 'website-2' });

      expect(context.siteName).to.equal('website-1');
    });
  });

  describe('getSDK', () => {
    it('should return the SDKs', (done) => {
      const context = new Context<typeof sdks>(props);

      context.init();

      expect(context.sdks.Bar).to.equal(undefined);
      expect(context.sdks.Foo).to.equal(undefined);

      Promise.all([
        context.getSDK('Foo')?.then((sdk) => {
          expect(fooInitSpy.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar')?.then((sdk) => {
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
  });
});
