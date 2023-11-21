import { expect } from 'chai';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import { getContentStylesheetLink } from './content-styles';

describe('getContentStylesheetLink', () => {
  it('should return the content stylesheet link with default sitecoreEdgeUrl', () => {
    const expected = {
      href: `${SITECORE_EDGE_URL_DEFAULT}/pages/styles/content-styles.min.css`,
      rel: 'stylesheet',
    };
    const result = getContentStylesheetLink();

    expect(result).to.deep.equal(expected);
  });

  it('should return the content stylesheet link with custom sitecoreEdgeUrl', () => {
    const sitecoreEdgeUrl = 'https://example.com';
    const expected = {
      href: 'https://example.com/pages/styles/content-styles.min.css',
      rel: 'stylesheet',
    };
    const result = getContentStylesheetLink(sitecoreEdgeUrl);

    expect(result).to.deep.equal(expected);
  });
});
