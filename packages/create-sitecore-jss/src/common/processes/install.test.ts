import childProcess from 'child_process';
import chalk from 'chalk';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { installPackages, lintFix, installPrePushHook } from './install';
import * as cmd from '../utils/cmd';
import * as helpers from '../utils/helpers';

describe('install', () => {
  let run: SinonStub;
  let isDevEnvironment: SinonStub;
  let openPackageJson: SinonStub;
  let log: SinonStub;
  const execStub = sinon.stub(childProcess, 'exec');

  beforeEach(() => {
    run = sinon.stub(cmd, 'run');
    log = sinon.stub(console, 'log');
  });

  afterEach(() => {
    run?.restore();
    isDevEnvironment?.restore();
    openPackageJson?.restore();
    log?.restore();
  });

  describe('installPackages', () => {
    it('should install', () => {
      const projectFolder = './some/path';
      isDevEnvironment = sinon.stub(helpers, 'isDevEnvironment').returns(false);

      installPackages(projectFolder);

      expect(log).to.have.been.calledOnceWith(chalk.cyan('Installing packages...'));
      expect(run).to.have.been.calledOnceWith(
        'npm',
        ['install'],
        { cwd: projectFolder, encoding: 'utf8' },
        undefined
      );
    });

    it('should install in monorepo', () => {
      const projectFolder = './some/path';
      isDevEnvironment = sinon.stub(helpers, 'isDevEnvironment').returns(true);

      installPackages(projectFolder);

      expect(log).to.have.been.calledTwice;
      expect(log).to.have.been.calledWith(chalk.cyan('Installing packages...'));
      expect(log).to.have.been.calledWith(chalk.yellow('Detected development environment.'));
      expect(run).to.have.been.calledOnceWith(
        'yarn',
        ['install'],
        { cwd: projectFolder, encoding: 'utf8' },
        undefined
      );
    });

    it('should respect silent', () => {
      const projectFolder = './some/path';
      const silent = true;
      isDevEnvironment = sinon.stub(helpers, 'isDevEnvironment').returns(false);

      installPackages(projectFolder, silent);

      expect(log).to.not.have.been.called;
      expect(run).to.have.been.calledOnceWith(
        'npm',
        ['install'],
        { cwd: projectFolder, encoding: 'utf8' },
        silent
      );
    });

    it('should respect silent in monorepo', () => {
      const projectFolder = './some/path';
      const silent = true;
      isDevEnvironment = sinon.stub(helpers, 'isDevEnvironment').returns(true);

      installPackages(projectFolder, silent);

      expect(log).to.not.have.been.called;
      expect(run).to.have.been.calledOnceWith(
        'yarn',
        ['install'],
        { cwd: projectFolder, encoding: 'utf8' },
        silent
      );
    });
  });

  describe('lintFix', () => {
    it('should run lint script', () => {
      const projectFolder = './some/path';
      openPackageJson = sinon.stub(helpers, 'openPackageJson').returns({
        scripts: {
          lint: 'lint',
        },
      });

      lintFix(projectFolder);

      expect(log).to.have.been.calledOnceWith(chalk.cyan('Linting app...'));
      expect(run).to.have.been.calledOnceWith(
        'npm',
        ['run', 'lint', '--', '--fix'],
        {
          cwd: projectFolder,
          encoding: 'utf8',
        },
        undefined
      );
    });

    it('should skip if lint script not defined', () => {
      const projectFolder = './some/path';
      openPackageJson = sinon.stub(helpers, 'openPackageJson').returns({
        scripts: {},
      });

      lintFix(projectFolder);

      expect(log).to.not.have.been.called;
      expect(run).to.not.have.been.called;
    });

    it('should respect silent', () => {
      const projectFolder = './some/path';
      const silent = true;
      openPackageJson = sinon.stub(helpers, 'openPackageJson').returns({
        scripts: {
          lint: 'lint',
        },
      });

      lintFix(projectFolder, silent);

      expect(log).to.not.have.been.called;
      expect(run).to.have.been.calledOnceWith(
        'npm',
        ['run', 'lint', '--', '--fix'],
        {
          cwd: projectFolder,
          encoding: 'utf8',
        },
        silent
      );
    });
  });

  describe('installPrePushHook', () => {
    it('should run exec function', () => {
      const destination = './some/path';

      installPrePushHook(destination);

      expect(log).to.have.been.calledOnceWith(chalk.cyan('Installing pre-push hook...'));
      expect(execStub).to.have.been.calledWith(
        `cd ${destination} && git init && npm run install-pre-push-hook`
      );
    });

    it('should respect silent', () => {
      const destination = './some/path';
      const silent = true;

      installPrePushHook(destination, silent);

      expect(log).to.not.have.been.called;
      expect(execStub).to.have.been.calledWith(
        `cd ${destination} && git init && npm run install-pre-push-hook`
      );
    });

    it('should log a warning message if there is an error', () => {
      const destination = './some/path';
      const error = new Error('some error');
      execStub.yields(error);

      installPrePushHook(destination);

      expect(log).to.have.been.calledWith(
        chalk.yellow(`Warning: Pre-push hook may not be working due to error ${error}`)
      );
    });
  });
});
