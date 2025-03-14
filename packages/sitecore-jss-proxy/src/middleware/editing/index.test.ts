/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import { editingRouter, EditingRouterConfig } from './index';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { EditingRenderEndpointOptions } from './render';

describe('editingRouter', () => {
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
    process.env.JSS_ALLOWED_ORIGINS = 'http://allowed.com';
  });

  afterEach(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  it('should response 401 CORS error when requested origin is not allowed', (done) => {
    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .set('origin', 'http://not-allowed.com')
      .expect(401, 'Requests from origin http://not-allowed.com are not allowed', done);
  });

  it('should response 401 error when editing secret is not set', (done) => {
    process.env.JSS_EDITING_SECRET = '';

    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .expect(401, 'Missing editing secret - set JSS_EDITING_SECRET environment variable', done);
  });

  it('should response 401 error when editing secret is incorrect', (done) => {
    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .query({ secret: 'incorrect' })
      .expect(401, 'Missing or invalid secret', done);
  });

  it('should response 405 error when not allowed method is used', (done) => {
    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .post('/api/editing/config')
      .query({ secret: 'correct' })
      .expect(405, 'Invalid request method or path POST /api/editing/config?secret=correct', done);
  });

  it('should response 405 error when not allowed path is used', (done) => {
    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/fake-config')
      .query({ secret: 'correct' })
      .expect(
        405,
        'Invalid request method or path GET /api/editing/fake-config?secret=correct',
        done
      );
  });

  it('should response 204 when preflight OPTIONS request is sent', (done) => {
    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .options('/api/editing/config')
      .query({ secret: 'correct' })
      .set('origin', 'http://allowed.com')
      .expect(204, '', done)
      .expect('Access-Control-Allow-Origin', 'http://allowed.com')
      .expect('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH')
      .expect('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  });
});
