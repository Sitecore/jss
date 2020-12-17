import { expect } from 'chai';
import extractPlaceholdersFromRenderings from './extractPlaceholdersFromRenderings';

describe('generatePlaceholders pipeline', () => {
  describe('extractPlaceholdersFromRenderings processor', () => {
    it('should add placeholder names to args', () => {
      const expected = ['maple', 'sycamore', 'ash', 'poplar', 'walnut', 'oak', 'pine'];

      const args: any = {
        renderings: [
          {
            exposedPlaceholders: expected.slice(0, 2),
          },
          {
            exposedPlaceholders: expected.slice(2, 5),
          }
        ],
        placeholderNames: expected.slice(5, 7),
      };

      const result = extractPlaceholdersFromRenderings(args);
      expect(result.placeholderNames).to.have.all.members(expected);
    });
  });
});
