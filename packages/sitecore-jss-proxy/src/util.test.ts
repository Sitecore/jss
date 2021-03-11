import { expect } from 'chai';
import { buildQueryString, tryParseJson } from './util';

describe('tryParseJson', () => {
  it('should return parsed object when the string is json', () => {
    const expected = { test: 'test' };
    const actual = tryParseJson('{ "test": "test" }');
    expect(actual.test).to.equal(expected.test);
  });

  it('should return false when the string is not json', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(tryParseJson('<html />')).to.be.null;
  });
});

describe('buildQueryString', () => {
  it('should return querystring format for object', () => {
    const data = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3',
    };

    const expected = 'param1=value1&param2=value2&param3=value3';

    const actual = buildQueryString(data);

    expect(actual).to.eql(expected);
  });
});
