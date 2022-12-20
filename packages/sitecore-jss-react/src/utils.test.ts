import { expect } from 'chai';
import { addClassName, convertAttributesToReactProps, convertStyleAttribute } from './utils';

describe('jss-react utils', () => {
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
  describe('convertAttributesToReactProps', () => {
    it('should covert class and style attributes', () => {
      const inputAttr = {
        class: 'classy',
        style: 'background-color: white; opacity: 0.35; filter: alpha(opacity=35);',
      };

      const expected = {
        className: 'classy',
        style: {
          backgroundColor: 'white',
          opacity: 0.35,
          filter: 'alpha(opacity=35)',
        },
      };

      const outputAttr = convertAttributesToReactProps(inputAttr);
      expect(outputAttr).to.deep.equal(expected);
    });
  });

  describe('addClassName', () => {
    it('should add class attribute value to className', () => {
      const modifiableAttrs = {
        className: 'first-class',
        class: 'second-class',
      };
      addClassName(modifiableAttrs);
      expect(modifiableAttrs).to.deep.equal({
        className: 'first-class second-class',
      });

      it('should convert class attribute value to className when className is absent', () => {
        const modifiableAttrs = {
          class: 'second-class',
        };
        addClassName(modifiableAttrs);
        expect(modifiableAttrs).to.deep.equal({
          className: 'second-class',
        });
      });
    });
  });
});
