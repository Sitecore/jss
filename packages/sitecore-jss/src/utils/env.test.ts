import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { tryParseEnvValue } from './env';

use(spies);

describe('env', () => {
  describe('tryParseEnvValue', () => {
    it('should return default value when value is not provided', () => {
      expect(tryParseEnvValue(undefined, {})).to.deep.equal({});
    });

    it('should parse value', () => {
      expect(tryParseEnvValue('{ "TEST": true }', {})).to.deep.equal({ TEST: true });
    });

    it('should return default value when value is not a JSON', () => {
      expect(tryParseEnvValue('test', { env: 'test' })).to.deep.equal({ env: 'test' });
    });

    it('should throw error when cant parse provided value', () => {
      const logSpy = spy.on(console, 'log');

      try {
        tryParseEnvValue('{ TEST: true }', {});
      } catch (err) {
        expect(err.message).to.equal('Unexpected token T in JSON at position 2');
        expect(logSpy)
          .on.nth(1)
          .to.be.called.with('Parsing of multivalue env variable failed');
        expect(logSpy)
          .on.nth(2)
          .to.be.called.with('Attempted to parse { TEST: true }');

        spy.restore(console.log);
      }
    });
  });
});
