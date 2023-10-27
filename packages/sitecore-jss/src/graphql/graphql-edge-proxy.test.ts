/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getEdgeProxyContentUrl } from './graphql-edge-proxy';

describe('graphql-edge-proxy', () => {
  describe('getEdgeProxyContentUrl', () => {
    it('should return url', () => {
      const sitecoreEdgeContextId = '0730fc5a-3333-5555-5555-08db6d7ddb49';

      const url = getEdgeProxyContentUrl(sitecoreEdgeContextId);

      expect(url).to.equal(
        'https://edge-platform.sitecorecloud.io/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49'
      );
    });

    it('should return url when custom sitecoreEdgeUrl is provided', () => {
      const sitecoreEdgeUrl = 'https://test.com';
      const sitecoreEdgeContextId = '0730fc5a-3333-5555-5555-08db6d7ddb49';

      const url = getEdgeProxyContentUrl(sitecoreEdgeContextId, sitecoreEdgeUrl);

      expect(url).to.equal(
        'https://test.com/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49'
      );
    });
  });
});
