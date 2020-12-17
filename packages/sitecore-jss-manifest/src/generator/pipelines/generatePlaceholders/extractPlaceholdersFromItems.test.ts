import { expect } from 'chai';
import extractPlaceholdersFromItems from './extractPlaceholdersFromItems';

describe('generatePlaceholders pipeline', () => {
  describe('extractPlaceholdersFromItems processor', () => {
    it('should add placeholder names to args', () => {
      const expected = ['maple', 'sycamore', 'ash', 'poplar', 'walnut', 'oak', 'pine'];
      const args: any = {
        items: [
          {
            layout: {
              placeholders: expected.slice(0, 2),
            },
          },
          {
            layout: {
              placeholders: expected.slice(2, 5),
            },
          }
        ],
        placeholderNames: expected.slice(5, 7),
      };

      const result = extractPlaceholdersFromItems(args);
      expect(result.placeholderNames).to.have.all.members(expected);
    });
  });
});
