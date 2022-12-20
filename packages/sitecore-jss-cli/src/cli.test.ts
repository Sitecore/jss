/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { getPackageScriptCommands, makeCommand } from './cli';
import * as resolvePkg from './resolve-package';
import * as packageScript from './run-package-script';
import { Arguments } from 'yargs';

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

    it('should read scripts from package.json and return result with handlers', async () => {
      sinon.stub(resolvePkg, 'default').resolves(packageJson);

      const result = await getPackageScriptCommands();
      const runScriptStub = sinon.stub(packageScript, 'default');
      const mockArgs: Arguments = {
        _: ['arg1', 'arg2'],
        $0: '',
      };

      expect(Object.keys(packageJson.scripts)).to.be.deep.equal(Object.keys(result));
      for (const key of Object.keys(result)) {
        const expectedCommand = makeCommand(key);
        for (const field of Object.keys(expectedCommand)) {
          if (typeof expectedCommand[field] === 'function') {
            expectedCommand[field](mockArgs);
            expect(runScriptStub.called).to.be.true;
          } else {
            expect(result[key][field]).to.deep.equal(expectedCommand[field]);
          }
        }
      }
    });

    it('should return empty result when package.json contents are empty', async () => {
      const emptyPackage = {};

      sinon.stub(resolvePkg, 'default').resolves(emptyPackage);

      const result = await getPackageScriptCommands();

      expect(result).to.deep.equal(emptyPackage);
    });

    it('should ignore jss script entry', async () => {
      const packageJson = {
        scripts: {
          jss: 'do --this',
          second: 'do --that',
          third: 'do --all',
        },
      };
      const { jss: _, ...expectedScripts } = packageJson.scripts;

      sinon.stub(resolvePkg, 'default').resolves(packageJson);

      const result = await getPackageScriptCommands();

      expect(Object.keys(expectedScripts)).to.be.deep.equal(Object.keys(result));
    });
  });
});
