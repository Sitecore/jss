import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { parseEnvValue, parseMultiValueAsRecord } from './env';

use(spies);

describe('env', () => {
  describe('parseMultiValueAsRecord', () => {
    it('should parse Record env variable', () => {
      expect(parseMultiValueAsRecord('{ "TEST": true }')).to.deep.equal({ TEST: true });
    });

    it('should throw error when cant parse env variable', () => {
      const logSpy = spy.on(console, 'log');

      try {
        parseMultiValueAsRecord('{ TEST: true }');
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

  describe('parseEnvValue', () => {
    it('should return empty string when value is not provided', () => {
      expect(parseEnvValue()).to.equal('');
    });

    it('should return string value', () => {
      expect(parseEnvValue('test')).to.equal('test');
    });

    it('should parse record value', () => {
      expect(parseEnvValue('{ "TEST": true }')).to.deep.equal({ TEST: true });
    });

    it('should throw error when cant parse env variable', () => {
      const logSpy = spy.on(console, 'log');

      try {
        parseEnvValue('{ TEST: true }');
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
