import { expect } from 'chai';
import {
  addClassName,
  convertAttributesToReactProps,
  convertStyleAttribute,
  getAttributesString,
} from './utils';

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

  describe('getAttributesString', () => {
    it('should construct the attributes string correctly', () => {
      const attributes = {
        width: '300',
        className: 'container',
        height: '200',
        style: { width: '100%' },
        alt: 'Example image',
      };

      const result = getAttributesString(attributes);

      const expectedAttributesString =
        'width="300" height="200" style="width:100%" alt="Example image" class="container"';
      expect(result).to.deep.equal(expectedAttributesString);
    });

    it('should return an empty string if no attributes are provided', () => {
      const attributes = {};

      const result = getAttributesString(attributes);

      expect(result).to.eql('');
    });
  });
});
