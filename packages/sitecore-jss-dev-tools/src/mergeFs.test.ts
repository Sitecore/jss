import { expect } from 'chai';
import { mergeFs } from './';

describe('merge files', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  before(() => {});

  describe('merge route data', () => {
    it('should generate data without error', () => {
      const inputPath = './src/testData/mergeFs/routes';
      return mergeFs(inputPath).then((result) => expect(result).to.not.be.undefined);
    });
  });

  describe('merge non-route data', () => {
    it('should generate data without error', () => {
      const inputPath = './src/testData/mergeFs/non-routes';
      return mergeFs(inputPath).then((result) => expect(result).to.not.be.undefined);
    });
  });

  describe('when inputPath is not defined', () => {
    it('should return an error', () => {
      const inputPath = '';
      return mergeFs(inputPath).catch((err) => expect(err).to.not.be.undefined);
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  after(() => {});
});
