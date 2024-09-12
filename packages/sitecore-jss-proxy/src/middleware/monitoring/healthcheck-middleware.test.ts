import express from 'express';
import request from 'supertest';
import { healthCheckMiddleware } from './index';

describe('editingRouter - /editing/render', () => {
  const app = express();

  it('should handle request', async () => {
    app.get('/api/halthz', healthCheckMiddleware());

    request(app)
      .get('/api/halthz')
      .expect(200, 'Healthy');
  });
});
