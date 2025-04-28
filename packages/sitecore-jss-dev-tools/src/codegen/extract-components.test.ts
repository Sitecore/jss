import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import fs from 'fs';
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
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents();

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
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents({
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
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents();

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Error during component extraction: Error: oopsie')
      );
    });

    it('should abort when EXTRACT_CONSENT is not set', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.EXTRACT_CONSENT;
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents();

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set')
      );
    });

    it('should skip code extraction when not in deploy context', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.BuildMetadata_BuildId;
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents();

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
      sandbox.stub(process, 'cwd').returns('/path/to/app');

      await extractComponents();

      expect(fetchBearerTokenStub.calledOnce).to.be.true;
      expect(resolveImportFilesStub.calledOnce).to.be.true;
      expect(sendCodeStub.callCount).to.equal(2);
    });
  });
});
