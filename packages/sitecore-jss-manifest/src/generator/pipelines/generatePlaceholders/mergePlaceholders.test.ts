import { expect } from 'chai';
import mergePlaceholders from './mergePlaceholders';

describe('generatePlaceholders pipeline', () => {
  describe('mergePlaceholders processor', () => {
    it('should add placeholders that are not already in the collection', () => {
      const root = [
        'porg',
      ];

      const existing = [
        {
          name: 'poplar',
          displayName: 'Poplar',
        },
        {
          name: 'sycamore',
          displayName: 'Sycamore',
        },
        {
          name: 'ash',
          displayName: 'Ash',
        },
      ];
      const additional = ['oak', 'maple'];
      const discovered = [...additional, ...existing.slice(0, 2).map((ph) => ph.name)];
      const expected = [...existing, ...additional.map((name) => ({ name })), ...root.map((name) => ({ name }))];

      const args: any = {
        placeholders: existing,
        placeholderNames: discovered,
        rootPlaceholders: root,
      };
      const result = mergePlaceholders(args);
      expect(result.placeholders).to.deep.equal(expected);
    });
  });
});
