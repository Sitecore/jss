import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import express from 'express';
import request from 'supertest';
import { editingRouter } from './index';

use(sinonChai);

describe('editingRouter', () => {
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
});
