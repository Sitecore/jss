/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getEdgeProxyContentUrl } from './graphql-edge-proxy';

describe('graphql-edge-proxy', () => {
  describe('getEdgeProxyContentUrl', () => {
    it('should return url', () => {
      const endpoint = 'https://edge.staging';
      const contextId = '0730fc5a-3333-5555-5555-08db6d7ddb49';

      const url = getEdgeProxyContentUrl(endpoint, contextId);

      expect(url).to.equal(
        'https://edge.staging/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49'
      );
    });
  });
});
