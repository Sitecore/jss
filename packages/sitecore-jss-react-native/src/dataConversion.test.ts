/* tslint:disable:no-unused-expression max-line-length */
import {
  convertPropDataToLayoutServiceFormat,
  convertRouteToLayoutServiceFormat,
} from './dataConversion';
import { RouteData } from '@sitecore-jss/sitecore-jss';
import { convertedDevRouteData, devRouteData } from '../testData/dataConversionTestData/dev-data';

describe('data conversion', () => {
  describe('convertRouteToLayoutServiceFormat', () => {
    it('should assign "editable" keys to fields and nested component fields and rendering params', () => {
      const expected = convertedDevRouteData;
      const actual = convertRouteToLayoutServiceFormat(devRouteData as unknown as RouteData);

      expect(actual).toMatchObject(expected);
    });
  });

  describe('convertPropDataToLayoutServiceFormat', () => {
    describe('when prop value is a primitive type', () => {
      it('should assign prop value object with "editable" keys', () => {
        const propData = {
          prop0: { value: 'string value' },
          prop1: { value: true },
          prop2: { value: 42 },
        };

        const expected = {
          prop0: { value: 'string value', editable: 'string value' },
          prop1: { value: true, editable: true },
          prop2: { value: 42, editable: 42 },
        };

        const actual = convertPropDataToLayoutServiceFormat(propData);
        expect(actual).toMatchObject(expected);
      });
    });

    describe('when prop value is an array', () => {
      it('should recursively assign prop value object with "editable" keys to each property in each item of array', () => {
        const propData = {
          items: [
            {
              name: '',
              fields: {
                prop0: { value: 'string value' },
                prop1: { value: true },
                prop2: { value: 42 },
              },
            },
            {
              name: '',
              fields: {
                prop0: { value: 'string value' },
                prop1: { value: true },
                prop2: { value: 42 },
              },
            },
            {
              name: '',
              fields: {
                prop0: [
                  {
                    name: 'ds',
                    fields: {
                      prop0: { value: 'string value' },
                      prop1: { value: true },
                      prop2: { value: 42 },
                    },
                  },
                ],
              },
            },
          ],
        };

        const expected = {
          items: [
            {
              fields: {
                prop0: { value: 'string value', editable: 'string value' },
                prop1: { value: true, editable: true },
                prop2: { value: 42, editable: 42 },
              },
            },
            {
              fields: {
                prop0: { value: 'string value', editable: 'string value' },
                prop1: { value: true, editable: true },
                prop2: { value: 42, editable: 42 },
              },
            },
            {
              fields: {
                prop0: [
                  {
                    name: 'ds',
                    fields: {
                      prop0: { value: 'string value', editable: 'string value' },
                      prop1: { value: true, editable: true },
                      prop2: { value: 42, editable: 42 },
                    },
                  },
                ],
              },
            },
          ],
        };

        const actual = convertPropDataToLayoutServiceFormat(propData);
        expect(actual).toMatchObject(expected);
      });
    });

    describe('when prop value is an object', () => {
      describe('and prop value object has a "value" property of type "object"', () => {
        it('should add empty "editable" key to prop value object ', () => {
          const propData = {
            prop0: {
              value: { src: '/my img src' },
            },
          };

          const expected = {
            prop0: {
              value: { src: '/my img src' },
              editable: '',
            },
          };

          const actual = convertPropDataToLayoutServiceFormat(propData);
          expect(actual).toMatchObject(expected);
        });
      });
      describe('and prop value object has a non-object "value" property', () => {
        it('should add "editable" key to prop value object', () => {
          const propData = {
            prop0: {
              value: 'non-object value',
            },
          };
          const expected = {
            prop0: {
              value: 'non-object value',
              editable: 'non-object value',
            },
          };

          const actual = convertPropDataToLayoutServiceFormat(propData);
          expect(actual).toMatchObject(expected);
        });
      });
    });
  });
});
