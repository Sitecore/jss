import { expect, use } from 'chai';
import spies from 'chai-spies';
import { ResponseError } from './data-fetcher';

use(spies);

describe('ResponseError', () => {
  it('should have a response property', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      data: {},
    };
    const error = new ResponseError('message', response);

    expect(error.response).to.equal(response);
  });
});
