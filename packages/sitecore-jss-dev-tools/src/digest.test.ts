import { expect } from 'chai';
import { digest, hmac } from './digest';

describe('digest', () => {
  describe('digest', () => {
    it('should generate expected file hash', () => {
      const inputPath = './src/testData/digest/hello.txt';
      return digest(inputPath).then((result) => expect(result).to.equal('uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek='));
    });
  });

  describe('hmac', () => {
    it('should generate expected HMAC with one factor', () => {
      const secret = 'movezig';
      const factors = [ 'hello' ];
      expect(hmac(factors, secret)).to.equal('sMbb3tOTS9cPb2o0KAfDrBODcdvp8EOW7P9u2TpPvl8=');
    });

    it('should generate expected lowercase HMAC with uppercase input', () => {
      const secret = 'movezig';
      const factors = [ 'HELLO', 'wOrlD' ];
      const lcFactors = [ 'hello', 'world' ];
      expect(hmac(factors, secret)).to.equal(hmac(lcFactors, secret));
    });
  });
});
