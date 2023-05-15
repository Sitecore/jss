import { expect } from 'chai';
import { convertStyleAttribute } from './utils';

describe('convertStyleAttribute', () => {
  it('should return object representation of style attribute names and values', () => {
    const data = {
      style: 'background-color: white; opacity: 0.35; filter: alpha(opacity=35);',
    };

    const expected = {
      backgroundColor: 'white',
      opacity: 0.35,
      filter: 'alpha(opacity=35)',
    };

    const actual = convertStyleAttribute(data.style);
    expect(actual).to.eql(expected);
  });
});
