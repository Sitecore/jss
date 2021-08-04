/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import fs, { Dirent, Stats } from 'fs';
import * as strip from './strip';

describe('strip', () => {
  describe('compile', () => {
    it('strip only comments using default suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test11\r\n// #START_EMPTY\r\nTest12 Test13\r\nTest14 Test15\r\n// #END_EMPTY\r\nTest2\r\n// #START_JSS\r\nTest99\r\n// #END_JSS'
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
          'Test55\r\n// #START_EMPTY\r\n// #START_JSS\r\nTest12 Test13\r\nTest14 Test15\r\nTest99\r\n// #END_JSS\r\n// #END_EMPTY'
        );

      strip.compile('test.ts', { stripCode: false, suffix: 'JSS' });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test55\r\n// #START_EMPTY\r\nTest12 Test13\r\nTest14 Test15\r\nTest99\r\n// #END_EMPTY',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('strip code and comments using default suffix', () => {
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon
        .stub(fs, 'readFileSync')
        .returns(
          'Test11\r\n// #START_JSS\r\n// #START_EMPTY\r\nTest12 Test13\r\nTest14 Test15\r\n// #END_EMPTY\r\nTest2\r\nTest34\r\n// #END_JSS'
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
          'Test11\r\n// #START_EMPTY\r\n// #START_JSS\r\nTest12 Test13\r\n// #END_JSS\r\nTest14 Test15\r\n// #END_EMPTY\r\nTest2\r\nTest34'
        );

      strip.compile('test.ts', { stripCode: true, suffix: 'JSS' });

      expect(writeFileSyncStub.calledOnce).to.be.true;
      expect(writeFileSyncStub.args[0]).to.deep.equal([
        'test.ts',
        'Test11\r\n// #START_EMPTY\r\nTest14 Test15\r\n// #END_EMPTY\r\nTest2\r\nTest34',
      ]);

      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });
  });

  describe('processNextFile', () => {
    it('process files and directories', () => {
      const sourceDirPath = path.resolve(__dirname, 'src/testDir');
      const compileStub = sinon.stub(strip, 'compile');
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');

      // Stub all directories
      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const directory = strip.getDirectory(sourceDirPath);

      strip.processNextFile(sourceDirPath, directory, {});

      const testCompile = (callNumber: number, ...paths: string[]) => {
        expect(compileStub.getCall(callNumber).args).to.deep.equal([
          path.resolve(sourceDirPath, ...paths),
          {},
        ]);
      };

      expect(compileStub.callCount).to.equal(9);

      testCompile(0, 'test1.ts');
      testCompile(1, 'test2.ts');
      testCompile(2, 'testdir1', 'test11.ts');
      testCompile(3, 'testdir1', 'test12.tsx');
      testCompile(4, 'testdir1', 'test13.js');
      testCompile(5, 'test3.ts');
      testCompile(6, 'testdir2', 'test21.ts');
      testCompile(7, 'testdir2', 'test22.tsx');
      testCompile(8, 'testdir2', 'test23.js');

      compileStub.restore();
      readDirStub.restore();
      statStub.restore();
    });

    it('process files and directories using custom excludeDirPattern', () => {
      const sourceDirPath = path.resolve(__dirname, 'src/testDir');
      const compileStub = sinon.stub(strip, 'compile');
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);

      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const directory = strip.getDirectory(sourceDirPath);

      const settings = {
        excludeDirPattern: /(^|\\)(testdir1|node_modules|dist|\.next|out|\.generated)(\\|$)/gi,
      };

      strip.processNextFile(sourceDirPath, directory, settings);

      const testCompile = (callNumber: number, ...paths: string[]) => {
        expect(compileStub.getCall(callNumber).args).to.deep.equal([
          path.resolve(sourceDirPath, ...paths),
          settings,
        ]);
      };

      expect(compileStub.callCount).to.equal(6);

      testCompile(0, 'test1.ts');
      testCompile(1, 'test2.ts');
      testCompile(2, 'test3.ts');
      testCompile(3, 'testdir2', 'test21.ts');
      testCompile(4, 'testdir2', 'test22.tsx');
      testCompile(5, 'testdir2', 'test23.js');

      compileStub.restore();
      readDirStub.restore();
      statStub.restore();
    });

    it('process files and directories using custom includeFilePattern', () => {
      const sourceDirPath = path.resolve(__dirname, 'src/testDir');
      const compileStub = sinon.stub(strip, 'compile');
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
          'test99.js',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const directory = strip.getDirectory(sourceDirPath);
      const settings = { includeFilePattern: /\.(js)$/ };

      strip.processNextFile(sourceDirPath, directory, settings);

      const testCompile = (callNumber: number, ...paths: string[]) => {
        expect(compileStub.getCall(callNumber).args).to.deep.equal([
          path.resolve(sourceDirPath, ...paths),
          settings,
        ]);
      };

      expect(compileStub.callCount).to.equal(3);

      testCompile(0, 'testdir1', 'test13.js');
      testCompile(1, 'testdir2', 'test23.js');
      testCompile(2, 'test99.js');

      compileStub.restore();
      readDirStub.restore();
      statStub.restore();
    });
  });

  describe('getDirectory', () => {
    it('should iterate files', () => {
      const sourceDirPath = path.resolve(__dirname, 'src/testDir');
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);

      const directory = strip.getDirectory(sourceDirPath);

      expect(directory.index).to.equal(0);
      expect(directory.files).to.deep.equal([
        'node_modules',
        'test1.ts',
        '.next',
        'test2.ts',
        'testdir1',
        'test3.ts',
        'testdir2',
      ]);

      expect(directory.getNextFile()).to.equal('node_modules');
      expect(directory.index).to.equal(1);

      expect(directory.getNextFile()).to.equal('test1.ts');
      expect(directory.index).to.equal(2);

      expect(directory.getNextFile()).to.equal('.next');
      expect(directory.index).to.equal(3);

      readDirStub.restore();
    });
  });

  describe('strip', () => {
    it('should process files and strip code', () => {
      const sourceDirPath = process.cwd();
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');

      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_EMPTY\r\nTest02 Test03\r\n// #END_EMPTY\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_EMPTY\r\nTest12 Test13\r\n// #END_EMPTY\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_EMPTY\r\nTest22 Test23\r\n// #END_EMPTY\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_EMPTY\r\nTest32 Test33\r\n// #END_EMPTY\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_EMPTY\r\nTest42 Test43\r\n// #END_EMPTY\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_EMPTY\r\nTest52 Test53\r\n// #END_EMPTY\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_EMPTY\r\nTest62 Test63\r\n// #END_EMPTY\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_EMPTY\r\nTest72 Test73\r\n// #END_EMPTY\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_EMPTY\r\nTest82 Test83\r\n// #END_EMPTY\r\nTest84\r\nTest85'
      );

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);

      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);

      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const settings = { stripCode: true };

      strip.strip(settings);

      expect(writeFileSyncStub.callCount).to.equal(9);

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

      readDirStub.restore();
      statStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('should process files and strip comments', () => {
      const sourceDirPath = process.cwd();
      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');

      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_EMPTY\r\nTest02 Test03\r\n// #END_EMPTY\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_EMPTY\r\nTest12 Test13\r\n// #END_EMPTY\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_EMPTY\r\nTest22 Test23\r\n// #END_EMPTY\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_EMPTY\r\nTest32 Test33\r\n// #END_EMPTY\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_EMPTY\r\nTest42 Test43\r\n// #END_EMPTY\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_EMPTY\r\nTest52 Test53\r\n// #END_EMPTY\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_EMPTY\r\nTest62 Test63\r\n// #END_EMPTY\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_EMPTY\r\nTest72 Test73\r\n// #END_EMPTY\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_EMPTY\r\nTest82 Test83\r\n// #END_EMPTY\r\nTest84\r\nTest85'
      );

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);

      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const settings = { stripCode: false };

      strip.strip(settings);

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

      readDirStub.restore();
      statStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });

    it('should process files and strip code using custom sourcePath', () => {
      const sourceDirPath = path.resolve(process.cwd(), 'sub_dir');

      const readDirStub = sinon.stub(fs, 'readdirSync') as any;
      const statStub = sinon.stub(fs, 'statSync');
      const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
      const readFileSyncStub = sinon.stub(fs, 'readFileSync');

      const stubFileContent = (filePath: string, content: string) => {
        readFileSyncStub.withArgs(path.resolve(sourceDirPath, filePath)).returns(content);
      };

      stubFileContent(
        'test1.ts',
        'Test01\r\n// #START_EMPTY\r\nTest02 Test03\r\n// #END_EMPTY\r\nTest04\r\nTest05'
      );
      stubFileContent(
        'test2.ts',
        'Test11\r\n// #START_EMPTY\r\nTest12 Test13\r\n// #END_EMPTY\r\nTest14\r\nTest15'
      );
      stubFileContent(
        'testdir1/test11.ts',
        'Test21\r\n// #START_EMPTY\r\nTest22 Test23\r\n// #END_EMPTY\r\nTest24\r\nTest25'
      );
      stubFileContent(
        'testdir1/test12.tsx',
        'Test31\r\n// #START_EMPTY\r\nTest32 Test33\r\n// #END_EMPTY\r\nTest34\r\nTest35'
      );
      stubFileContent(
        'testdir1/test13.js',
        'Test41\r\n// #START_EMPTY\r\nTest42 Test43\r\n// #END_EMPTY\r\nTest44\r\nTest45'
      );
      stubFileContent(
        'test3.ts',
        'Test51\r\n// #START_EMPTY\r\nTest52 Test53\r\n// #END_EMPTY\r\nTest54\r\nTest55'
      );
      stubFileContent(
        'testdir2/test21.ts',
        'Test61\r\n// #START_EMPTY\r\nTest62 Test63\r\n// #END_EMPTY\r\nTest64\r\nTest65'
      );
      stubFileContent(
        'testdir2/test22.tsx',
        'Test71\r\n// #START_EMPTY\r\nTest72 Test73\r\n// #END_EMPTY\r\nTest74\r\nTest75'
      );
      stubFileContent(
        'testdir2/test23.js',
        'Test81\r\n// #START_EMPTY\r\nTest82 Test83\r\n// #END_EMPTY\r\nTest84\r\nTest85'
      );

      readDirStub
        .withArgs(sourceDirPath)
        .returns(([
          'node_modules',
          'test1.ts',
          '.next',
          'test2.ts',
          'testdir1',
          'test3.ts',
          'testdir2',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'node_modules'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, '.next'))
        .returns(([
          'script1.ts',
          'script2.tsx',
          'script3.js',
          'excludedFile.json',
        ] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir1'))
        .returns((['test11.ts', 'test12.tsx', 'test13.js'] as unknown) as Dirent[]);
      readDirStub
        .withArgs(path.resolve(sourceDirPath, 'testdir2'))
        .returns((['test21.ts', 'test22.tsx', 'test23.js'] as unknown) as Dirent[]);

      statStub.returns({ isDirectory: () => false } as Stats);

      const dirPaths = ['node_modules', '.next', 'testdir1', 'testdir2'];

      dirPaths.forEach((dir) => {
        statStub
          .withArgs(path.resolve(sourceDirPath, dir))
          .returns({ isDirectory: () => true } as Stats);
      });

      const settings = { stripCode: true, sourcePath: sourceDirPath };

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

      readDirStub.restore();
      statStub.restore();
      writeFileSyncStub.restore();
      readFileSyncStub.restore();
    });
  });
});
