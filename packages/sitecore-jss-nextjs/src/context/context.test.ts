/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import sinon from 'sinon';
import { expect } from 'chai';
import { Context } from './';

describe('Context', () => {
  const props = {
    sitecoreEdgeUrl: 'https://edgeurl',
    sitecoreEdgeContextId: 'contextid',
    siteName: 'website',
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

  describe('constructor', () => {
    it('should create a new context', () => {
      const context = new Context<SDKs>(props);

      expect(context.sitecoreEdgeUrl).to.equal(props.sitecoreEdgeUrl);
      expect(context.sitecoreEdgeContextId).to.equal(props.sitecoreEdgeContextId);
      expect(context.siteName).to.equal(props.siteName);
    });
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
        expect(context.SDK.Foo).to.deep.equal(sdks.Foo.sdk);
        expect(context.SDK.Bar).to.deep.equal(sdks.Bar.sdk);

        done();
      });
    });
  });
});
