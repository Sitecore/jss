import { expect, use } from 'chai';
import spies from 'chai-spies';
import { ResponseError, checkStatus } from './data-fetcher';

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

describe('checkStatus', () => {
  it('should throw if status is not ok', () => {
    const response = {
      status: 500,
      statusText: 'Error: 500 Internal Server Error',
      data: {},
    };

    expect(() => {
      checkStatus(response);
    }).to.throw(Error, 'Error: 500 Internal Server Error');
  });
});
