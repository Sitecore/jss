/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import { editingRouter, EditingRouterConfig } from './index';
import { getPersonalizeLayoutData } from '../../personalize/test-data/personalizeData';
import { debug, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import {
  GraphQLEditingService,
  LayoutKind,
  RenderMetadataQueryParams,
  EDITING_ALLOWED_ORIGINS,
} from '@sitecore-jss/sitecore-jss/editing';
import { EditingRenderEndpointOptions, getSCPHeader } from './render';
import { LayoutServiceData, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { DictionaryPhrases } from '@sitecore-jss/sitecore-jss/types/i18n';

describe('editingRouter - /editing/render', () => {
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint: 'http://site/?sitecoreContextId=context-id',
  });

  const renderView: sinon.SinonStub = sinon.stub();

  const renderConfig: EditingRenderEndpointOptions = {
    clientFactory,
    renderView,
  };

  const defaultOptions: EditingRouterConfig = {
    config: {
      components: ['component1', 'component2'],
      metadata: {
        packages: {
          foo: '1.0.0',
          bar: '2.0.0',
        },
      },
    },
    render: renderConfig,
  };

  let app: express.Express;

  beforeEach(() => {
    app = express();

    process.env.JSS_EDITING_SECRET = 'correct';
  });

  afterEach(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  const requiredParams = ['sc_site', 'sc_itemid', 'sc_lang', 'route', 'mode'];

  const validQS: RenderMetadataQueryParams = {
    secret: 'correct',
    sc_site: 'site',
    sc_itemid: '{Guid}',
    sc_lang: 'en',
    sc_layoutKind: LayoutKind.Shared,
    sc_version: '1',
    route: '/',
    mode: LayoutServicePageState.Edit,
  };

  const fetchEditingDataArgs = {
    siteName: validQS.sc_site,
    itemId: validQS.sc_itemid,
    language: validQS.sc_lang,
    version: validQS.sc_version,
    layoutKind: validQS.sc_layoutKind,
  };

  let fetchEditingDataStub: sinon.SinonStub;

  before(() => {
    fetchEditingDataStub = sinon.stub(GraphQLEditingService.prototype, 'fetchEditingData');
  });

  afterEach(() => {
    fetchEditingDataStub.resetHistory();
    renderView.resetHistory();
  });

  it('should response 400 error when missing required query params', (done) => {
    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/render')
      .query({ secret: 'correct' })
      .expect(400, `Missing required query parameters: ${requiredParams.join(', ')}`, done);
  });

  it('should response 500 error when unable to fetch editing data', (done) => {
    const debugStub = sinon.stub(debug, 'editing');

    fetchEditingDataStub.rejects(new Error('Unable to fetch editing data'));

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(500, 'Internal Server Error')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;

        const debugErrorMessage = debugStub.getCall(debugStub.callCount - 1).args;

        expect(debugErrorMessage[0]).to.equal('response error %o');
        expect(debugErrorMessage[1]).to.deep.equal(new Error('Unable to fetch editing data'));

        debugStub.restore();
      })
      .end(done);
  });

  it('should response 500 error when editing data is empty', (done) => {
    const debugStub = sinon.stub(debug, 'editing');

    fetchEditingDataStub.resolves(null as any);

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(500, 'Internal Server Error')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;

        const debugErrorMessage = debugStub.getCall(debugStub.callCount - 1).args;

        expect(debugErrorMessage[0]).to.equal('response error %o');
        expect(debugErrorMessage[1]).to.deep.equal(
          new Error(`Unable to fetch editing data for ${JSON.stringify(validQS)}`)
        );

        debugStub.restore();
      })
      .end(done);
  });

  it('should response 500 error when editing layout data is empty', (done) => {
    const debugStub = sinon.stub(debug, 'editing');

    fetchEditingDataStub.resolves({
      layoutData: (null as unknown) as LayoutServiceData,
      dictionary: {},
    });

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(500, 'Internal Server Error')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;

        const debugErrorMessage = debugStub.getCall(debugStub.callCount - 1).args;

        expect(debugErrorMessage[0]).to.equal('response error %o');
        expect(debugErrorMessage[1]).to.deep.equal(
          new Error(`Unable to fetch editing data for ${JSON.stringify(validQS)}`)
        );

        debugStub.restore();
      })
      .end(done);
  });

  it('should response 500 error when editing dictionary data is empty', (done) => {
    const debugStub = sinon.stub(debug, 'editing');

    fetchEditingDataStub.resolves({
      layoutData: {
        sitecore: {
          context: { pageEditing: true },
          route: null,
        },
      },
      dictionary: (null as unknown) as DictionaryPhrases,
    });

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(500, 'Internal Server Error')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;

        const debugErrorMessage = debugStub.getCall(debugStub.callCount - 1).args;

        expect(debugErrorMessage[0]).to.equal('response error %o');
        expect(debugErrorMessage[1]).to.deep.equal(
          new Error(`Unable to fetch editing data for ${JSON.stringify(validQS)}`)
        );

        debugStub.restore();
      })
      .end(done);
  });

  it('should response 500 error when renderView returns error', (done) => {
    const debugStub = sinon.stub(debug, 'editing');

    const layoutData = { sitecore: { context: { pageEditing: true }, route: null } };
    const dictionary = {};

    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(new Error('Unable to render view'), null));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          renderView,
        },
      })
    );

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(500, 'Internal Server Error')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', layoutData, {
            dictionary,
          })
        ).to.be.true;

        const debugErrorMessage = debugStub.getCall(debugStub.callCount - 1).args;

        expect(debugErrorMessage[0]).to.equal('response error %o');
        expect(debugErrorMessage[1]).to.deep.equal(new Error('Unable to render view'));

        debugStub.restore();
      })
      .end(done);
  });

  it('should response 204 status code when renderView returns empty result', (done) => {
    const layoutData = { sitecore: { context: { pageEditing: true }, route: null } };
    const dictionary = {};

    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(null, null));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          renderView,
        },
      })
    );

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(204, '')
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', layoutData, {
            dictionary,
          })
        ).to.be.true;
      })
      .end(done);
  });

  it('should response 200 status code when renderView returns result', (done) => {
    const layoutData = {
      sitecore: { context: { pageEditing: true }, route: { name: '/', placeholders: {} } },
    };
    const dictionary = {};

    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(null, { html: '<div>Hello World</div>' }));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          renderView,
        },
      })
    );

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(200, '<div>Hello World</div>')
      .expect('Content-Security-Policy', `${getSCPHeader()}`)
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', layoutData, {
            dictionary,
          })
        ).to.be.true;
      })
      .end(done);
  });

  it('should response 200 status code when layout is personalized and renderView returns result', (done) => {
    const layoutData = getPersonalizeLayoutData('default');
    const dictionary = {};
    const personalizeQs = {
      ...validQS,
      sc_variant: 'mountain-bike-audience',
    };
    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(null, { html: '<div>Hello World</div>' }));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          renderView,
        },
      })
    );

    const personalizedLayoutData = getPersonalizeLayoutData('mountain-bike-audience');

    request(app)
      .get('/api/editing/render')
      .query(personalizeQs)
      .expect(200, '<div>Hello World</div>')
      .expect('Content-Security-Policy', `${getSCPHeader()}`)
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', personalizedLayoutData, {
            dictionary,
          })
        ).to.be.true;
      })
      .end(done);
  });

  it('should response 200 status code when renderView return result and custom endpoint path is used', (done) => {
    const layoutData = {
      sitecore: {
        context: { pageEditing: true },
        route: { name: '/', placeholders: {} },
      },
    };
    const dictionary = {};

    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(null, { html: '<div>Hello World</div>' }));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          path: '/foo/render',
          renderView,
        },
      })
    );

    request(app)
      .get('/api/editing/foo/render')
      .query(validQS)
      .expect(200, '<div>Hello World</div>')
      .expect('Content-Security-Policy', `${getSCPHeader()}`)
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', layoutData, {
            dictionary,
          })
        ).to.be.true;
      })
      .end(done);
  });

  it('should response 404 status code when renderView returns not found route', (done) => {
    const layoutData = {
      sitecore: {
        context: { pageEditing: true },
        route: null,
      },
    };
    const dictionary = {};

    fetchEditingDataStub.resolves({
      layoutData,
      dictionary,
    });

    renderView.callsFake((callback) => callback(null, { html: '<div>Not Found</div>' }));

    app.use(
      '/api/editing',
      editingRouter({
        ...defaultOptions,
        render: {
          ...defaultOptions.render,
          renderView,
        },
      })
    );

    request(app)
      .get('/api/editing/render')
      .query(validQS)
      .expect(404, '<div>Not Found</div>')
      .expect('Content-Security-Policy', `${getSCPHeader()}`)
      .expect(() => {
        expect(fetchEditingDataStub.calledOnceWith(fetchEditingDataArgs)).to.be.true;
        expect(
          renderView.calledOnceWith(sinon.match.func, '/', layoutData, {
            dictionary,
          })
        ).to.be.true;
      })
      .end(done);
  });
});

describe('getSCPHeader', () => {
  afterEach(() => {
    delete process.env.JSS_ALLOWED_ORIGINS;
  });

  it('should return the value of the CSP header', () => {
    process.env.JSS_ALLOWED_ORIGINS = 'https://pages-dev.sitecore-staging.cloud';
    const expectedHeader = `frame-ancestors 'self' https://pages-dev.sitecore-staging.cloud ${EDITING_ALLOWED_ORIGINS.join(
      ' '
    )}`;
    const actualHeader = getSCPHeader();
    expect(actualHeader).to.equal(expectedHeader);
  });

  it('should return the value of the CSP header when multiple origins are listed in JSS_ALLOWED_ORIGINS', () => {
    process.env.JSS_ALLOWED_ORIGINS =
      'https://pages-dev.sitecore-staging.cloud,https://pages-staging.sitecore-staging.cloud';
    const expectedHeader = `frame-ancestors 'self' https://pages-dev.sitecore-staging.cloud https://pages-staging.sitecore-staging.cloud ${EDITING_ALLOWED_ORIGINS.join(
      ' '
    )}`;
    const actualHeader = getSCPHeader();
    expect(actualHeader).to.equal(expectedHeader);
  });
});
