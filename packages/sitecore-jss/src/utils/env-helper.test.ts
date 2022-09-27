import { expect } from 'chai';

import { EnvHelper } from './env-helper';

describe('Env Helper', () => {
  describe('parseEnvValue', () => {
    it('should throw when input value with invlaid json provided', () => {
      const invalidJson = '{abcderef}';

      expect(EnvHelper.parseEnvValue.bind(null, invalidJson)).to.throw();
    });

    it('should return Record when Record input provided', () => {
      const testRecord: Record<string, string> = {
        en: 'value1',
        'da-DA': 'nke',
      };
      const validJson = JSON.stringify(testRecord);

      const result = EnvHelper.parseEnvValue(validJson);

      expect(result).to.deep.equal(testRecord);
    });
    it('should return string when string provided', () => {
      const testInput = 'I"m just a boring string';

      const result = EnvHelper.parseEnvValue(testInput);

      expect(result).to.equal(testInput);
    });
  });
});
