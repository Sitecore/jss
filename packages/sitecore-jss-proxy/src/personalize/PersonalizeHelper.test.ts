/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import sinon, { spy } from 'sinon';
import proxyquire from 'proxyquire';
import { IncomingMessage, OutgoingMessage } from 'http';
import { debug } from '@sitecore-jss/sitecore-jss';
import { expect } from 'chai';
import querystring from 'querystring';
import { CdpHelper, personalizeLayout } from '@sitecore-jss/sitecore-jss/personalize';
import { getPersonalizeLayoutData } from './test-data/personalizeData';

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
  const validateEndDebugLog = (message: string, ...params: any[]) => {
    const logParams = debugSpy.args.find((log) => log[0] === message) as Array<unknown>;
    expect(logParams.slice(2)).to.deep.equal([...params], 'Matching end message not found');
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
      defaultLanguage?: string;
      getPersonalizeInfoStub?: sinon.SinonStub;
      personalizeStub?: sinon.SinonStub;
      initPersonalizeServerStub?: sinon.SinonStub;
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

    const personalizeLayoutStub = sinon.stub();
    const getComponentFriendlyIdStub = sinon.stub();
    const getPageFriendlyIdStub = sinon.stub();
    const PersonalizeHelper = proxyquire('./PersonalizeHelper', {
      '@sitecore-jss/sitecore-jss/personalize': {
        // we need to track the method calls, without replacing it with a spy
        personalizeLayout: personalizeLayoutStub.callsFake(
          (layoutData, variantId, componentVariantIds) => {
            return personalizeLayout(layoutData, variantId, componentVariantIds);
          }
        ),
      },
    });

    const helper = new PersonalizeHelper.PersonalizeHelper({
      ...props,
      cdpConfig,
      edgeConfig,
      sitecoreSiteName: siteName,
    });

    const initPersonalizeServer = (helper['initPersonalizeServer'] =
      props.initPersonalizeServerStub || sinon.stub());

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
      personalizeLayoutStub,
      getComponentFriendlyIdStub,
      getPageFriendlyIdStub,
    };
  };

  beforeEach(() => {
    debugSpy.resetHistory();
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

      it('should exclude route', async () => {
        const req = createRequest();
        const res = createResponse();

        const props = {
          excludeRoute: (pathname: string) => pathname === '/styleguide',
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

        validateDebugLog('skipped (route excluded)');

        expect(personalizedLayout).to.deep.equal(defaultLayoutData);
      });
    });
    describe('layout personalization is running', () => {
      const variantIds = ['mountain-bike-audience', 'another-variant', 'third-variant'];
      it('custom fallback hostname is used when request host header is empty', async () => {
        const req = createRequest();
        delete req.headers.host;
        const res = createResponse();

        const props = {
          defaultHostname: 'myhost',
        };

        const { helper, initPersonalizeServer } = createHelper(props);

        await helper.personalizeLayoutData(req, res, defaultLayoutData);

        expect(initPersonalizeServer.called).to.be.true;
        expect(initPersonalizeServer.getCall(0).args[2]).to.equal(props.defaultHostname);
      });

      it('localhost is used as fallback hostname when request host header is empty and defaultHostname not provided', async () => {
        const req = createRequest();
        delete req.headers.host;
        const res = createResponse();

        const { helper, initPersonalizeServer } = createHelper();

        await helper.personalizeLayoutData(req, res, defaultLayoutData);
        expect(initPersonalizeServer.called).to.be.true;

        expect(initPersonalizeServer.getCall(0).args[2]).to.equal('localhost');
      });

      it('locale from context is used', async () => {
        const req = createRequest();
        const res = createResponse();
        const customLang = 'da-DK';
        const {
          helper,
          initPersonalizeServer,
          personalize,
          getPersonalizeInfo,
          personalizeLayoutStub,
        } = createHelper({
          personalizeInfo: { pageId, variantIds },
          variantId: 'mountain-bike-audience',
        });

        const layoutData = getPersonalizeLayoutData('default', customLang);

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        validateDebugLog('personalize layout start: %o', {
          headers: {
            ...req.headers,
          },
          hostname: hostname,
          pathname: '/styleguide',
          language: customLang,
        });
        expect(initPersonalizeServer.calledOnce).to.be.true;
        expect(getPersonalizeInfo.calledWith('/styleguide', customLang)).to.be.true;
        expect(personalize.called).to.be.true;
        expect(personalizeLayoutStub.called).to.be.true;
        const expectedVariantIds = ['mountain-bike-audience'];
        validateEndDebugLog('personalize layout end in %dms: %o', {
          headers: req.headers,
          variantIds: expectedVariantIds,
        });
        const expectedLayout = getPersonalizeLayoutData('mountain-bike-audience', customLang);
        expect(personalizedLayout).to.deep.equal(expectedLayout);
      });

      it('locale from config is used as first fallback when layoutData language is missing', async () => {
        const req = createRequest();
        const res = createResponse();
        const configLang = 'es-ES';
        const {
          helper,
          initPersonalizeServer,
          personalize,
          getPersonalizeInfo,
          personalizeLayoutStub,
        } = createHelper({
          personalizeInfo: { pageId, variantIds },
          variantId: 'mountain-bike-audience',
          defaultLanguage: configLang,
        });

        const layoutData = getPersonalizeLayoutData('default');
        layoutData.sitecore.context.language = '';

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        validateDebugLog('personalize layout start: %o', {
          headers: {
            ...req.headers,
          },
          hostname: hostname,
          pathname: '/styleguide',
          language: configLang,
        });
        expect(initPersonalizeServer.calledOnce).to.be.true;
        expect(getPersonalizeInfo.calledWith('/styleguide', configLang)).to.be.true;
        expect(personalize.called).to.be.true;
        expect(personalizeLayoutStub.called).to.be.true;
        const expectedVariantIds = ['mountain-bike-audience'];
        validateEndDebugLog('personalize layout end in %dms: %o', {
          headers: req.headers,
          variantIds: expectedVariantIds,
        });
        const expectedLayout = getPersonalizeLayoutData('mountain-bike-audience');
        // variantID is populated in layout, but language will not
        expectedLayout.sitecore.context.language = '';
        expect(personalizedLayout).to.deep.equal(expectedLayout);
      });

      it('en locale is used if default fallback is absent', async () => {
        const req = createRequest();
        const res = createResponse();
        const {
          helper,
          initPersonalizeServer,
          personalize,
          getPersonalizeInfo,
          personalizeLayoutStub,
        } = createHelper({
          personalizeInfo: { pageId, variantIds },
          variantId: 'mountain-bike-audience',
        });

        const layoutData = getPersonalizeLayoutData('default');
        layoutData.sitecore.context.language = '';

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        validateDebugLog('personalize layout start: %o', {
          headers: {
            ...req.headers,
          },
          hostname: hostname,
          pathname: '/styleguide',
          language: 'en',
        });
        expect(initPersonalizeServer.calledOnce).to.be.true;
        expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
        expect(personalize.called).to.be.true;
        expect(personalizeLayoutStub.called).to.be.true;
        const expectedVariantIds = ['mountain-bike-audience'];
        validateEndDebugLog('personalize layout end in %dms: %o', {
          headers: req.headers,
          variantIds: expectedVariantIds,
        });
        const expectedLayout = getPersonalizeLayoutData('mountain-bike-audience');
        expectedLayout.sitecore.context.language = '';
        expect(personalizedLayout).to.deep.equal(expectedLayout);
      });

      it('configured scope is used', async () => {
        const req = createRequest();
        const res = createResponse();
        const scope = 'myscope';
        const { helper, personalize } = createHelper({
          personalizeInfo: { pageId, variantIds: ['mountain-bike-audience'] },
          variantId: 'mountain-bike-audience',
          scope,
        });

        const layoutData = getPersonalizeLayoutData('default');

        await helper.personalizeLayoutData(req, res, layoutData);
        expect(
          personalize.calledWith(
            sinon.match({ friendlyId: CdpHelper.getPageFriendlyId(pageId, 'en', scope) }),
            sinon.match.any
          )
        ).to.be.true;
      });

      it('component testing is executed', async () => {
        const req = createRequest();
        const res = createResponse();
        const { helper, personalize } = createHelper({
          personalizeInfo: { pageId, variantIds: ['componentid_variant-id'] },
          variantId: 'componentid_variant-id',
        });

        const layoutData = getPersonalizeLayoutData('default');

        const personalizedLayout = await helper.personalizeLayoutData(req, res, layoutData);

        expect(
          personalize.calledWith(
            sinon.match({
              friendlyId: CdpHelper.getComponentFriendlyId(pageId, 'componentid', 'en'),
            }),
            sinon.match.any
          )
        ).to.be.true;

        const expectedLayout = getPersonalizeLayoutData('componentid_variant-id');
        expect(personalizedLayout).to.deep.equal(expectedLayout);
      });
    });

    describe('error handling', () => {
      it('CloudSDK initialization throws', async () => {
        const error = new Error('init failed');
        const throwInitPersonalizeServer = sinon.stub().throws(error);
        const { helper } = createHelper({
          initPersonalizeServerStub: throwInitPersonalizeServer,
        });
        const req = createRequest();
        const res = createResponse();
        await helper.personalizeLayoutData(req, res, defaultLayoutData);
        validateDebugLog('skipped (CloudSDK initialization failed), error %o', error);
      });

      it('CloudSDK personalize throws', async () => {
        const error = new Error('personalize failed');
        const throwPersonalize = sinon.stub().throws(error);
        const { helper } = createHelper({
          personalizeStub: throwPersonalize,
        });
        const req = createRequest();
        const res = createResponse();
        await helper.personalizeLayoutData(req, res, defaultLayoutData);
        validateDebugLog('skipped, error %o', error);
      });
    });
  });

  describe('getLanguage', () => {
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

    it('should return config.defaultLanguage as first fallback', () => {
      const layoutData = {
        sitecore: {
          context: {},
          route: null,
        },
      };
      const { helper } = createHelper({
        defaultLanguage: 'es-ES',
      });
      expect(helper['getLanguage'](layoutData)).to.equal('es-ES');
    });

    it('should return "en" as fallback when config value is absent', () => {
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

  describe('getExperienceParams', () => {
    it('should correctly parse utm input values', () => {
      const utmTest = {
        utm_campaign: 'campaing',
        utm_content: 'content',
        utm_medium: 'medium',
        utm_source: 'source',
      };
      const qs = querystring.stringify(utmTest);
      const req = createRequest({ url: `/styleguide?${qs}` });
      const { helper } = createHelper();
      const result = helper['getExperienceParams'](req);
      expect(result.utm).to.deep.equal({
        campaign: utmTest.utm_campaign,
        content: utmTest.utm_content,
        medium: utmTest.utm_medium,
        source: utmTest.utm_source,
      });
    });

    it('should correctly parse referer header', () => {
      const req = createRequest({
        headers: {
          referer: 'withoner',
        },
      });
      const { helper } = createHelper();
      const result = helper['getExperienceParams'](req);
      expect(result.referrer).to.equal('withoner');
    });

    it('should correctly parse referrer header', () => {
      const req = createRequest({
        headers: {
          referrer: ['http://', 'withtwors'],
        },
      });
      const { helper } = createHelper();
      const result = helper['getExperienceParams'](req);
      expect(result.referrer).to.equal('http://withtwors');
    });
  });
});
