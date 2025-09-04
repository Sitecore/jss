/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getEdgeProxyContentUrl, getEdgeProxyFormsUrl } from './graphql-edge-proxy';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';

describe('graphql-edge-proxy', () => {
  const sitecoreEdgeContextId = '0730fc5a-3333-5555-5555-08db6d7ddb49';

  describe('getEdgeProxyContentUrl', () => {
    it('should return url', () => {
      const url = getEdgeProxyContentUrl(sitecoreEdgeContextId);

      expect(url).to.equal(
        `${SITECORE_EDGE_URL_DEFAULT}/v1/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49`
      );
    });

    it('should return url when custom sitecoreEdgeUrl is provided', () => {
      const sitecoreEdgeUrl = 'https://test.com';

      const url = getEdgeProxyContentUrl(sitecoreEdgeContextId, sitecoreEdgeUrl);

      expect(url).to.equal(
        'https://test.com/v1/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49'
      );
    });

    it('should return url when sitecoreEdgeUrl ends with /', () => {
      const sitecoreEdgeUrl = 'https://test.com/';

      const url = getEdgeProxyContentUrl(sitecoreEdgeContextId, sitecoreEdgeUrl);

      expect(url).to.equal(
        'https://test.com/v1/content/api/graphql/v1?sitecoreContextId=0730fc5a-3333-5555-5555-08db6d7ddb49'
      );
    });
  });

  describe('getEdgeProxyFormsUrl', () => {
    const formId = 'test-form-id';

    it('should return url', () => {
      const url = getEdgeProxyFormsUrl(sitecoreEdgeContextId, formId);

      expect(url).to.equal(
        `${SITECORE_EDGE_URL_DEFAULT}/v1/forms/publisher/${formId}?sitecoreContextId=${sitecoreEdgeContextId}`
      );
    });

    it('should return url when custom sitecoreEdgeUrl is provided', () => {
      const sitecoreEdgeUrl = 'https://test.com';

      const url = getEdgeProxyFormsUrl(sitecoreEdgeContextId, formId, sitecoreEdgeUrl);

      expect(url).to.equal(
        `https://test.com/v1/forms/publisher/${formId}?sitecoreContextId=${sitecoreEdgeContextId}`
      );
    });

    it('should return url when sitecoreEdgeUrl ends with /', () => {
      const sitecoreEdgeUrl = 'https://test.com/';

      const url = getEdgeProxyFormsUrl(sitecoreEdgeContextId, formId, sitecoreEdgeUrl);

      expect(url).to.equal(
        `https://test.com/v1/forms/publisher/${formId}?sitecoreContextId=${sitecoreEdgeContextId}`
      );
    });
  });
});
