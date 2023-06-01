import fs from 'fs';
import { expect } from 'chai';
import path from 'path';
import sinon from 'sinon';
import { scaffoldFile, editLineEndings } from './scaffold';

describe('scaffold', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('editLineEndings', () => {
    it('should replace line endings', () => {
      expect(editLineEndings('test\n')).to.equal('test\r\n');
      expect(editLineEndings('test\r')).to.equal('test\r\n');
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

      const filePath = path.join(expectedOutputDir, scaffoldInput.filename);

      const result = scaffoldFile(filePath, scaffoldInput.fileContent);

      expect(mkDirStub.calledWith(`${expectedOutputDir}`, { recursive: true }));
      expect(
        writeFileStub.calledWith(
          `${expectedOutputDir}/${scaffoldInput.filename}`,
          editLineEndings(scaffoldInput.fileContent),
          'utf8'
        )
      );
      expect(result).to.equal(filePath);
    });

    it('should return null when output file already exists', () => {
      const { mkDirStub, writeFileStub, scaffoldInput } = setupTest();
      const existsStub = sinon.stub(fs, 'existsSync');
      const filePath = path.join(
        scaffoldInput.rootPath,
        scaffoldInput.componentPath,
        scaffoldInput.filename
      );

      existsStub.withArgs(filePath).returns(true);

      const result = scaffoldFile(filePath, scaffoldInput.fileContent);

      expect(result).to.equal(null);
      expect(mkDirStub.called).to.equal(false);
      expect(writeFileStub.called).to.equal(false);
    });
  });
});
