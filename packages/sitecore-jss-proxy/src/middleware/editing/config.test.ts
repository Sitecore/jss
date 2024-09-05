/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import { editingRouter, EditingRouterConfig } from './index';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { EditingRenderEndpointOptions } from './render';

describe('editingRouter - /editing/config', () => {
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

  it('should response 200 status code and return editing config', (done) => {
    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/config')
      .query({ secret: 'correct' })
      .expect(
        200,
        {
          components: ['component1', 'component2'],
          packages: {
            foo: '1.0.0',
            bar: '2.0.0',
          },
          editMode: 'metadata',
        },
        done
      );
  });

  it('should response 200 status code and return editing config when components are a map', (done) => {
    app.use(
      '/api/editing',
      editingRouter({
        config: {
          components: new Map([
            ['component1', true],
            ['component2', true],
          ]),
          metadata: {
            packages: {
              foo: '1.0.0',
              bar: '2.0.0',
            },
          },
        },
        render: renderConfig,
      })
    );

    request(app)
      .get('/api/editing/config')
      .query({ secret: 'correct' })
      .expect(
        200,
        {
          components: ['component1', 'component2'],
          packages: {
            foo: '1.0.0',
            bar: '2.0.0',
          },
          editMode: 'metadata',
        },
        done
      );
  });

  it('should response 200 status code and return editing config when custom request path is set', (done) => {
    app.use(
      '/api/editing',
      editingRouter({
        config: {
          components: ['component1'],
          metadata: {
            packages: {
              foo: '1.0.0',
            },
          },
          path: '/foo/config',
        },
        render: renderConfig,
      })
    );

    request(app)
      .get('/api/editing/foo/config')
      .query({ secret: 'correct' })
      .expect(
        200,
        {
          components: ['component1'],
          packages: {
            foo: '1.0.0',
          },
          editMode: 'metadata',
        },
        done
      );
  });
});
