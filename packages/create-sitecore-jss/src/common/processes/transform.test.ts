/* eslint-disable no-unused-expressions */
import fs from 'fs-extra';
import path, { sep } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ejs from 'ejs';
import glob from 'glob';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { currentPkg, partialPkg } from '../test-data/pkg';
import * as transform from './transform';
import * as helpers from '../utils/helpers';
import { populateEjsData } from './transform';

const {
  transformFilename,
  merge,
  mergeEnv,
  diffFiles,
  diffAndWriteFiles,
  transform: transformFunc,
} = transform;

describe('transform', () => {
  describe('transformFilename', () => {
    it('should replace placeholder filename with appropriate key', () => {
      const fileName = '{{appName}}.config';
      const answers = {
        force: true,
        silent: true,
        appPrefix: true,
        appName: 'test',
        destination: '.\\test-data\\test',
        fetchWith: 'GraphQL',
        prerender: 'SSG',
        hostName: 'https://cm.jss.localhost',
        templates: [],
      };

      const transformedFileName = transformFilename(fileName, answers);

      expect(transformedFileName).to.equal('test.config');
    });
  });

  describe('merge', () => {
    it('should merge the contents of a partial package.json with the target package.json', () => {
      const expected = {
        name: 'test',
        version: '2.0.0',
        description: 'Updated package.json',
        scripts: {
          start:
            'cross-env-shell JSS_MODE=disconnected "npm-run-all --serial bootstrap --parallel next:dev start:disconnected-proxy start:watch-components"',
          test: 'tests are good',
        },
        config: {
          rootPlaceholders: ['jss-main', 'jss-test'],
        },
        files: ['dist'],
        dependencies: {
          bootstrap: '^4.3.1',
          chalk: '^4.1.2',
          nprogress: '~0.2.0',
        },
        devDependencies: {
          '@sitecore-jss/sitecore-jss-dev-tools': '^20.0.0-canary',
          '@types/node': '^20.14.2',
          typescript: '~4.3.5',
        },
        foo: {
          bar: [4, 5, 6, 1, 2, 3],
          x: {
            y: {
              bar: [1, 2, 3, 7, 8, 9],
              x: '20',
              y: 15,
              z: ['1', '2', '3', '9', '10', '11'],
            },
          },
        },
      };

      const result = merge(currentPkg, partialPkg);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('mergeEnv', () => {
    it('should merge content when source includes duplicates and unique variables', () => {
      const target = [
        '# Foo1',
        '# Foo2',
        'VAL1=ONE',
        'VAL2=TWO',
        '',
        '',
        '# Bar1',
        '# Bar2',
        'VAL3=three',
      ].join('\r\n');
      const source = [
        'VAL4=four',
        '# Foo1',
        '# Foo2',
        'VAL1=ONE_MODIFIED',
        '# Bar5',
        'VAL5=five',
        '',
        '# Car1',
        '# Car2',
        'VAL3=THREE_MODIFIED',
        '',
        '',
        '',
        '# Bar6',
        'VAL6=SIX',
      ].join('\r\n');

      const result = mergeEnv(target, source);

      expect(result).to.equal(
        [
          '# Foo1',
          '# Foo2',
          'VAL1=ONE_MODIFIED',
          'VAL2=TWO',
          '',
          '',
          '# Bar1',
          '# Bar2',
          'VAL3=THREE_MODIFIED',
          'VAL4=four',
          '# Bar5',
          'VAL5=five',
          '',
          '# Bar6',
          'VAL6=SIX',
        ].join('\r\n')
      );
    });

    it('should merge content when source includes duplicates only', () => {
      const target = [
        '# Foo1',
        '# Foo2',
        'VAL1=ONE',
        'VAL2=TWO',
        '# Bar1',
        '# Bar2',
        'VAL3=three',
      ].join('\r\n');
      const source = ['# Bar1', '# Bar2', 'VAL3=three_modified', 'VAL2=two_modified'].join('\r\n');

      const result = mergeEnv(target, source);

      expect(result).to.equal(
        [
          '# Foo1',
          '# Foo2',
          'VAL1=ONE',
          'VAL2=two_modified',
          '# Bar1',
          '# Bar2',
          'VAL3=three_modified',
        ].join('\r\n')
      );
    });

    it('should merge content when source includes unique values only', () => {
      const target = [
        '# Foo1',
        '# Foo2',
        'VAL1=ONE',
        'VAL2=TWO',
        '# Bar1',
        '# Bar2',
        'VAL3=three',
      ].join('\r\n');
      const source = ['# Bar4', '# Bar5', 'VAL4=four', 'VAL5=five'].join('\r\n');

      const result = mergeEnv(target, source);

      expect(result).to.equal(
        [
          '# Foo1',
          '# Foo2',
          'VAL1=ONE',
          'VAL2=TWO',
          '# Bar1',
          '# Bar2',
          'VAL3=three',
          '# Bar4',
          '# Bar5',
          'VAL4=four',
          'VAL5=five',
        ].join('\r\n')
      );
    });

    it('should return target content when source is empty', () => {
      const target = [
        '# Foo1',
        '# Foo2',
        'VAL1=ONE',
        'VAL2=TWO',
        '# Bar1',
        '# Bar2',
        'VAL3=three',
      ].join('\r\n');
      const source = '';

      const result = mergeEnv(target, source);

      expect(result).to.equal(
        ['# Foo1', '# Foo2', 'VAL1=ONE', 'VAL2=TWO', '# Bar1', '# Bar2', 'VAL3=three'].join('\r\n')
      );
    });
  });

  describe('diffFiles', () => {
    let log: SinonStub;
    let prompt: SinonStub;

    afterEach(() => {
      log?.restore();
      prompt?.restore();
    });

    it('should return empty string when target file is not found', async () => {
      const result = await diffFiles('test', 'not/existing/path');

      expect(result).to.equal('');
    });

    it('should return empty string when source and target files are equal', async () => {
      const source = fs.readFileSync(
        path.resolve('src', 'common', 'test-data', 'transform', 'source.ts'),
        'utf-8'
      );
      const result = await diffFiles(
        source,
        path.resolve('src', 'common', 'test-data', 'transform', 'source.ts')
      );

      expect(result).to.equal('');
    });

    it('should show diff using text regular file', async () => {
      log = sinon.stub(console, 'log');
      prompt = sinon.stub(inquirer, 'prompt').returns({ choice: true } as any);
      const targetFilePath = path.resolve('src', 'common', 'test-data', 'transform', 'target.ts');

      const source = fs.readFileSync(
        path.resolve('src', 'common', 'test-data', 'transform', 'source.ts'),
        'utf-8'
      );
      const result = await diffFiles(source, targetFilePath);
      expect(log.getCalls().length).to.equal(12);

      const calls = [
        chalk.grey('= '),
        chalk.red('- const x = 15;'),
        chalk.green('+ const a = 10;'),
        chalk.grey('= const b = 20;'),
        chalk.grey('= '),
        chalk.grey('= console.log(10 + 20);'),
        chalk.grey('= '),
        chalk.red('- console.log(40 + 10);'),
        chalk.green('+ console.log(20 + 30);'),
        chalk.grey('= '),
        chalk.grey('= console.log(a + b);'),
      ];

      calls.forEach((arg, i) => {
        expect(log.getCall(i).args[0].replace('\r', '')).to.equal(arg);
      });

      expect(log.getCall(calls.length).args[0]).to.equal(
        `Showing potential changes in ${chalk.yellow(targetFilePath.replace('/', '\\'))}`
      );

      expect(
        prompt.calledOnceWith({
          type: 'list',
          name: 'choice',
          choices: ['yes', 'skip', 'yes to all', 'abort'],
          message: `File ${chalk.yellow(
            targetFilePath.replace('/', '\\')
          )} is about to be overwritten with the above changes. Are you sure you want to continue?`,
        })
      ).to.equal(true);

      expect(result).equal(true);
    });

    it('should show diff using json file', async () => {
      log = sinon.stub(console, 'log');
      prompt = sinon.stub(inquirer, 'prompt').returns({ choice: true } as any);
      const targetFilePath = path.resolve('src', 'common', 'test-data', 'transform', 'target.json');

      const source = fs.readFileSync(
        path.resolve('src', 'common', 'test-data', 'transform', 'source.json'),
        'utf-8'
      );
      const result = await diffFiles(source, targetFilePath);

      expect(log.getCalls().length).to.equal(16);

      const calls = [
        chalk.grey('= {'),
        chalk.red('-   "a": ['),
        chalk.red('-     1,'),
        chalk.red('-     2'),
        chalk.red('-   ],'),
        chalk.grey('=   "foo": {'),
        chalk.red('-     "b": 50,'),
        chalk.red('-     "bar": true,'),
        chalk.green('+     "bar": false,'),
        chalk.grey('=     "y": 15'),
        chalk.grey('=   },'),
        chalk.grey('=   "x": 10,'),
        chalk.red('-   "z": "40"'),
        chalk.green('+   "z": "30"'),
        chalk.grey('= }'),
      ];

      calls.forEach((arg, i) => {
        expect(log.getCall(i).args[0]).to.equal(arg);
      });

      expect(log.getCall(calls.length).args[0]).to.equal(
        `Showing potential changes in ${chalk.yellow(targetFilePath.replace('/', '\\'))}`
      );

      expect(
        prompt.calledOnceWith({
          type: 'list',
          name: 'choice',
          choices: ['yes', 'skip', 'yes to all', 'abort'],
          message: `File ${chalk.yellow(
            targetFilePath.replace('/', '\\')
          )} is about to be overwritten with the above changes. Are you sure you want to continue?`,
        })
      ).to.equal(true);

      expect(result).equal(true);
    });
  });

  describe('diffAndWriteFiles', () => {
    let diffFilesStub: SinonStub;
    let processExitStub: SinonStub;
    let writeFileToPathStub: SinonStub;

    afterEach(() => {
      diffFilesStub?.restore();
      processExitStub?.restore();
      writeFileToPathStub?.restore();
    });

    it('should overwrite a single file', async () => {
      diffFilesStub = sinon.stub(transform, 'diffFiles').returns(Promise.resolve('yes'));
      writeFileToPathStub = sinon.stub(helpers, 'writeFileToPath');

      const answers = {
        appName: 'JssNextWeb',
        hostName: 'http://jssnextweb',
        destination: 'samples/next',
        fetchWith: 'REST',
        force: false,
        templates: [],
        language: 'en',
      };

      await diffAndWriteFiles({
        rendered: 'test',
        pathToNewFile: 'samples/next/{{language}}.txt',
        answers,
      });

      expect(writeFileToPathStub.calledOnceWith('samples/next/en.txt', 'test')).to.equal(true);

      expect(answers.force).to.equal(false);
    });

    it('should overwrite a single file and later do not ask the same question', async () => {
      diffFilesStub = sinon.stub(transform, 'diffFiles').returns(Promise.resolve('yes to all'));
      writeFileToPathStub = sinon.stub(helpers, 'writeFileToPath');

      const answers = {
        appName: 'JssNextWeb',
        hostName: 'http://jssnextweb',
        destination: 'samples/next',
        fetchWith: 'REST',
        force: false,
        templates: [],
        language: 'en',
      };

      await diffAndWriteFiles({
        rendered: 'test',
        pathToNewFile: 'samples/next/{{language}}.txt',
        answers,
      });

      expect(writeFileToPathStub.calledOnceWith('samples/next/en.txt', 'test')).to.equal(true);

      expect(answers.force).to.equal(true);
    });

    it('should skip file', async () => {
      diffFilesStub = sinon.stub(transform, 'diffFiles').returns(Promise.resolve('skip'));
      writeFileToPathStub = sinon.stub(helpers, 'writeFileToPath');

      const answers = {
        appName: 'JssNextWeb',
        hostName: 'http://jssnextweb',
        destination: 'samples/next',
        fetchWith: 'REST',
        force: false,
        templates: [],
        language: 'en',
      };

      await diffAndWriteFiles({
        rendered: 'test',
        pathToNewFile: 'samples/next/{{language}}.txt',
        answers,
      });

      expect(writeFileToPathStub.notCalled).to.equal(true);

      expect(answers.force).to.equal(false);
    });

    it('should abort a process', async () => {
      diffFilesStub = sinon.stub(transform, 'diffFiles').returns(Promise.resolve('abort'));
      writeFileToPathStub = sinon.stub(helpers, 'writeFileToPath');

      processExitStub = sinon.stub(process, 'exit');

      const answers = {
        appName: 'JssNextWeb',
        hostName: 'http://jssnextweb',
        destination: 'samples/next',
        fetchWith: 'REST',
        force: false,
        templates: [],
        language: 'en',
      };

      await diffAndWriteFiles({
        rendered: 'test',
        pathToNewFile: 'samples/next/{{language}}.txt',
        answers,
      });

      expect(writeFileToPathStub.notCalled).to.equal(true);

      expect(processExitStub.calledOnce).to.equal(true);

      expect(answers.force).to.equal(false);
    });
  });

  describe('populateEjsData', () => {
    it('should populate relative proxy path (with trailing slash) in helper, if proxyAppDestination populated', () => {
      const answers = {
        appName: 'JssNextWeb',
        hostName: 'http://jssnextweb',
        destination: 'samples/next',
        proxyAppDestination: 'samples/proxy',
        fetchWith: 'REST',
        force: false,
        templates: [],
        language: 'en',
      };
      const result = populateEjsData(answers);
      expect(result.helper.relativeProxyAppDestination).to.equal(`..${sep}proxy${sep}`);
    });
  });

  describe('transform', () => {
    let fsMkdirsSyncStub: SinonStub;
    let fsCopySyncStub: SinonStub;
    let fsExistsSyncStub: SinonStub;
    let fsReadFileSunc: SinonStub;
    let globSyncStub: SinonStub;
    let ejsRenderFileStub: SinonStub;
    let mergeEnvStub: SinonStub;
    let mergeStub: SinonStub;
    let diffAndWriteFilesStub: SinonStub;
    let writeFileToPathStub: SinonStub;
    let transformFilenameStub: SinonStub;
    let openJsonFileStub: SinonStub;
    let log: SinonStub;

    beforeEach(() => {
      fsMkdirsSyncStub = sinon.stub(fs, 'mkdirsSync');
    });

    afterEach(() => {
      fsMkdirsSyncStub?.restore();
      fsCopySyncStub?.restore();
      fsExistsSyncStub?.restore();
      fsReadFileSunc?.restore();
      globSyncStub?.restore();
      ejsRenderFileStub?.restore();
      mergeEnvStub?.restore();
      mergeStub?.restore();
      diffAndWriteFilesStub?.restore();
      writeFileToPathStub?.restore();
      transformFilenameStub?.restore();
      openJsonFileStub?.restore();
      log?.restore();
    });

    it('should transform file', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'file.ts';
      const renderFileOutput = 'file output';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(ejsRenderFileStub).to.have.been.calledOnceWith(path.join(templatePath, file), {
        ...answers,
        helper: {
          isDev: false,
          getPascalCaseName: helpers.getPascalCaseName,
          getAppPrefix: helpers.getAppPrefix,
        },
      });
      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: renderFileOutput,
        pathToNewFile: path.join(destinationPath, file),
        answers,
      });
    });

    it('should transform file in proxy destination when processing proxy and proxy location destination', async () => {
      const templatePath = path.resolve('templates/node-headless-proxy');
      const destinationPath = path.resolve('samples/next');
      const destinationProxy = path.resolve('samples/proxy');
      const file = 'file.ts';
      const renderFileOutput = 'file output';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        proxyAppDestination: destinationProxy,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(ejsRenderFileStub).to.have.been.calledOnceWith(path.join(templatePath, file), {
        ...answers,
        helper: {
          isDev: false,
          getPascalCaseName: helpers.getPascalCaseName,
          getAppPrefix: helpers.getAppPrefix,
          relativeProxyAppDestination: `..${sep}proxy${sep}`,
        },
      });
      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: renderFileOutput,
        pathToNewFile: path.join(destinationProxy, file),
        answers,
      });
    });

    it('should skip if isFileForSkip', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'file.ts';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile');
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers, {
        isFileForSkip: (f) => f === file,
      });

      expect(ejsRenderFileStub).to.not.have.been.called;
      expect(diffAndWriteFilesStub).to.not.have.been.called;
    });

    it('should copy only special files', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const files = ['image.png', 'file.pdf'];

      globSyncStub = sinon.stub(glob, 'sync').returns(files);
      fsCopySyncStub = sinon.stub(fs, 'copySync');
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile');
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(fsCopySyncStub).to.have.been.calledTwice;
      files.forEach((file) => {
        expect(fsCopySyncStub).to.have.been.calledWith(
          path.join(templatePath, file),
          path.join(destinationPath, file)
        );
      });
      expect(ejsRenderFileStub).to.not.have.been.called;
      expect(diffAndWriteFilesStub).to.not.have.been.called;
    });

    it('should skip if isFileForCopy', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'file.ts';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      fsCopySyncStub = sinon.stub(fs, 'copySync');
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile');
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers, {
        isFileForCopy: (f) => f === file,
      });

      expect(fsCopySyncStub).to.have.been.calledOnceWith(
        path.join(templatePath, file),
        path.join(destinationPath, file)
      );
      expect(ejsRenderFileStub).to.not.have.been.called;
      expect(diffAndWriteFilesStub).to.not.have.been.called;
    });

    it('should merge package.json file', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'package.json';
      const renderFileOutput = '{ "one": 1, "two": 2}';
      const currentPkg = { three: 3, four: 4 };
      const templatePkg = JSON.parse(renderFileOutput);
      const mergedPkg = { merged: true };

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      fsExistsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
      openJsonFileStub = sinon.stub(helpers, 'openJsonFile').returns(currentPkg);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      mergeStub = sinon.stub(transform, 'merge').returns(mergedPkg);
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(ejsRenderFileStub).to.have.been.calledOnceWith(path.join(templatePath, file), {
        ...answers,
        helper: {
          isDev: false,
          getPascalCaseName: helpers.getPascalCaseName,
          getAppPrefix: helpers.getAppPrefix,
        },
      });
      expect(mergeStub).to.have.been.calledOnceWith(currentPkg, templatePkg);
      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: JSON.stringify(mergedPkg, null, 2),
        pathToNewFile: path.join(destinationPath, file),
        answers,
      });
    });

    it('should merge json file', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'test.json';
      const renderFileOutput = '{ "one": 1, "two": 2}';
      const currentJson = { three: 3, four: 4 };
      const templateJson = JSON.parse(renderFileOutput);
      const mergedPkg = { merged: true };

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      fsExistsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
      openJsonFileStub = sinon.stub(helpers, 'openJsonFile').returns(currentJson);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      mergeStub = sinon.stub(transform, 'merge').returns(mergedPkg);
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(ejsRenderFileStub).to.have.been.calledOnceWith(path.join(templatePath, file), {
        ...answers,
        helper: {
          isDev: false,
          getPascalCaseName: helpers.getPascalCaseName,
          getAppPrefix: helpers.getAppPrefix,
        },
      });
      expect(mergeStub).to.have.been.calledOnceWith(currentJson, templateJson);
      expect(openJsonFileStub).to.have.been.calledOnceWith(`${destinationPath}${sep}${file}`);
      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: JSON.stringify(mergedPkg, null, 2),
        pathToNewFile: path.join(destinationPath, file),
        answers,
      });
    });

    it('should concatenate .env file', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = '.env';
      const templateDotEnv = 'ONE=one';
      const currentDotEnv = 'TWO=2';
      const concatDotEnv = 'CONCATENATED=true';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      fsExistsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
      fsReadFileSunc = sinon.stub(fs, 'readFileSync').returns(currentDotEnv);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(templateDotEnv));
      mergeEnvStub = sinon.stub(transform, 'mergeEnv').returns(concatDotEnv);
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(ejsRenderFileStub).to.have.been.calledOnceWith(path.join(templatePath, file), {
        ...answers,
        helper: {
          isDev: false,
          getPascalCaseName: helpers.getPascalCaseName,
          getAppPrefix: helpers.getAppPrefix,
        },
      });
      expect(mergeEnvStub).to.have.been.calledOnceWith(currentDotEnv, templateDotEnv);
      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: concatDotEnv,
        pathToNewFile: path.join(destinationPath, file),
        answers,
      });
    });

    it('should rename gitignore file', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const renderFileOutput = 'file output';

      globSyncStub = sinon.stub(glob, 'sync').returns(['gitignore']);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(diffAndWriteFilesStub).to.have.been.calledOnceWith({
        rendered: renderFileOutput,
        pathToNewFile: path.join(destinationPath, '.gitignore'),
        answers,
      });
    });

    it('should force', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const renderFileOutput = 'file output';
      const file = 'file.ts';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').returns(Promise.resolve(renderFileOutput));
      writeFileToPathStub = sinon.stub(helpers, 'writeFileToPath');
      diffAndWriteFilesStub = sinon.stub(transform, 'diffAndWriteFiles');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: true,
      };

      await transformFunc(templatePath, answers);

      expect(writeFileToPathStub).to.have.been.calledOnceWith(
        path.join(destinationPath, file),
        renderFileOutput
      );
      expect(diffAndWriteFilesStub).to.not.have.been.called;
    });

    it('should handle error', async () => {
      const templatePath = path.resolve('templates/next');
      const destinationPath = path.resolve('samples/next');
      const file = 'file.ts';
      const error = 'Nope!';

      globSyncStub = sinon.stub(glob, 'sync').returns([file]);
      ejsRenderFileStub = sinon.stub(ejs, 'renderFile').throws(error);
      log = sinon.stub(console, 'log');

      const answers = {
        destination: destinationPath,
        templates: [],
        appPrefix: false,
        force: false,
      };

      await transformFunc(templatePath, answers);

      expect(log.getCall(0).args[0]).to.equal(chalk.red(error));
      expect(log.getCall(1).args[0]).to.equal(
        `Error occurred when trying to render to ${chalk.yellow(path.resolve(file))}`
      );
    });
  });
});
