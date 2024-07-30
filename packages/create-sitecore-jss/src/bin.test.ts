/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import fs from 'fs';
import { sep } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { ParsedArgs } from 'minimist';
import { parseArgs, main, promptDestination, getDestinations } from './bin';
import * as helpers from './common/utils/helpers';
import * as initRunner from './init-runner';
import { getDefaultProxyDestination } from './common/utils/helpers';

describe('bin', () => {
  describe('parseArgs', () => {
    let originalArgv: string[];

    beforeEach(() => {
      // eslint-disable-next-line no-unused-labels
      originalArgv: process.argv;
    });

    afterEach(() => {
      process.argv = originalArgv;
    });

    it('should parse', () => {
      process.argv = [
        'node',
        'index.ts',
        '--appPrefix',
        '--force',
        '--noInstall',
        '--yes',
        '--silent',
        '--prePushHook',
        '--appName',
        'test',
        '--destination',
        '.\\test\\path',
        '--proxyAppDestination',
        '.\\test\\proxypath',
        '--templates',
        'foo,bar',
        '--hostName',
        'test.com',
        '--fetchWith',
        'GraphQL',
        '--language',
        'da-DK',
      ];

      const args = parseArgs();

      expect(args._).to.be.empty;
      expect(args.appPrefix).to.equal(true);
      expect(args.force).to.equal(true);
      expect(args.noInstall).to.equal(true);
      expect(args.yes).to.equal(true);
      expect(args.silent).to.equal(true);
      expect(args.prePushHook).to.equal(true);
      expect(args.appName).to.equal('test');
      expect(args.destination).to.equal('.\\test\\path');
      expect(args.templates).to.equal('foo,bar');
      expect(args.hostName).to.equal('test.com');
      expect(args.fetchWith).to.equal('GraphQL');
      expect(args.language).to.equal('da-DK');
    });

    it('should accept positional parameters', () => {
      process.argv = ['node', 'index.ts', 'foo,bar', '--appPrefix', '--appName', 'test'];

      const args = parseArgs();

      expect(args._.length).to.equal(1);
      expect(args._[0]).to.equal('foo,bar');
      expect(args.appPrefix).to.equal(true);
      expect(args.appName).to.equal('test');
    });

    it('should accept boolean values for boolean parameters', () => {
      process.argv = ['node', 'index.ts', '--appPrefix', 'true', '--force', 'false'];

      const args = parseArgs();

      expect(args.appPrefix).to.equal(true);
      expect(args.force).to.equal(false);
    });

    it('should remove string parameters that are missing values', () => {
      process.argv = ['node', 'index.ts', '--appName', 'valid', '--destination'];

      const args = parseArgs();

      expect(args.appName).to.equal('valid');
      expect(args.destination).to.be.undefined;
    });
  });

  describe('main', async () => {
    let getAllTemplatesStub: SinonStub;
    let getBaseTemplatesStub: SinonStub;
    let inquirerPromptStub: SinonStub;
    let fsExistsSyncStub: SinonStub;
    let fsReaddirSyncStub: SinonStub;
    let initRunnerStub: SinonStub;
    let consoleLogStub: SinonStub;
    let processExitStub: SinonStub;

    const mockArgs = (args?: { [arg: string]: unknown }): ParsedArgs => {
      return { _: [], ...args };
    };

    beforeEach(() => {
      getAllTemplatesStub = sinon.stub(helpers, 'getAllTemplates');
      getBaseTemplatesStub = sinon.stub(helpers, 'getBaseTemplates');
      inquirerPromptStub = sinon.stub(inquirer, 'prompt');
      fsExistsSyncStub = sinon.stub(fs, 'existsSync');
      fsReaddirSyncStub = sinon.stub(fs, 'readdirSync');
      initRunnerStub = sinon.stub(initRunner, 'initRunner');
      consoleLogStub = sinon.stub(console, 'log');
      processExitStub = sinon.stub(process, 'exit');
    });

    afterEach(() => {
      getAllTemplatesStub?.restore();
      getBaseTemplatesStub?.restore();
      inquirerPromptStub?.restore();
      fsExistsSyncStub?.restore();
      fsReaddirSyncStub?.restore();
      initRunnerStub?.restore();
      consoleLogStub?.restore();
      processExitStub?.restore();
    });

    it('should initialize with provided args', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);

      const args = mockArgs({
        templates: 'foo,bar',
        destination: 'test\\path',
        prePushHook: false,
      });
      const expectedTemplates = ['foo', 'bar'];

      await main(args);
      expect(inquirerPromptStub).to.not.have.been.called;
      expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
        ...args,
        destination: args.destination,
        templates: expectedTemplates,
      });
    });

    it('should accept templates as positional parameter', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);

      const args = mockArgs({
        destination: 'test\\path',
        _: ['foo,bar'],
      });
      const expectedTemplates = ['foo', 'bar'];
      await main(args);

      expect(inquirerPromptStub).to.not.have.been.called;
      expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
        ...args,
        destination: args.destination,
        templates: expectedTemplates,
      });
    });

    it('should ignore unknown templates', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);

      const invalidTemplate = 'baz';
      const args = mockArgs({
        templates: `foo,bar,${invalidTemplate}`,
        destination: 'test\\path',
      });
      const expectedTemplates = ['foo', 'bar'];
      await main(args);

      expect(consoleLogStub).to.have.been.calledWith(
        chalk.yellow(`Ignoring unknown template '${invalidTemplate}'...`)
      );
      expect(initRunnerStub).to.have.been.calledWith(expectedTemplates, {
        ...args,
        destination: args.destination,
        templates: expectedTemplates,
      });
    });

    it('should prompt for template if missing', async () => {
      const baseTemplates = ['nextjs', 'foo', 'bar'];
      getBaseTemplatesStub.returns(baseTemplates);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);
      inquirerPromptStub.returns({
        prePushHook: true,
      });

      inquirerPromptStub
        .withArgs({
          type: 'list',
          name: 'template',
          message: 'Which template would you like to create?',
          choices: baseTemplates,
          default: 'nextjs',
        })
        .returns({
          template: 'foo',
        });

      const args = mockArgs({
        destination: 'test\\path',
      });
      const expectedTemplates = ['foo'];
      await main(args);

      expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
        ...args,
        destination: args.destination,
        templates: expectedTemplates,
      });
    });

    it('should prompt for prePushHook if missing', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);
      inquirerPromptStub.returns({
        destination: 'test\\path',
      });

      const mockPrePushHook = true;
      inquirerPromptStub.returns({
        prePushHook: mockPrePushHook,
      });

      const args = mockArgs({
        templates: 'foo',
      });
      const expectedTemplates = ['foo'];
      await main(args);

      expect(inquirerPromptStub).to.have.been.called;
      expect(initRunnerStub).to.have.been.calledWith(expectedTemplates, {
        ...args,
        destination: args.destination,
        templates: expectedTemplates,
      });
    });

    describe('promptDestination', () => {
      it('should prompt with provided prompt text and return input value', async () => {
        const mockDestination = 'my\\path';
        const mockPrompt = 'Enter the mocking path';
        inquirerPromptStub.returns({
          destination: mockDestination,
        });
        const result = await promptDestination(mockPrompt, 'default');
        expect(inquirerPromptStub).to.have.been.called;
        expect(inquirerPromptStub.getCall(0).args[0].message).to.be.equal(mockPrompt);
        expect(result).to.be.equal(mockDestination);
      });

      it('should use default value', async () => {
        inquirerPromptStub.returns({
          destination: undefined,
        });
        const defaultDestination = 'defa\\ult';
        await promptDestination('use default here', defaultDestination);
        expect(inquirerPromptStub).to.have.been.called;
        expect(inquirerPromptStub.getCall(0).args[0].default()).to.be.equal(defaultDestination);
      });
    });

    describe('getDestinations', () => {
      const testTemplates = ['foo', 'bar'];

      it('should return base args.destination value only when provided', async () => {
        const testPath = 'test\\path';
        const testArgs = mockArgs({
          destination: testPath,
        });
        expect(await getDestinations(testArgs, testTemplates)).to.deep.equal({
          destination: testPath,
        });
      });

      it('should return base and proxy destinations from args when templates contain proxy app', async () => {
        const testPath = 'test\\path';
        const proxyPath = 'proxy\\path';
        const testArgs = mockArgs({
          destination: testPath,
          proxyAppDestination: proxyPath,
        });
        const templatesWithProxy = [...testTemplates, 'node-app-proxy'];
        expect(await getDestinations(testArgs, templatesWithProxy)).to.deep.equal({
          destination: testPath,
          proxyAppDestination: proxyPath,
        });
      });

      it('should prompt to get base destination when args.destination is empty', async () => {
        const testPath = 'test\\path';
        inquirerPromptStub.returns({
          destination: testPath,
        });
        const testArgs = mockArgs({
          destination: undefined,
        });
        await getDestinations(testArgs, testTemplates);
        expect(inquirerPromptStub).to.have.been.calledOnce;
        expect(inquirerPromptStub.getCall(0).args[0].message).to.be.equal(
          'Where would you like your new app created?'
        );
      });

      it('should prompt for both base and proxy when destinations are missing in args and templates contain proxy app', async () => {
        const testPath = 'test\\path';
        const proxyPath = 'proxy\\path';
        inquirerPromptStub.onCall(0).returns({
          destination: testPath,
        });
        // avoid paths being equal - this case is tested further down
        inquirerPromptStub.onCall(1).returns({
          destination: proxyPath,
        });
        const testArgs = mockArgs({
          destination: undefined,
          proxyAppDestination: undefined,
        });
        const templatesWithProxy = [...testTemplates, 'node-app-proxy'];
        await getDestinations(testArgs, templatesWithProxy);
        expect(inquirerPromptStub).to.have.been.calledTwice;
        expect(inquirerPromptStub.getCall(0).args[0].message).to.be.equal(
          'Where would you like your new app created?'
        );
        expect(inquirerPromptStub.getCall(1).args[0].message).to.be.equal(
          'Where would you like your proxy app created?'
        );
      });

      it('should return default base destination with base template when --yes arg is used', async () => {
        const testArgs = mockArgs({
          destination: undefined,
          yes: true,
        });
        const expectedDestination = `${process.cwd()}${sep + testTemplates[0]}`;
        expect(await getDestinations(testArgs, testTemplates)).to.deep.equal({
          destination: expectedDestination,
        });
      });

      it('should return default base destination with args.appName when provided and --yes arg is used', async () => {
        const testAppName = 'myapp';
        const testArgs = mockArgs({
          destination: undefined,
          appName: testAppName,
          yes: true,
        });
        const expectedDestination = `${process.cwd()}${sep + testAppName}`;
        expect(await getDestinations(testArgs, testTemplates)).to.deep.equal({
          destination: expectedDestination,
        });
      });

      it('should return default proxy destination when -- yes arg is used', async () => {
        const testPath = 'test\\path';
        const testArgs = mockArgs({
          destination: testPath,
          yes: true,
        });
        const templatesWithProxy = [...testTemplates, 'node-app-proxy'];
        const expectedProxyDestination = getDefaultProxyDestination(testPath, 'node-app-proxy');
        expect(await getDestinations(testArgs, templatesWithProxy)).to.deep.equal({
          destination: testPath,
          proxyAppDestination: expectedProxyDestination,
        });
      });

      it('should prompt for proxy destination again if proxy destination is the same as base destination', async () => {
        const testPath = 'test\\path';
        const proxyPath = 'proxy\\path';
        // avoid paths being equal - this case is tested further down
        inquirerPromptStub.onCall(0).returns({
          destination: proxyPath,
        });
        const testArgs = mockArgs({
          destination: testPath,
          proxyAppDestination: testPath,
        });
        const templatesWithProxy = [...testTemplates, 'node-app-proxy'];
        await getDestinations(testArgs, templatesWithProxy);
        expect(inquirerPromptStub).to.have.been.calledOnce;
        expect(inquirerPromptStub.getCall(0).args[0].message).to.be.equal(
          'Proxy app and base app cannot be located in the same folder. Please input another path for proxy'
        );
      });

      it('should throw when templates are empty', async () => {
        const testArgs = mockArgs();
        await getDestinations(testArgs, []).catch((error) => {
          expect(error.message).to.be.equal(
            'Unable to get destinations, provided templates are empty'
          );
        });
      });
    });

    // this partially duplicates tests for getDestinations, but we need to ensure initRunnerStub is called with correct values
    // no way around it however - sinon cannot mock getDestinations on its own, which could've prevented this
    describe('main with destinations from args', () => {
      it('should call initRunnerStub with values from getDestinations', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(false);
        fsReaddirSyncStub.returns([]);

        const mockDestination = 'my\\path';
        const proxyDestination = 'my\\proxy';

        const args = mockArgs({
          templates: 'foo',
          destination: mockDestination,
          proxyAppDestination: proxyDestination,
        });
        const expectedTemplates = ['foo'];

        await main(args);

        expect(initRunnerStub).to.have.been.calledWith(expectedTemplates, {
          ...args,
          destination: mockDestination,
          proxyAppDestination: proxyDestination,
          templates: expectedTemplates,
        });
      });
    });

    describe('destination not empty', () => {
      it('should prompt and continue if yes', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(true);
        fsReaddirSyncStub.returns(['file.txt']);

        inquirerPromptStub.returns({
          continue: true,
        });

        const args = mockArgs({
          templates: 'foo,bar',
          destination: 'test\\path',
        });
        const expectedTemplates = ['foo', 'bar'];
        await main(args);

        expect(inquirerPromptStub).to.have.been.calledWith({
          type: 'confirm',
          name: 'continue',
          message: `Directory '${args.destination}' not empty. Are you sure you want to continue?`,
        });
        expect(initRunnerStub).to.have.been.calledWith(expectedTemplates, {
          ...args,
          destination: args.destination,
          templates: expectedTemplates,
        });
      });

      it('should prompt and exit if no', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(true);
        fsReaddirSyncStub.returns(['file.txt']);
        // throw to ensure subsequent code isn't run
        processExitStub.throws('process.exit');
        inquirerPromptStub.returns({
          continue: false,
        });

        const args = mockArgs({
          templates: 'foo,bar',
          destination: 'test\\path',
        });
        await main(args).catch((error) => {
          expect(inquirerPromptStub).to.have.been.calledOnceWith({
            type: 'confirm',
            name: 'continue',
            message: `Directory '${args.destination}' not empty. Are you sure you want to continue?`,
          });
          expect(processExitStub).to.have.been.calledOnce;
          expect(error.name).to.equal('process.exit');
          expect(initRunnerStub).to.not.have.been.called;
        });
      });

      it('should respect force', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(true);
        fsReaddirSyncStub.returns(['file.txt']);

        const args = mockArgs({
          templates: 'foo,bar',
          destination: 'test\\path',
          force: true,
        });
        const expectedTemplates = ['foo', 'bar'];
        await main(args);

        expect(inquirerPromptStub).to.not.have.been.called;
        expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
          ...args,
          destination: args.destination,
          templates: expectedTemplates,
        });
      });
    });

    it('should handle initRunner error', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);
      const error = 'nope';
      initRunnerStub.throws(error);
      inquirerPromptStub.returns({
        continue: false,
      });

      const args = mockArgs({
        templates: 'foo,bar',
        destination: 'test\\path',
      });
      await main(args);

      expect(consoleLogStub).to.have.been.calledWith(chalk.red('An error occurred: ', error));
      expect(processExitStub).to.have.been.calledWith(1);
    });
  });
});
