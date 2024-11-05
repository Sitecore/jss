/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { PersonalizeHelper } from './PersonalizeHelper';
import sinon, { spy, stub } from 'sinon';
import { IncomingMessage, OutgoingMessage } from 'http';
import { debug } from '@sitecore-jss/sitecore-jss';
import { expect } from 'chai';
import * as CDPCore from '@sitecore-cloudsdk/core/server';
import { beforeEach } from 'node:test';

describe('PersonalizeHelper', () => {
  const hostname = 'foo.net';
  const siteName = 'bar';

  const debugSpy = spy(debug, 'personalize');
  const validateDebugLog = (message: string, ...params: any[]) => {
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal(
      [message, ...params],
      'Message not found in debug log: ' + [message, ...params].join(' ') + '\n'
    );
  };

  const defaultLayoutData = {
    sitecore: {
      context: {
        itemPath: '/styleguide',
        language: 'en',
      },
      route: {
        name: 'styleguide',
        placeholders: {},
      },
    },
  };

  const pageId = 'item-id';
  const variantIds = ['variant-1', 'variant-2'];
  // const defaultLang = 'en';
  // const referrer = 'http://localhost:3000';
  const createRequest = (props: any = {}) => {
    const req = {
      url: '/styleguide',
      headers: {
        host: hostname,
      },
      ...props,
    } as IncomingMessage;

    // Object.defineProperties(req.head, {
    //   set: {
    //     value: (key: string, value: any) => {
    //       req.headers[key] = value;
    //     },
    //     enumerable: false,
    //   },
    //   forEach: {
    //     value: (cb: any) => {
    //       Object.keys(req.headers).forEach((key) => cb(req.headers[key], key, req.headers));
    //     },
    //     enumerable: false,
    //   },
    // });

    return req;
  };

  const createResponse = (props: any = {}) => {
    const res = {
      ...props,
    } as OutgoingMessage;

    return res;
  };

  const createHelper = (
    props: {
      [key: string]: unknown;
      language?: string;
      edgeConfig?: any;
      cdpConfig?: any;
      scope?: string;
      variantId?: string;
      personalizeInfo?: {
        pageId: string;
        variantIds: string[];
      } | null;
      getPersonalizeInfoStub?: sinon.SinonStub;
      personalizeStub?: sinon.SinonStub;
    } = {}
  ) => {
    const cdpConfig = {
      sitecoreEdgeContextId: '0000-0000-0000',
      sitecoreEdgeUrl: 'https://foo.bar',
      ...(props?.cdpConfig || {}),
    };
    const clientFactory = GraphQLRequestClient.createClientFactory({
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
    });
    const edgeConfig = {
      clientFactory,
      ...(props?.edgeConfig || {}),
    };

    const helper = new PersonalizeHelper({
      ...props,
      cdpConfig,
      edgeConfig,
      sitecoreSiteName: siteName,
    });

    const initPersonalizeServer = (helper['initPersonalizeServer'] = sinon.stub());

    const personalize = (helper['personalize'] =
      props.personalizeStub ||
      sinon.stub().returns(
        Promise.resolve({
          variantId: props.variantId,
        })
      ));

    const getPersonalizeInfo = (helper['personalizeService']['getPersonalizeInfo'] =
      props.getPersonalizeInfoStub ||
      sinon.stub().returns(
        Promise.resolve(
          props.personalizeInfo === null
            ? undefined
            : props.personalizeInfo || {
                pageId,
                variantIds,
              }
        )
      ));

    return {
      helper,
      getPersonalizeInfo,
      initPersonalizeServer,
      personalize,
    };
  };

  const cdpCoreStub = stub(CDPCore, 'CloudSDK');

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  // TODO: find out why CloudSDK stub is not invoked
  xdescribe('initPersonalizeServer', () => {
    beforeEach(() => {
      cdpCoreStub.reset();
    });
    const req = createRequest();
    const res = createResponse();
    it('should use provided cookie hostname when provided', async () => {
      const helperProps = {
        defaultHostname: 'http://notlocalhost',
      };
      const { helper } = createHelper(helperProps);
      const expectedHost = 'myhost';
      await helper.initPersonalizeServer(req, res, expectedHost);
      expect(cdpCoreStub.called).to.be.true;
      const cdpSettings = cdpCoreStub.callArg(2);
      expect(cdpSettings).to.equal(expectedHost);
    });

    it('should use host headers hostname valueas first fallback', async () => {
      const helperProps = {
        defaultHostname: 'http://notlocalhost',
      };
      const { helper } = createHelper(helperProps);
      await helper.initPersonalizeServer(req, res);
      expect(cdpCoreStub.called).to.be.true;
      const cdpSettings = cdpCoreStub.callArg(2);
      expect(cdpSettings).to.equal(hostname);
    });

    it('should default config hostname when all else absent', async () => {
      const helperProps = {
        defaultHostname: 'http://notlocalhost',
      };
      const { helper } = createHelper(helperProps);
      await helper.initPersonalizeServer(req, res);
      expect(cdpCoreStub.called).to.be.true;
      const cdpSettings = cdpCoreStub.callArg(2);
      expect(cdpSettings).to.equal(helperProps.defaultHostname);
    });
  });

  describe('personalizeLayoutData', () => {
    describe('layout not personalized', () => {
      it('disabled', async () => {
        const req = createRequest();
        const res = createResponse();

        const props = {
          disabled: (req: IncomingMessage) => req.url === '/styleguide',
        };

        const { helper } = createHelper(props);

        const layoutData = defaultLayoutData;

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        validateDebugLog('personalize layout start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers: {
            ...req.headers,
          },
        });

        validateDebugLog('skipped (personalize is disabled)');

        expect(layoutData).to.deep.equal(personalizedLayout);
      });

      it('personalize info not found', async () => {
        const req = createRequest();
        const res = createResponse();
        const { helper, getPersonalizeInfo } = createHelper({
          personalizeInfo: null,
        });

        const layoutData = defaultLayoutData;

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize layout start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers,
        });
        console.log(getPersonalizeInfo.getCalls());
        expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
        validateDebugLog('skipped (personalize info not found)');
        expect(personalizedLayout).to.deep.equal(layoutData);
      });

      it('no personalization configured', async () => {
        const req = createRequest();
        const res = createResponse();
        const { helper, getPersonalizeInfo } = createHelper({
          personalizeInfo: {
            pageId,
            variantIds: [],
          },
        });
        const layoutData = defaultLayoutData;
        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize layout start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers,
        });
        expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
        validateDebugLog('skipped (no personalization configured)');
        expect(personalizedLayout).to.deep.equal(layoutData);
      });

      it('no variant identified', async () => {
        const req = createRequest();
        const res = createResponse();
        const { helper, getPersonalizeInfo, initPersonalizeServer, personalize } = createHelper({
          variantId: undefined,
        });
        const headers = { ...req.headers };

        const layoutData = defaultLayoutData;

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        await validateDebugLog('personalize layout start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers,
        });
        expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
        expect(initPersonalizeServer.called).to.be.true;
        expect(personalize.called).to.be.true;

        validateDebugLog('skipped (no variant(s) identified)');

        expect(personalizedLayout).to.deep.equal(layoutData);
      });

      it('invalid variant', async () => {
        const req = createRequest();
        const res = createResponse();
        const invalidVariant = 'invalid-variant';
        const { helper, getPersonalizeInfo, initPersonalizeServer, personalize } = createHelper({
          personalizeInfo: {
            pageId,
            variantIds,
          },
          variantId: invalidVariant,
        });

        const layoutData = defaultLayoutData;

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize layout start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers,
        });

        expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
        expect(initPersonalizeServer.called).to.be.true;
        expect(personalize.called).to.be.true;
        validateDebugLog('invalid variant %s', invalidVariant);
        expect(personalizedLayout).to.deep.equal(layoutData);
      });

      it('layout is empty', async () => {
        const req = createRequest();
        const res = createResponse();
        const emptyLayoutData = {
          ...defaultLayoutData,
          sitecore: {
            ...defaultLayoutData.sitecore,
            route: null,
          },
        };
        const { helper } = createHelper();
        const personalizedLayout = await helper.personalizeLayoutData(req, res, emptyLayoutData);
        expect(personalizedLayout).to.deep.equal(emptyLayoutData);
        validateDebugLog('skipped (layout is empty)');
        expect(true).to.be.true;
      });

      // TODO
      xit('should personalize layout', async () => {
        expect(true).to.be.true;
      });

      // TODO
      xit('should exclude route, when instructed to', async () => {
        expect(true).to.be.true;
      });
    });
  });

  describe('getLanguge', () => {
    it('should read language from layoutData context', () => {
      const layoutData = {
        sitecore: {
          context: {
            language: 'da-DK',
          },
          route: null,
        },
      };
      const { helper } = createHelper();
      expect(helper['getLanguage'](layoutData)).to.equal('da-DK');
    });
    it('should return "en" by default', () => {
      const layoutData = {
        sitecore: {
          context: {},
          route: null,
        },
      };
      const { helper } = createHelper();
      expect(helper['getLanguage'](layoutData)).to.equal('en');
    });
  });

  describe('getHostHeaders', () => {
    it('should read host header from request', () => {
      const req = createRequest();
      const { helper } = createHelper();
      expect(helper['getHostHeader'](req)).to.equal(hostname);
    });
  });
});
