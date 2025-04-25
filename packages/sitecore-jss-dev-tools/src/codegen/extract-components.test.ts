import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { extractComponents } from './extract-components';
import * as cliUtils from './utils';
import * as authUtils from '../auth/fetch-bearer-token';

describe('extract-components', () => {
  describe('extractComponents', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
      process.env.EXTRACT_CONSENT = 'true';
      process.env.SITECORE = 'true';
      process.env.BuildMetadata_BuildId = '0451';
      sandbox.stub(fs, 'existsSync').returns(true);
    });

    afterEach(() => {
      sandbox.restore();
      delete process.env.EXTRACT_CONSENT;
      delete process.env.SITECORE;
      delete process.env.BuildMetadata_BuildId;
    });

    it('should log when bearer is empty', async () => {
      const consoleErrorStub = sandbox.stub(console, 'error');
      const resolveImportFilesStub = sandbox.stub().resolves(['/path/to/component.ts']);
      const fetchBearerTokenStub = sandbox.stub(authUtils, 'fetchBearerToken').resolves('');

      sandbox.replace(cliUtils, 'resolveComponentImportFiles', resolveImportFilesStub);
      sandbox.replace(authUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await extractComponents({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to get bearer token, aborting code extraction')
      );
    });

    it('should pass custom component builder path to resolve resolveComponentImportFiles', async () => {
      const resolveImportFilesStub = sandbox.stub().resolves(['/path/to/component.ts']);
      const fetchBearerTokenStub = sandbox.stub().resolves('test-token');
      sandbox.replace(cliUtils, 'resolveComponentImportFiles', resolveImportFilesStub);
      sandbox.replace(authUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await extractComponents({
        appFolder: '/path/to/app',
        componentBuilderPath: '/custom/path/to/component-builder',
      });

      expect(resolveImportFilesStub.calledOnce).to.be.true;
      expect(resolveImportFilesStub.firstCall.args[1]).to.equal(
        '/custom/path/to/component-builder'
      );
    });

    it('should catch exceptions from resolveImportFiles call', async () => {
      const consoleErrorStub = sandbox.stub(console, 'error');
      const resolveImportFilesStub = sandbox.stub().throws(new Error('oopsie'));
      const fetchBearerTokenStub = sandbox.stub().resolves('test-token');

      sandbox.replace(cliUtils, 'resolveComponentImportFiles', resolveImportFilesStub);
      sandbox.replace(authUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await extractComponents({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Error during component extraction: Error: oopsie')
      );
    });

    it('should abort when EXTRACT_CONSENT is not set', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.EXTRACT_CONSENT;

      await extractComponents({ appFolder: '/path/to/app' });

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set')
      );
    });

    it('should abort when appPath does not exist', async () => {
      sandbox.restore();
      const consoleErrorStub = sandbox.stub(console, 'error');
      const fullPath = path.resolve(process.cwd(), './non/existent/path');
      sandbox
        .stub(fs, 'existsSync')
        .returns(true)
        .withArgs(fullPath)
        .returns(false);

      await extractComponents({ appFolder: './non/existent/path' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Skipping code extraction, no app folder found at ', fullPath)
      );
    });

    it('should skip code extraction when not in deploy context', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.BuildMetadata_BuildId;

      await extractComponents({ appFolder: '/path/to/app' });

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.yellow('Skipping code extraction, not in deploy context')
      );
    });

    it('should call sendCode for each component path', async () => {
      const componentMap = new Map([
        ['component1', '/path/to/component1.ts'],
        ['component2', '/path/to/component2.ts'],
      ]);
      const sendCodeStub = sandbox.stub().resolves();
      const fetchBearerTokenStub = sandbox.stub().resolves('test-token');
      const resolveImportFilesStub = sandbox.stub().resolves(componentMap);

      sandbox.replace(cliUtils, 'resolveComponentImportFiles', resolveImportFilesStub);
      sandbox.replace(authUtils, 'fetchBearerToken', fetchBearerTokenStub);
      sandbox.replace(cliUtils, 'sendCode', sendCodeStub);

      await extractComponents({ appFolder: '/path/to/app' });

      expect(fetchBearerTokenStub.calledOnce).to.be.true;
      expect(resolveImportFilesStub.calledOnce).to.be.true;
      expect(sendCodeStub.callCount).to.equal(2);
    });
  });
});
