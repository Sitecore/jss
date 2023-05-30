/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import { editLineEndings, getItems, scaffoldFile } from './utils';

describe('utils', () => {
  describe('getItems', () => {
    afterEach(() => {
      sinon.restore();
    });

    const baseDirent = {
      isFile: function(): boolean {
        return false;
      },
      isDirectory: function(): boolean {
        return false;
      },
      isBlockDevice: function(): boolean {
        return false;
      },
      isCharacterDevice: function(): boolean {
        return false;
      },
      isSymbolicLink: function(): boolean {
        return false;
      },
      isFIFO: function(): boolean {
        return false;
      },
      isSocket: function(): boolean {
        return false;
      },
      name: '',
    };

    const setupFolderTest = (path: string) => {
      const callbackStub = sinon.stub();
      return {
        input: {
          path: path,
          resolveItem: (_: any, name: string) => {
            return name;
          },
          cb: callbackStub,
        },
        parentDir: {
          ...baseDirent,
          isDirectory: () => true,
          name: 'parent',
        },
        childFile: {
          ...baseDirent,
          isFile: () => true,
          name: 'child.tsx',
        },
        resolveItemCb: callbackStub,
      };
    };

    it('should return empty array when path does not exist', () => {
      const path = 'C:/Windows';
      const input = {
        path: path,
        resolveItem: () => {},
        cb: () => {},
      };
      const existsSyncStub = sinon.stub(fs, 'existsSync').returns(false);
      const result = getItems(input);

      expect(existsSyncStub.calledWith(path)).to.equal(true);
      expect(result).to.deep.equal([]);
    });

    it('should check folders recursively', () => {
      const path = 'C:/Windows';
      const { input, parentDir, childFile } = setupFolderTest(path);
      sinon.stub(fs, 'existsSync').returns(true);
      const readDirStub = sinon.stub(fs, 'readdirSync');
      readDirStub.withArgs(path, { withFileTypes: true }).returns([parentDir]);
      readDirStub.withArgs(`${path}/parent`, { withFileTypes: true }).returns([childFile]);

      const result = getItems(input);

      expect(result).to.deep.equal(['child']);
    });

    it('should invoke callback on files only', () => {
      const path = 'C:/Windows';
      const { input, parentDir, childFile, resolveItemCb } = setupFolderTest(path);
      sinon.stub(fs, 'existsSync').returns(true);
      const readDirStub = sinon.stub(fs, 'readdirSync');
      readDirStub.withArgs(path, { withFileTypes: true }).returns([parentDir]);
      readDirStub.withArgs(`${path}/parent`, { withFileTypes: true }).returns([childFile]);

      getItems(input);

      expect(resolveItemCb.calledWith('parent')).to.equal(false);
      expect(resolveItemCb.calledWith('child')).to.equal(true);
    });
  });

  describe('scaffoldFile', () => {
    afterEach(() => {
      sinon.restore();
    });

    const setupTest = () => {
      return {
        mkDirStub: sinon.stub(fs, 'mkdir'),
        writeFileStub: sinon.stub(fs, 'writeFileSync'),
        scaffoldInput: {
          rootPath: 'C:/myapp',
          fileContent: 'sample content',
          filename: 'index.ts',
          componentPath: 'FreshComponent',
        },
      };
    };

    it('should scaffold file', () => {
      sinon.stub(fs, 'existsSync').returns(false);
      const { mkDirStub, writeFileStub, scaffoldInput } = setupTest();
      const expectedOutputDir = `${scaffoldInput.rootPath}/${scaffoldInput.componentPath}`;

      const result = scaffoldFile(
        scaffoldInput.rootPath,
        scaffoldInput.fileContent,
        scaffoldInput.filename,
        scaffoldInput.componentPath
      );

      expect(mkDirStub.calledWith(`${expectedOutputDir}`, { recursive: true }));
      expect(
        writeFileStub.calledWith(
          `${expectedOutputDir}/${scaffoldInput.filename}`,
          editLineEndings(scaffoldInput.fileContent),
          'utf8'
        )
      );
      expect(result).to.equal('C:\\myapp\\FreshComponent\\index.ts');
    });

    it('should return null when output file already exists', () => {
      const { mkDirStub, writeFileStub, scaffoldInput } = setupTest();
      const existsStub = sinon.stub(fs, 'existsSync');
      existsStub.withArgs('C:\\myapp\\FreshComponent\\index.ts').returns(true);

      const result = scaffoldFile(
        scaffoldInput.rootPath,
        scaffoldInput.fileContent,
        scaffoldInput.filename,
        scaffoldInput.componentPath
      );

      expect(result).to.equal(null);
      expect(mkDirStub.called).to.equal(false);
      expect(writeFileStub.called).to.equal(false);
    });
  });
  /*
  describe('writePlugins', () => {
    // this requires mocking functions from utils
    // and sinon mocks don't work for this usecase
    // so we skip tests for this one
  });
*/
});
