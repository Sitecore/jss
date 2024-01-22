/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { ComponentRendering } from '../../layout';
import { getFieldValue, getChildPlaceholder } from './utils';

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
});
