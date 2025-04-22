import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import { handler } from './extract-components';
import * as cliUtils from '@sitecore-jss/sitecore-jss-dev-tools';

describe('extract-components', () => {
  describe('handler', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
      process.env.EXTRACT_CONSENT = 'true';
      process.env.SITECORE = 'true';
      process.env.BuildMetadata_BuildId = '0451';
    });

    afterEach(() => {
      sandbox.restore();
      delete process.env.EXTRACT_CONSENT;
      delete process.env.SITECORE;
      delete process.env.BuildMetadata_BuildId;
    });

    it('should log when bearer is empty', async () => {
      const consoleErrorStub = sandbox.stub(console, 'error');
      const resolveImportFilesStub = sandbox
        .stub(cliUtils, 'resolveComponentImportFiles')
        .resolves(['/path/to/component.ts']);
      const fetchBearerTokenStub = sandbox.stub(cliUtils, 'fetchBearerToken').resolves('');

      sandbox.replaceGetter(cliUtils, 'resolveComponentImportFiles', () => resolveImportFilesStub);
      sandbox.replaceGetter(cliUtils, 'fetchBearerToken', () => fetchBearerTokenStub);

      await handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to get bearer token, aborting code extraction')
      );
    });

    it('should catch exceptions from resolveImportFiles call', async () => {
      const consoleErrorStub = sandbox.stub(console, 'error');
      const resolveImportFilesStub = sandbox.stub().throws(new Error('oopsie'));
      const fetchBearerTokenStub = sandbox.stub().resolves('test-token');

      sandbox.replaceGetter(cliUtils, 'resolveComponentImportFiles', () => resolveImportFilesStub);
      sandbox.replaceGetter(cliUtils, 'fetchBearerToken', () => fetchBearerTokenStub);

      await handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Error during component extraction: Error: oopsie')
      );
    });

    it('should abort when EXTRACT_CONSENT is not set', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.EXTRACT_CONSENT;

      await handler({ appFolder: '/path/to/app' });

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.yellow('Skipping code extraction, EXTRACT_CONSENT is not set')
      );
    });

    it('should skip code extraction when not in build context', async () => {
      const consoleLogStub = sandbox.stub(console, 'log');
      delete process.env.BuildMetadata_BuildId;

      await handler({ appFolder: '/path/to/app' });

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.yellow('Skipping code extraction, not in build context')
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

      sandbox.replaceGetter(cliUtils, 'resolveComponentImportFiles', () => resolveImportFilesStub);
      sandbox.replaceGetter(cliUtils, 'fetchBearerToken', () => fetchBearerTokenStub);
      sandbox.replaceGetter(cliUtils, 'sendCode', () => sendCodeStub);

      await handler({ appFolder: '/path/to/app' });

      expect(fetchBearerTokenStub.calledOnce).to.be.true;
      expect(resolveImportFilesStub.calledOnce).to.be.true;
      expect(sendCodeStub.callCount).to.equal(2);
    });
  });
});
