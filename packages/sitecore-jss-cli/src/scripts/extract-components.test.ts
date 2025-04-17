import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import nock from 'nock';
import fs from 'fs';
import proxyquire from 'proxyquire';
import * as cliUtils from './extract-components';
import { constants } from '@sitecore-jss/sitecore-jss-dev-tools';

describe('extract-components', () => {
  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
    process.env.M2M_CLIENT_ID = undefined;
    process.env.M2M_CLIENT_SECRET = undefined;
    process.env.M2M_AUDIENCE = undefined;
    process.env.EXTRACT_CONSENT = undefined;
  });

  describe('handler', () => {
    beforeEach(() => {
      process.env.EXTRACT_CONSENT = 'true';
    });

    it('should log when bearer is empty', async () => {
      const consoleErrorStub = sinon.stub(console, 'error');
      const resolveImportFilesStub = sinon.stub().resolves(['/path/to/component.ts']);
      const fetchBearerTokenStub = sinon.stub().resolves('');

      sinon.replace(cliUtils, 'resolveImportFiles', resolveImportFilesStub);
      sinon.replace(cliUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await cliUtils.handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to get bearer token, aborting code extraction')
      );
    });

    it('should catch exceptions from resolveImportFiles call', async () => {
      const consoleErrorStub = sinon.stub(console, 'error');
      const resolveImportFilesStub = sinon.stub().throws(new Error('oopsie'));
      const fetchBearerTokenStub = sinon.stub().resolves('test-token');

      sinon.replace(cliUtils, 'resolveImportFiles', resolveImportFilesStub);
      sinon.replace(cliUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await cliUtils.handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Error during component extraction: Error: oopsie')
      );
    });
  });

  describe('fetchBearerToken', () => {
    it('should send POST request to M2M_ENDPOINT url', async () => {
      nock('https://auth.sitecorecloud.io')
        .post('/oauth/token')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'correct-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      nock('https://auth.sitecorecloud.io')
        .intercept('/.*/', '*')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'incorrect-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      const token = await cliUtils.fetchBearerToken();

      expect(token).to.equal('correct-token');
    });

    it('should use client_id, client_secret and audience values from process.env', async () => {
      process.env.M2M_CLIENT_ID = 'test-client-id';
      process.env.M2M_CLIENT_SECRET = 'test-client-secret';
      process.env.M2M_AUDIENCE = 'test-audience';

      nock('https://auth.sitecorecloud.io')
        .post(
          '/oauth/token',
          (body) =>
            body.client_id === 'test-client-id' &&
            body.client_secret === 'test-client-secret' &&
            body.audience === 'test-audience'
        )
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'correct-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      nock('https://auth.sitecorecloud.io')
        .intercept('/.*/', '*')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'incorrect-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      const token = await cliUtils.fetchBearerToken();

      expect(token).to.equal('correct-token');
    });

    it('should log when request to M2M_ENDPOINT fails', async () => {
      nock('https://auth.sitecorecloud.io')
        .post('/oauth/token')
        .reply(503, 'Service Unavailable');
      const consoleErrorStub = sinon.stub(console, 'error');
      const token = await cliUtils.fetchBearerToken();

      expect(token).to.be.null;
      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red(
          // eslint-disable-next-line
          `Error authenticating with M2M token endpoint: SyntaxError: Unexpected token 'S', "Service Unavailable" is not valid JSON`
        )
      );
    });
  });

  describe('sendCode', () => {
    const meshEndpoint = constants.SITECORE_EDGE_URL_DEFAULT;

    it('should read file from componentPath and send code to meshEndpoint', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sinon
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      nock(meshEndpoint)
        .post('/api/v1/mesh', fileContent)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      const consoleLogStub = sinon.stub(console, 'log');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.green('Code from /path/to/component.ts extracted and sent to mesh endpoint')
      );
    });

    it('should log when componentPath file is not found', async () => {
      const componentPath = '/path/to/nonexistent-component.ts';
      const token = 'test-token';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(false);

      const consoleErrorStub = sinon.stub(console, 'error');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red(`Component file not found: ${componentPath}`)
      );
    });

    it('should log when meshEndpoint returns an error', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sinon
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      nock(meshEndpoint)
        .post('/api/v1/mesh', fileContent)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(500, 'Internal Server Error');

      const consoleErrorStub = sinon.stub(console, 'error');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to send extracted code from /path/to/component.ts: Internal Server Error')
      );
    });
  });

  describe('resolveImportFiles', () => {
    it('should throw when tsconfig.json is not found under baseApp path', () => {
      const appPath = '/path/to/app/that/not/exist';
      const readConfigFileStub = sinon.stub().returns({ error: { messageText: 'File not found' } });
      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
        },
      });

      expect(() => cliUtils.resolveImportFiles(appPath)).to.throw(
        Error,
        // eslint-disable-next-line
        `Error reading tsconfig.json from JSS app root: Cannot read file 'C:\\path\\to\\app\\that\\not\\exist\\tsconfig.json'`
      );
    });

    it('should throw when src/temp/componentBuilder.ts is not found', () => {
      const appPath = './src/scripts/test-data/extract-components/no-componentBuilder';

      expect(() => cliUtils.resolveImportFiles(appPath)).to.throw(
        ReferenceError,
        'Failed to find file C:\\Work\\jss\\packages\\sitecore-jss-cli\\src\\scripts\\test-data\\extract-components\\no-componentBuilder\\src\\temp\\componentBuilder.ts'
      );
    });

    it('should return imports with absolute paths from componentBuilder.ts', () => {
      const appPath = './src/scripts/test-data/extract-components/regular-imports';

      const imports = cliUtils.resolveImportFiles(appPath);

      expect(imports).to.deep.equal([
        'C:/Work/jss/packages/sitecore-jss-cli/src/scripts/test-data/extract-components/regular-imports/src/components/TestComponent.tsx',
      ]);
    });

    it('should return imports with absolute paths from componentBuilder.ts when paths aliases are used', () => {
      const appPath = './src/scripts/test-data/extract-components/with-path-aliases';

      const imports = cliUtils.resolveImportFiles(appPath);

      expect(imports).to.deep.equal([
        'src/scripts/test-data/extract-components/with-path-aliases/src/components/TestComponent.tsx',
      ]);
    });

    it('should ignore imports starting with "node:" and containing "node_modules"', () => {
      const appPath = './src/scripts/test-data/extract-components/node-modules-imports';

      const imports = cliUtils.resolveImportFiles(appPath);

      expect(imports).to.deep.equal([
        'C:/Work/jss/packages/sitecore-jss-cli/src/scripts/test-data/extract-components/node-modules-imports/src/components/TestComponent.tsx',
      ]);
    });
  });
});
