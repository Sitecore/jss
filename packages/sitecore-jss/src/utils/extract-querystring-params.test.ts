/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { extractQueryStringParams } from './extract-querystring-params';

describe('extractQueryStringParams', () => {
  it('should return empty if locationSearch is empty', () => {
    const params = extractQueryStringParams('', ['Apple', 'Orange', 'Banana']);
    expect(params).to.be.empty;
  });

  it('should return empty if params to extract are empty', () => {
    const params = extractQueryStringParams('?name=value&test=test', []);
    expect(params).to.be.empty;
  });

  it('should return empty if params to extract do not match', () => {
    const params = extractQueryStringParams('?name=value&test=test', ['Apple', 'Orange', 'Banana']);
    expect(params).to.be.empty;
  });

  it('should return params if params to extract do match', () => {
    const params = extractQueryStringParams('?name=value&Orange=test', [
      'Apple',
      'Orange',
      'Banana',
    ]);
    expect(params).to.deep.equal({
      Orange: 'test',
    });
  });

  it('should return params if params to extract do match ignoring case', () => {
    const params = extractQueryStringParams('?name=value&Orange=test&banana=test2', [
      'Apple',
      'Orange',
      'Banana',
    ]);
    expect(params).to.deep.equal({
      Orange: 'test',
      Banana: 'test2',
    });
  });

  it('should return params decoded', () => {
    const params = extractQueryStringParams('?name=value&Orange=test%20and%20test&banana=test2', [
      'Apple',
      'Orange',
      'Banana',
    ]);
    expect(params).to.deep.equal({
      Orange: 'test and test',
      Banana: 'test2',
    });
  });
});
