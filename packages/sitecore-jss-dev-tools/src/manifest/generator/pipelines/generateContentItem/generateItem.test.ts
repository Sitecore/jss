/* eslint no-underscore-dangle: "off" */
/* eslint global-require: "off" */

import { expect } from 'chai';
import generateItem from './generateItem';

describe('generateContentItem pipeline', () => {
  describe('generateItem processor', () => {
    it('should generate an item object', () => {
      const expected = {
        name: 'item0',
        displayName: 'item 0',
        template: 'template0',
      };

      const { item: actual } = generateItem({
        content: expected,
      } as any);

      expect(actual).to.eql(expected);
    });

    it('should return received args', () => {
      const expected = {
        content: {
          name: 'item0',
          displayName: 'item 0',
          template: 'template0',
        },
      } as any;

      const result = generateItem(expected);

      expect(result.content).to.eql(expected.content);
      expect(result.item).to.eql(expected.content);
    });
  });
});
