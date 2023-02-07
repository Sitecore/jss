/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import fs from 'fs';
import { sep } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { ParsedArgs } from 'minimist';
import { parseArgs, main } from './bin';
import * as helpers from './common/utils/helpers';
import * as initRunner from './init-runner';

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
        '--appName',
        'test',
        '--destination',
        '.\\test\\path',
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

      expect(consoleLogStub).to.have.been.calledOnceWith(
        chalk.yellow(`Ignoring unknown template '${invalidTemplate}'...`)
      );
      expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
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

    it('should prompt for destination if missing', async () => {
      getAllTemplatesStub.returns(['foo', 'bar']);
      getBaseTemplatesStub.returns(['foo']);
      fsExistsSyncStub.returns(false);
      fsReaddirSyncStub.returns([]);

      const mockDestination = 'my\\path';
      inquirerPromptStub.returns({
        destination: mockDestination,
      });

      const args = mockArgs({
        templates: 'foo',
      });
      const expectedTemplates = ['foo'];
      await main(args);

      expect(inquirerPromptStub).to.have.been.calledOnce;
      expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
        ...args,
        destination: mockDestination,
        templates: expectedTemplates,
      });
    });

    describe('destination default', () => {
      it('should use appName', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(false);
        fsReaddirSyncStub.returns([]);

        const mockDestination = 'my\\path';
        inquirerPromptStub.returns({
          destination: mockDestination,
        });

        const args = mockArgs({
          templates: 'foo',
          appName: 'testApp',
        });
        const expectedTemplates = ['foo'];
        const expectedDestinationDefault = `${process.cwd()}${sep + args.appName}`;

        await main(args);

        expect(inquirerPromptStub).to.have.been.calledOnce;
        expect(inquirerPromptStub.getCall(0).args[0].default()).to.equal(
          expectedDestinationDefault
        );
        expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
          ...args,
          destination: mockDestination,
          templates: expectedTemplates,
        });
      });

      it('should use template if appName not provided', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(false);
        fsReaddirSyncStub.returns([]);

        const mockDestination = 'my\\path';
        inquirerPromptStub.returns({
          destination: mockDestination,
        });

        const args = mockArgs({
          templates: 'foo,bar',
        });
        const expectedTemplates = ['foo', 'bar'];
        const expectedDestinationDefault = `${process.cwd()}${sep + expectedTemplates[0]}`;

        await main(args);

        expect(inquirerPromptStub).to.have.been.calledOnce;
        expect(inquirerPromptStub.getCall(0).args[0].default()).to.equal(
          expectedDestinationDefault
        );
        expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
          ...args,
          destination: mockDestination,
          templates: expectedTemplates,
        });
      });

      it('should respect yes', async () => {
        getAllTemplatesStub.returns(['foo', 'bar']);
        getBaseTemplatesStub.returns(['foo']);
        fsExistsSyncStub.returns(false);
        fsReaddirSyncStub.returns([]);

        const args = mockArgs({
          templates: 'foo',
          appName: 'testApp',
          yes: true,
        });
        const expectedTemplates = ['foo'];
        const expectedDestinationDefault = `${process.cwd()}${sep + args.appName}`;

        await main(args);

        expect(inquirerPromptStub).to.not.have.been.called;
        expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
          ...args,
          destination: expectedDestinationDefault,
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

        expect(inquirerPromptStub).to.have.been.calledOnceWith({
          type: 'confirm',
          name: 'continue',
          message: `Directory '${args.destination}' not empty. Are you sure you want to continue?`,
        });
        expect(initRunnerStub).to.have.been.calledOnceWith(expectedTemplates, {
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

      const args = mockArgs({
        templates: 'foo,bar',
        destination: 'test\\path',
      });
      await main(args);

      expect(consoleLogStub).to.have.been.calledOnceWith(chalk.red('An error occurred: ', error));
      expect(processExitStub).to.have.been.calledOnceWith(1);
    });
  });
});
