import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import express from 'express';
import request from 'supertest';
import { editingRouter } from './index';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss/i18n';

describe('editingRouter', () => {
  const siteName = 'TestSite';
  const rootItemId = '{GUID}';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint: 'http://site/?sitecoreContextId=context-id',
  });

  const dictionaryService = new GraphQLDictionaryService({
    siteName,
    rootItemId,
    cacheEnabled: false,
    clientFactory,
  });
  const renderView: SinonSpy = sinon.spy();

  const renderConfig = {
    clientFactory,
    dictionaryService,
    renderView,
    defaultLanguage: 'en',
  };

  const defaultOptions = {
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
  });

  it('should throw 401 CORS error when requested origin is not allowed', (done) => {
    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .set('origin', 'http://not-allowed.com')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.html).to.equal(
          '<html><body>Requests from origin http://not-allowed.com not allowed</body></html>'
        );
        done();
      });
  });

  it('should throw 401 error when editing secret is not set', (done) => {
    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.html).to.equal(
          '<html><body>Missing editing secret - set JSS_EDITING_SECRET environment variable</body></html>'
        );
        done();
      });
  });

  it('should throw 401 error when editing secret is incorrect', (done) => {
    process.env.JSS_EDITING_SECRET = 'correct';

    app.use(editingRouter(defaultOptions));

    request(app)
      .get('/config')
      .query({ secret: 'incorrect' })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.html).to.equal('<html><body>Missing or invalid secret</body></html>');

        delete process.env.JSS_EDITING_SECRET;

        done();
      });
  });

  it('should throw 405 error when not allowed method is used', (done) => {
    process.env.JSS_EDITING_SECRET = 'correct';

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .post('/api/editing/config')
      .query({ secret: 'correct' })
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.html).to.equal(
          '<html><body>Invalid request method or path POST /api/editing/config?secret=correct</body></html>'
        );

        delete process.env.JSS_EDITING_SECRET;

        done();
      });
  });

  it('should throw 405 error when not allowed path is used', (done) => {
    process.env.JSS_EDITING_SECRET = 'correct';

    app.use('/api/editing', editingRouter(defaultOptions));

    request(app)
      .get('/api/editing/fake-config')
      .query({ secret: 'correct' })
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.html).to.equal(
          '<html><body>Invalid request method or path GET /api/editing/fake-config?secret=correct</body></html>'
        );

        delete process.env.JSS_EDITING_SECRET;

        done();
      });
  });

  describe('/config', () => {
    it('should return editing config', (done) => {
      process.env.JSS_EDITING_SECRET = 'correct';

      app.use('/api/editing', editingRouter(defaultOptions));

      request(app)
        .get('/api/editing/config')
        .query({ secret: 'correct' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.deep.equal({
            components: ['component1', 'component2'],
            packages: {
              foo: '1.0.0',
              bar: '2.0.0',
            },
            editMode: 'metadata',
          });

          delete process.env.JSS_EDITING_SECRET;

          done();
        });
    });

    it('should return editing config when components are a map', (done) => {
      process.env.JSS_EDITING_SECRET = 'correct';

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
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.deep.equal({
            components: ['component1', 'component2'],
            packages: {
              foo: '1.0.0',
              bar: '2.0.0',
            },
            editMode: 'metadata',
          });

          delete process.env.JSS_EDITING_SECRET;

          done();
        });
    });

    it('should return editing config when custom request path is set', (done) => {
      process.env.JSS_EDITING_SECRET = 'correct';

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
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.deep.equal({
            components: ['component1'],
            packages: {
              foo: '1.0.0',
            },
            editMode: 'metadata',
          });

          delete process.env.JSS_EDITING_SECRET;

          done();
        });
    });
  });

  describe('/render', () => {
    const requiredParams = ['sc_site', 'sc_itemid', 'sc_lang', 'route', 'mode'];
    // const validQueryParams = {
    //   sc_site: siteName,
    //   sc_itemid: '{Guid}',
    //   sc_lang: 'en',
    //   route: '/',
    //   mode: 'edit',
    // };

    it('should response with 400 for missing query params', (done) => {
      process.env.JSS_EDITING_SECRET = 'correct';

      app.use('/api/editing', editingRouter(defaultOptions));

      request(app)
        .get('/api/editing/render')
        .query({ secret: 'correct' })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.html).to.include(
            `Missing required query parameters: ${requiredParams.join(', ')}`
          );

          delete process.env.JSS_EDITING_SECRET;

          done();
        });
    });

    it('should handle request without optional parameters', (done) => {
      done();
    });
  });
});
