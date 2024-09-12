import express from 'express';
import request from 'supertest';
import { healthCheckMiddleware } from './healthcheck-middleware';

describe('healthcheck middleware - /api/healthz', () => {
  const app = express();

  it('should handle request', async () => {
    app.get('/api/healthz', healthCheckMiddleware());

    request(app)
      .get('/api/halthz')
      .expect(200, 'Healthy');
  });
});
