/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import * as strip from './strip';

describe('strip', () => {
  describe('compile', () => {
    it('strip only comments using default suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test11\r\n// #START_STRIP\r\nTest12 Test13\r\nTest14 Test15\r\n// #END_STRIP\r\nTest2\r\n// #START_JSS\r\nTest99\r\n// #END_JSS'
        );

      strip.compile('test.ts', { stripCode: false });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test11\r\nTest12 Test13\r\nTest14 Test15\r\nTest2\r\n// #START_JSS\r\nTest99\r\n// #END_JSS',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('strip only comments using custom suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test55\r\n// #START_STRIP\r\n// #START_JSS\r\nTest12 Test13\r\nTest14 Test15\r\nTest99\r\n// #END_JSS\r\n// #END_STRIP'
        );

      strip.compile('test.ts', { stripCode: false, suffix: 'JSS' });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test55\r\n// #START_STRIP\r\nTest12 Test13\r\nTest14 Test15\r\nTest99\r\n// #END_STRIP',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('strip code and comments using default suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test11\r\n// #START_JSS\r\n// #START_STRIP\r\nTest12 Test13\r\nTest14 Test15\r\n// #END_STRIP\r\nTest2\r\nTest34\r\n// #END_JSS'
        );

      strip.compile('test.ts', { stripCode: true });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test11\r\n// #START_JSS\r\nTest2\r\nTest34\r\n// #END_JSS',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('strip code and comments using custom suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test11\r\n// #START_STRIP\r\n// #START_JSS\r\nTest12 Test13\r\n// #END_JSS\r\nTest14 Test15\r\n// #END_STRIP\r\nTest2\r\nTest34'
        );

      strip.compile('test.ts', { stripCode: true, suffix: 'JSS' });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test11\r\n// #START_STRIP\r\nTest14 Test15\r\n// #END_STRIP\r\nTest2\r\nTest34',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });
  });

  describe('strip', () => {
    it('should process files and strip code', () => {
      const sourceDirPath = process.cwd();

      const globStub = sinon.stub(glob, 'sync');
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_STRIP\r\nTest02 Test03\r\n// #END_STRIP\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_STRIP\r\nTest12 Test13\r\n// #END_STRIP\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_STRIP\r\nTest22 Test23\r\n// #END_STRIP\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_STRIP\r\nTest32 Test33\r\n// #END_STRIP\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_STRIP\r\nTest42 Test43\r\n// #END_STRIP\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_STRIP\r\nTest52 Test53\r\n// #END_STRIP\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_STRIP\r\nTest62 Test63\r\n// #END_STRIP\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_STRIP\r\nTest72 Test73\r\n// #END_STRIP\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_STRIP\r\nTest82 Test83\r\n// #END_STRIP\r\nTest84\r\nTest85'
      );
      stubFileContent(
        'testjsx.ts',
        'return (\r\n<>\r\n{/* #START_STRIP */}\r\nTest86\r\nTest87\r\n{/* #END_STRIP */}\r\nTest88\r\nTest89\r\n</>\r\n)'
      );

      globStub.returns([
        'test1.ts',
        'test2.ts',
        'testdir1/test11.ts',
        'testdir1/test12.tsx',
        'testdir1/test13.js',
        'test3.ts',
        'testdir2/test21.ts',
        'testdir2/test22.tsx',
        'testdir2/test23.js',
        'testjsx.ts',
      ]);

      const settings = { stripCode: true };

      strip.strip(settings);

      expect(writeFileSyncStub.callCount).to.equal(10);

      const testCompile = (callIndex: number, filePath: string, content: string) => {
        expect(writeFileSyncStub.getCall(callIndex).args).to.deep.equal([
          path.resolve(process.cwd(), filePath),
          content,
        ]);
      };

      testCompile(0, 'test1.ts', 'Test01\r\nTest04\r\nTest05');
      testCompile(1, 'test2.ts', 'Test11\r\nTest14\r\nTest15');
      testCompile(2, 'testdir1/test11.ts', 'Test21\r\nTest24\r\nTest25');
      testCompile(3, 'testdir1/test12.tsx', 'Test31\r\nTest34\r\nTest35');
      testCompile(4, 'testdir1/test13.js', 'Test41\r\nTest44\r\nTest45');
      testCompile(5, 'test3.ts', 'Test51\r\nTest54\r\nTest55');
      testCompile(6, 'testdir2/test21.ts', 'Test61\r\nTest64\r\nTest65');
      testCompile(7, 'testdir2/test22.tsx', 'Test71\r\nTest74\r\nTest75');
      testCompile(8, 'testdir2/test23.js', 'Test81\r\nTest84\r\nTest85');
      testCompile(9, 'testjsx.ts', 'return (\r\n<>\r\nTest88\r\nTest89\r\n</>\r\n)');

      globStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('should process files and strip comments', () => {
      const sourceDirPath = process.cwd();

      const globStub = sinon.stub(glob, 'sync');
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_STRIP\r\nTest02 Test03\r\n// #END_STRIP\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_STRIP\r\nTest12 Test13\r\n// #END_STRIP\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_STRIP\r\nTest22 Test23\r\n// #END_STRIP\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_STRIP\r\nTest32 Test33\r\n// #END_STRIP\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_STRIP\r\nTest42 Test43\r\n// #END_STRIP\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_STRIP\r\nTest52 Test53\r\n// #END_STRIP\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_STRIP\r\nTest62 Test63\r\n// #END_STRIP\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_STRIP\r\nTest72 Test73\r\n// #END_STRIP\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_STRIP\r\nTest82 Test83\r\n// #END_STRIP\r\nTest84\r\nTest85'
      );

      globStub.returns([
        'test1.ts',
        'test2.ts',
        'testdir1/test11.ts',
        'testdir1/test12.tsx',
        'testdir1/test13.js',
        'test3.ts',
        'testdir2/test21.ts',
        'testdir2/test22.tsx',
        'testdir2/test23.js',
      ]);

      strip.strip();

      expect(writeFileSyncStub.callCount).to.equal(9);

      const testCompile = (callIndex: number, filePath: string, content: string) => {
        expect(writeFileSyncStub.getCall(callIndex).args).to.deep.equal([
          path.resolve(process.cwd(), filePath),
          content,
        ]);
      };

      testCompile(0, 'test1.ts', 'Test01\r\nTest02 Test03\r\nTest04\r\nTest05');
      testCompile(1, 'test2.ts', 'Test11\r\nTest12 Test13\r\nTest14\r\nTest15');
      testCompile(2, 'testdir1/test11.ts', 'Test21\r\nTest22 Test23\r\nTest24\r\nTest25');
      testCompile(3, 'testdir1/test12.tsx', 'Test31\r\nTest32 Test33\r\nTest34\r\nTest35');
      testCompile(4, 'testdir1/test13.js', 'Test41\r\nTest42 Test43\r\nTest44\r\nTest45');
      testCompile(5, 'test3.ts', 'Test51\r\nTest52 Test53\r\nTest54\r\nTest55');
      testCompile(6, 'testdir2/test21.ts', 'Test61\r\nTest62 Test63\r\nTest64\r\nTest65');
      testCompile(7, 'testdir2/test22.tsx', 'Test71\r\nTest72 Test73\r\nTest74\r\nTest75');
      testCompile(8, 'testdir2/test23.js', 'Test81\r\nTest82 Test83\r\nTest84\r\nTest85');

      globStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('should process files and strip code using custom cwd', () => {
      const sourceDirPath = path.resolve(process.cwd(), 'sub_dir');

      const globStub = sinon.stub(glob, 'sync');
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_STRIP\r\nTest02 Test03\r\n// #END_STRIP\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_STRIP\r\nTest12 Test13\r\n// #END_STRIP\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_STRIP\r\nTest22 Test23\r\n// #END_STRIP\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_STRIP\r\nTest32 Test33\r\n// #END_STRIP\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_STRIP\r\nTest42 Test43\r\n// #END_STRIP\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_STRIP\r\nTest52 Test53\r\n// #END_STRIP\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_STRIP\r\nTest62 Test63\r\n// #END_STRIP\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_STRIP\r\nTest72 Test73\r\n// #END_STRIP\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_STRIP\r\nTest82 Test83\r\n// #END_STRIP\r\nTest84\r\nTest85'
      );

      globStub.returns([
        'test1.ts',
        'test2.ts',
        'testdir1/test11.ts',
        'testdir1/test12.tsx',
        'testdir1/test13.js',
        'test3.ts',
        'testdir2/test21.ts',
        'testdir2/test22.tsx',
        'testdir2/test23.js',
      ]);

      const settings = { stripCode: true, cwd: sourceDirPath };

      strip.strip(settings);

      expect(writeFileSyncStub.callCount).to.equal(9);

      // Checks that files were written
      const testCompile = (callIndex: number, filePath: string, content: string) => {
        expect(writeFileSyncStub.getCall(callIndex).args).to.deep.equal([
          path.resolve(process.cwd(), filePath),
          content,
        ]);
      };

      testCompile(0, 'sub_dir/test1.ts', 'Test01\r\nTest04\r\nTest05');
      testCompile(1, 'sub_dir/test2.ts', 'Test11\r\nTest14\r\nTest15');
      testCompile(2, 'sub_dir/testdir1/test11.ts', 'Test21\r\nTest24\r\nTest25');
      testCompile(3, 'sub_dir/testdir1/test12.tsx', 'Test31\r\nTest34\r\nTest35');
      testCompile(4, 'sub_dir/testdir1/test13.js', 'Test41\r\nTest44\r\nTest45');
      testCompile(5, 'sub_dir/test3.ts', 'Test51\r\nTest54\r\nTest55');
      testCompile(6, 'sub_dir/testdir2/test21.ts', 'Test61\r\nTest64\r\nTest65');
      testCompile(7, 'sub_dir/testdir2/test22.tsx', 'Test71\r\nTest74\r\nTest75');
      testCompile(8, 'sub_dir/testdir2/test23.js', 'Test81\r\nTest84\r\nTest85');

      globStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });
  });
});
