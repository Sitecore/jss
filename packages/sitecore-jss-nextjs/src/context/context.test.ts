/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import sinon from 'sinon';
import { expect } from 'chai';
import { Context } from './';

describe('Context', () => {
  const props = {
    sitecoreEdgeUrl: 'https://edgeurl',
    sitecoreEdgeContextId: 'contextid',
  };

  const sdks = {
    Foo: {
      sdk: { foo: true },
      init: sinon.stub().callsFake(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(sdks.Foo.sdk);
          }, 300);
        });
      }),
    },
    Bar: {
      sdk: { bar: true },
      create: sinon.stub().callsFake(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(sdks.Bar.sdk);
          }, 500);
        });
      }),
    },
  };

  const initFoo = async () => {
    await sdks.Foo.init();

    return sdks.Foo.sdk;
  };

  const initBar = async () => {
    await sdks.Bar.create();

    return sdks.Bar.sdk;
  };

  type SDKName = keyof typeof sdks;

  type SDKs = {
    [name in SDKName]: typeof sdks[name]['sdk'];
  };

  afterEach(() => {
    sdks.Bar.create.reset();
    sdks.Foo.init.reset();
  });

  describe('initSDK', () => {
    it('should initialize the SDKs', async () => {
      const context = new Context<SDKs>(props);

      await context.initSDK('Foo', initFoo);

      await context.initSDK('Bar', initBar);

      expect(context['SDK'].Foo).to.deep.equal(sdks.Foo.sdk);
      expect(context['SDK'].Bar).to.deep.equal(sdks.Bar.sdk);

      expect(sdks.Foo.init.calledOnce).to.be.true;
      expect(sdks.Bar.create.calledOnce).to.be.true;
    });
  });

  describe('getSDK', () => {
    it('should return the SDKs', (done) => {
      const context = new Context<SDKs>(props);

      context.initSDK('Foo', initFoo);
      context.initSDK('Bar', initBar);

      Promise.all([
        context.getSDK('Foo')?.then((sdk) => {
          expect(sdks.Foo.init.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Foo.sdk);

          return;
        }),
        context.getSDK('Bar')?.then((sdk) => {
          expect(sdks.Bar.create.calledOnce).to.be.true;
          expect(sdk).to.deep.equal(sdks.Bar.sdk);

          return;
        }),
      ]).then(() => {
        expect(context['SDK'].Foo).to.deep.equal(sdks.Foo.sdk);
        expect(context['SDK'].Bar).to.deep.equal(sdks.Bar.sdk);

        done();
      });
    });
  });

  describe('getState', () => {
    it('should return the context state', () => {
      const context = new Context<SDKs>(props);

      expect(context.getState({ siteName: 'xyz' })).to.deep.equal({
        sitecoreEdgeUrl: props.sitecoreEdgeUrl,
        sitecoreEdgeContextId: props.sitecoreEdgeContextId,
        SDK: {},
        siteName: 'xyz',
      });
    });

    it('should return the context state when siteName is not provided', () => {
      const context = new Context<SDKs>(props);

      expect(context.getState()).to.deep.equal({
        sitecoreEdgeUrl: props.sitecoreEdgeUrl,
        sitecoreEdgeContextId: props.sitecoreEdgeContextId,
        SDK: {},
        siteName: '',
      });
    });

    it('should return the context state with SDKs', async () => {
      const context = new Context<SDKs>(props);

      await context.initSDK('Foo', initFoo);

      await context.initSDK('Bar', initBar);

      expect(context.getState()).to.deep.equal({
        sitecoreEdgeUrl: props.sitecoreEdgeUrl,
        sitecoreEdgeContextId: props.sitecoreEdgeContextId,
        SDK: {
          Foo: sdks.Foo.sdk,
          Bar: sdks.Bar.sdk,
        },
        siteName: '',
      });
    });
  });
});
