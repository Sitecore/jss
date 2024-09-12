import express from 'express';
import request from 'supertest';
import { healthCheck } from './index';

describe('healthcheck router - /api/healthz', () => {
  const app = express();

  it('should handle request', async () => {
    app.use(healthCheck());

    request(app)
      .get('/api/healthz')
      .expect(200, 'Healthy');
  });
});
