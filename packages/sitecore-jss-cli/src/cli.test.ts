import { expect } from 'chai';
import sinon from 'sinon';
import { getPackageScriptCommands } from './cli';
import * as resolvePkg from './resolve-package';

describe('cli', () => {
  describe('getPackageScriptCommands', async () => {
    afterEach(() => {
      sinon.restore();
    });
    const packageJson = {
      scripts: {
        first: 'do --this',
        second: 'do --that',
        third: 'do --all',
      },
    };

    it('should read scripts from package.json', async () => {
      sinon.stub(resolvePkg, 'default').resolves(packageJson);

      const result = await getPackageScriptCommands();

      expect(Object.keys(packageJson.scripts)).to.be.deep.equal(Object.keys(result));
    });
  });
});
