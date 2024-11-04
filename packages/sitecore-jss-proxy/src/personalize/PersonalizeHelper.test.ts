/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { PersonalizeHelper } from './PersonalizeHelper';
import sinon, { spy } from 'sinon';
import { IncomingMessage, OutgoingMessage } from 'http';
import { debug } from '@sitecore-jss/sitecore-jss';
import { expect } from 'chai';

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

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  describe('personalizePageLoad', () => {
    describe('layout not personalized', () => {
      it('disabled', async () => {
        const req = createRequest();
        const res = createResponse();

        const props = {
          disabled: (req: IncomingMessage) => req.url === '/styleguide',
        };

        const { helper } = createHelper(props);

        const layoutData = {
          sitecore: {
            context: {},
            route: {
              name: 'styleguide',
              placeholders: {},
            },
          },
        };

        const personalizedLayout = await helper.personalizePageLoad(req, res, layoutData);

        validateDebugLog('personalize middleware start: %o', {
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

        const layoutData = {
          sitecore: {
            context: {},
            route: {
              name: 'styleguide',
              placeholders: {},
            },
          },
        };

        const personalizedLayout = await helper.personalizePageLoad(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize middleware start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers,
        });
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
        const layoutData = {
          sitecore: {
            context: {},
            route: {
              name: 'styleguide',
              placeholders: {},
            },
          },
        };
        const personalizedLayout = await helper.personalizePageLoad(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize middleware start: %o', {
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

        const layoutData = {
          sitecore: {
            context: {},
            route: {
              name: 'styleguide',
              placeholders: {},
            },
          },
        };

        const personalizedLayout = await helper.personalizePageLoad(req, res, layoutData);

        await validateDebugLog('personalize middleware start: %o', {
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

        const layoutData = {
          sitecore: {
            context: {},
            route: {
              name: 'styleguide',
              placeholders: {},
            },
          },
        };

        const personalizedLayout = await helper.personalizePageLoad(req, res, layoutData);
        const headers = { ...req.headers };

        validateDebugLog('personalize middleware start: %o', {
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

      it('layout is empty', () => {
        // TODO
        expect(true).to.be.true;
      });
    });
  });
});
