import { expect } from 'chai';
import removeDuplicates from './removeDuplicates';

describe('generatePlaceholders pipeline', () => {
  describe('removeDuplicates processor', () => {
    it('should reduce names to unique simple values', () => {
      const expected = ['oak', 'maple', 'sycamore', 'poplar'];
      const args: any = {
        placeholderNames: [
          '/lorem/oak',
          'oak',
          'maple',
          'sycamore',
          'maple',
          '/lorem/ipsum/maple',
          '/sycamore',
          'poplar',
        ],
      };
      const result = removeDuplicates(args);
      expect(result.placeholderNames).to.have.all.members(expected);
    });
  });
});
