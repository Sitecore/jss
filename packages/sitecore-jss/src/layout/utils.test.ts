/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { ComponentRendering } from '../../layout';
import { getFieldValue, getChildPlaceholder, isFieldValueEmpty } from './utils';
import { describe } from 'node:test';

describe('sitecore-jss layout utils', () => {
  describe('getFieldValue', () => {
    const fields = {
      crop: {
        value: 'rice',
      },
    };

    it('should read field from ComponentRendering type', () => {
      const componentRendering: ComponentRendering = {
        componentName: 'uTest',
        fields: fields,
      };

      const result = getFieldValue(componentRendering, 'crop');
      expect(result).to.be.equal('rice');
    });

    it('should read field from Fields type', () => {
      expect(getFieldValue(fields, 'crop')).to.be.equal('rice');
    });

    it('should return default value when field is not found', () => {
      const defaultYield = '1000 tn';
      expect(getFieldValue(fields, 'yield', defaultYield)).to.be.equal(defaultYield);
    });
  });

  describe('getChildPlaceholder', () => {
    it('should return child placeholder', () => {
      const testRendering: ComponentRendering = {
        componentName: 'test',
        placeholders: {
          place: [
            {
              componentName: 'placed',
            },
          ],
          holder: [
            {
              componentName: 'held',
            },
          ],
        },
      };
      const result = getChildPlaceholder(testRendering, 'place');
      expect(result.length).to.be.equal(1);
      expect((result[0] as ComponentRendering).componentName).to.be.equal('placed');
    });
  });

  describe('isFieldValueEmpty', () => {
    it('should return true if passed parameter is not present', () => {
      const field = {};
      const result = isFieldValueEmpty(field);
      expect(result).to.be.true;
    });

    it('should return true if src is empty for GenericFieldValue', () => {
      const fieldValue = {
        src: '',
      };
      const result = isFieldValueEmpty(fieldValue);
      expect(result).to.be.true;
    });

    it('should return true if href is empty for GenericFieldValue', () => {
      const fieldValue = {
        href: '',
      };
      const result = isFieldValueEmpty(fieldValue);
      expect(result).to.be.true;
    });

    it('should return true if src is empty for Field', () => {
      const field = {
        value: {
          src: '',
        },
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.true;
    });

    it('should return true if href is empty for Field', () => {
      const field = {
        value: {
          href: '',
        },
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.true;
    });

    it('should return true if field value is empty for Field', () => {
      const field = {
        value: '',
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.true;
    });

    it('should return false if src is not empty for GenericFieldValue', () => {
      const fieldValue = {
        src: 'imagesrc',
      };
      const result = isFieldValueEmpty(fieldValue);
      expect(result).to.be.false;
    });

    it('should return false if href is not empty for GenericFieldValue', () => {
      const fieldValue = {
        href: 'some.url//',
      };
      const result = isFieldValueEmpty(fieldValue);
      expect(result).to.be.false;
    });

    it('should return false if src is not empty for Field', () => {
      const field = {
        value: {
          src: 'the image src',
        },
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.false;
    });

    it('should return false if href is not empty for Field', () => {
      const field = {
        value: {
          href: 'some.url//',
        },
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.false;
    });

    it('should return false if field value is not empty for Field', () => {
      const field = {
        value: 'field value',
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.false;
    });

    it('should return false if field value has number value', () => {
      const field = {
        value: 1,
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.false;
    });

    it('should return false if field value has value number 0', () => {
      const field = {
        value: 0,
      };
      const result = isFieldValueEmpty(field);
      expect(result).to.be.false;
    });
  });
});
